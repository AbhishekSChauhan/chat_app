import React, { useState } from 'react'
import { useEffect } from 'react'
import ConversationMessages from './ConversationMessages'
import axios from 'axios'
import ChatInputBox from './ChatInputBox'
import { ChatApp } from './ChatApp'
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Dropzone from 'react-dropzone'
import './Conversation.css'
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
// const base_url='http://localhost:9999/api/v1'
const base_url='https://dev-api.bizly.me/api/v1'

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));

const Conversation = ({conversation,participantIdentity,companyId,messages,setMessages}) => {
    const [newMessage, setNewMessage] = useState('')
    // const [messages, setMessages] = useState([])
    const [loadingState, setLoadingState] = useState('initializing')
    const [boundConversations, setBoundConversations] = useState(new Set())
    const [getMediaUrl, setGetMediaUrl] = useState(null)
    const [imgDropActive, setImgDropActive] = useState(false)
    const [status, setStatus] = useState(null)
  
    // console.log('conversation',conversation.configuration.userIdentity);

    useEffect(()=>{
        loadMessagesFor(conversation)
        lastRead(conversation)
        // setAllMessagesRead(conversation)

        if(!boundConversations.has(conversation)){
            // let newConversation=conversation;
            conversation.on('messageAdded',(msg)=>messageAdded(msg,conversation))
            setBoundConversations(new Set([...boundConversations,conversation]))
        }

        let lastImgMsgSid=messages[messages.length-1]?.sid
        if(messages[messages.length-1]?.type==="media" && lastImgMsgSid ===messages[messages.length-1]?.sid){
            let mediaMsg=messages[messages.length-1]
            // console.log('mediaMsg.sid',mediaMsg.media.getContentTemporaryUrl());
            if(status!=='success'){
                getSentMediaUrl(mediaMsg)
            }else{
                getSentMediaUrl()
            }            
        }

        
    },[messages.length,newMessage])

    // useEffect(()=>{
        
    // },[imgDropActive])

    const getSentMediaUrl=async(msg)=>{
        try{
            const res=await msg.media.getContentTemporaryUrl()
            console.log('getSentMediaUrl',res);
            sendImgMessage(res)
            setStatus(res.data.status)
            // setGetMediaUrl(res)
        }catch(e){
            console.log(e);
        }
    }



    // console.log(loadingState);
    const loadMessagesFor=(thisConversation)=>{
        // try{
        //     const res=await thisConversation.getMessages()
        //     console.log('load msg res',res);
        // }catch(err){
        //     console.log(err);
        // }
        if(thisConversation===conversation){
            thisConversation.getMessages()
            .then(messagePaginator=>{
                if(conversation===thisConversation){
                    setMessages(messagePaginator.items)
                    setLoadingState('ready')
                }
            })
            .catch(err=>{
                console.error("Couldn't fetch messages IMPLEMENT RETRY", err);
                setLoadingState('failed')
            })
        }
    }

    const messageAdded=(message,targetConversation)=>{
        if(targetConversation===conversation){
            setMessages([...messages,message])
        }
    }

    const lastRead=async(thisConversation)=>{
        try{
            const res=await thisConversation.getMessages()
            console.log('last read',res);
        }catch(err){
            console.log(err);
        }
        // thisConversation.getMessages()
        // .then(msg=>{
        //     if(msg.items.length>1){
        //         let msgIndex=msg.items[1].index
        //         // console.log('msgIndex',msg,msgIndex);
        //         thisConversation.updateLastReadMessageIndex(msgIndex)
        //     }
        // })        
    }

    // const setAllMessagesRead=async(thisConversation)=>{
    //     const res= await thisConversation.setAllMessagesRead()
    //     const res2=await thisConversation.getMessagesCount()
    //     const res3=await thisConversation.getUnreadMessagesCount()
    //     // console.log('setAllMessagesRead',res,res2,res3);
    // }


    const onMessageChanged=(e)=>{
        setNewMessage(e.target.value)
    }

    // const sendMessage=(e)=>{
    //     e.preventDefault()
    //     const message=newMessage
    //     setNewMessage(' ')
    //     conversation.sendMessage(message)
    // }

     

    const sendMessage=async(e)=>{
        e.preventDefault()
        const chatData={
            "phone_number" : conversation.friendlyName!==null?conversation.friendlyName:conversation.configuration.userIdentity,
            "message_body" : newMessage,
            "media_url":''
        }  
        try{
            const res=await axios.post(`${base_url}/chat/send-message/${companyId}`,chatData)
            // console.log('send msg res',res);
            setNewMessage(' ')
            conversation.sendMessage(newMessage)

        }catch(e){
            console.log('send msg err',e);
        }
    }

    // console.log('messages',messages);
    
    const sendImgMessage=async(media_url)=>{

        const chatImgData={
            "phone_number" : conversation.friendlyName,
            "message_body" : "Img",
            "media_url": media_url
        }
        try{            
            const res=await axios.post(`${base_url}/chat/send-message/${companyId}`,chatImgData)
            console.log('....img sent....');
            console.log('send img',res);
        }catch(err){
            console.log('send img msg err',err);
        }
    }

    const onDrop=(acceptedFiles)=>{ 
        conversation.sendMessage({contentType: acceptedFiles[0].type, media: acceptedFiles[0]})
        
        // console.log('......waiting for msg.....');
        setTimeout(()=>{
            setImgDropActive(true)
        },2000) 
        // console.log('----waiting for latest media url----');
        // console.log('got media url',getMediaUrl); 
        // console.log('----got media url---'); 

    }

    return (
        <div style={{border:'1px solid'}}>
            <Dropzone
            onDrop={onDrop}
            accept="image/*">
            {({getRootProps, getInputProps, isDragActive}) => (
                <div
                    {...getRootProps()}
                    onClick={() => {
                    }}
                    id="OpenChannel"
                    style={{position: "relative", top: 0}}>

                    {isDragActive &&
                    <div className={'drop'}>
                        {/* <CloudUploadIcon fontSize large /> */}
                        <h3 style={{color: "#fefefe"}}>Release to Upload</h3>
                    </div>
                    }
                    <div
                        className={'messages'}
                        style={{
                        filter: `blur(${isDragActive ? 4 : 0}px)`,
                        }}
                    >
                    <input id="files" {...getInputProps()} />

                    <div style={{flexBasis: "100%", flexGrow: 2, flexShrink: 1, overflowY: "scroll"}}>
                        <ConversationMessages 
                            messages={messages}
                            identity={conversation.friendlyName}
                            participantIdentity={participantIdentity}
                        />
                    </div>

                    <div>
                        <ChatInputBox 
                            sendMessage={sendMessage}
                            newMessage={newMessage}
                            onMessageChanged={onMessageChanged}
                        />
                    </div>
                    </div>
                </div>
            )}

        </Dropzone>
        </div>
  )
}

export default Conversation