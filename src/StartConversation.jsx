import React, { useEffect, useState } from 'react'
import { Client } from "@twilio/conversations";
import ConvoList from './ConvoList';
import Conversation from './Conversation';
import ConversationComponent from './ConversationComponent';
import AllConversationsList from './AllConversationsList';

const StartConversation = ({friendlyName,tokenValue,refreshToken,companyId}) => {
    const [status, setStatus] = useState(null)
    const [statusString, setStatusString] = useState(null)
    const [conversations, setConversations] = useState([])
    const [selectedConversationSid, setSelectedConversationSid] = useState('')
    const [participantIdentity, setParticipantIdentity] = useState('')
    const [messagesArray, setMessagesArray] = useState([])
    const [messages, setMessages] = useState([])

    useEffect(()=>{
        handleInit(tokenValue)
    },[])

    const initConversations=async(token)=>{       
        // console.log(tokenValue)
        const client = new Client(token);
        // console.log('client',client);
   
        client.on('tokenAboutToExpire',()=>{
            console.log('token about to expire');
            refreshToken()
        })
        client.onWithReplay('connectionStateChanged', (state) => {
            if (state === "connecting"){
                setStatusString('Connecting to Twilio…')
                setStatus('default')
            }
            if (state === "connected") {
                setStatusString('You are connected.')
                setStatus('success')
            }
            if (state === "disconnecting"){
                setStatusString('Disconnecting from Twilio…')
                setStatus('default')
                
            }
            if (state === "disconnected"){
                setStatusString('Disconnected')
                setStatus('warning')
                
            }
            if (state === "denied"){
                setStatusString('Failed to connect.')
                setStatus('error')
                
                console.log('state denied');
            }
        })


        client.onWithReplay('conversationJoined',(conversation)=>{
            console.log('joining convo',conversation);
            
            setConversations([...conversations,conversation])
        })
        // client.onWithReplay('participantJoined',(participant)=>{
        //     console.log('participantJoined',participant);
        // })
        // client.onWithReplay('typingStarted',(participant)=>{
        //     console.log('typing',participant._startTyping());
        // })
        client.onWithReplay('conversationLeft',(conversation)=>{
            // console.log('convo left');
            let filter=conversations.filter(it=>it!==conversation)
            setConversations(filter)
        })

        // client.on('participantJoined',(participant)=>{
        //     console.log('participantJoined',participant);
        // })

        client.on('tokenExpired',()=>{
            setStatusString('token is Expired')
        })

    }

    const handleInit=(token)=>{
        if(conversations.length===0){
            initConversations(token)
        }
        if(conversations.length>1){
            console.log('already in a conversation');
        }
        // initConversations(token)
    }

    // console.log('conversations SID',selectedConversationSid);

    const selectedConversation = conversations.find((e)=>e.sid===selectedConversationSid)

    // console.log('selectCOnvo',selectedConversation);
    let conversationContent;

    if(selectedConversation){
        conversationContent=(
            <Conversation 
                conversation={selectedConversation} 
                // phoneNumber={phoneNumber}
                companyId={companyId}
                participantIdentity={participantIdentity}
                messages={messages}
                setMessages={setMessages}
            />
        )
    } 
    // else if (status !== "success") {
    //     conversationContent = "Loading your conversation!";
    // }
    

    const getConversationBySid=async(selectedConversation)=>{
        try{
            const res=await selectedConversation.getConversationBySid()
            // console.log('getConversationBySid res',res);
        }catch(e){
            // console.log('getConversationBySid err',e);
        }
    }

    // console.log('setMessagesArray',messagesArray);
    // console.log('messages',messages);
    // let msg=messagesArray[messagesArray.length-1]
    // const condition=msg?.type
    let latestTextValue    
    // if(condition==='text'){
    //     latestTextValue=msg?.body
    // }
    // if(condition==='media'){
    //     latestTextValue="Image"
    // }

    // let latestTextValue
        if(messages.length===0){
            let msg=messagesArray[messagesArray.length-1]
            let condition=msg?.type
            if(condition==='text'){
                latestTextValue=msg?.body
            }else if(condition==='media'){
                latestTextValue="Image"
            }
        }else{
            let msg=messages[messages.length-1]
            let condition=msg?.type
            if(condition==='text'){
                latestTextValue=msg?.body
            }else if(condition==='media'){
                latestTextValue="Image"
            }
    }

    return (
        <div style={{display:'flex'}}>
            <div >
                <AllConversationsList 
                    latestTextValue={latestTextValue}
                    handleInit={handleInit}
                    tokenValue={tokenValue}
                    friendlyName={friendlyName}
                    conversations={conversations}
                    selectedConversationSid={selectedConversationSid}
                    setSelectedConversationSid={setSelectedConversationSid}
                    status={status}
                    conversationContent={conversationContent}
                    setParticipantIdentity={setParticipantIdentity}
                    setMessagesArray={setMessagesArray}
                />         
            </div>
            <div>
                               
            </div>
            <div>
                {/* <ConversationComponent 
                    conversationContent={conversationContent}

                /> */}
                {/* {selectedConversationSid===selectedConversation?.sid && ( */}
                    {/* <div>{conversationContent}</div> */}
                {/* )} */}
                {/* {conversationContent} */}
            </div>
        </div>
        
    )
}

export default StartConversation