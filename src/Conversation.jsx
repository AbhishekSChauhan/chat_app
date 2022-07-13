import React, { useState } from 'react'
import { useEffect } from 'react'
import ConversationMessages from './ConversationMessages'
import axios from 'axios'
import ChatInputBox from './ChatInputBox'
// const base_url='http://localhost:9999/api/v1'
const base_url='https://dev-api.bizly.me/api/v1'

const Conversation = ({conversation,phoneNumber,companyId}) => {
    const [newMessage, setNewMessage] = useState('')
    const [messages, setMessages] = useState([])
    const [loadingState, setLoadingState] = useState('initializing')
    const [boundConversations, setBoundConversations] = useState(new Set())
  
    // console.log('conversation',conversation.friendlyName);
    useEffect(()=>{
        loadMessagesFor(conversation)
        lastRead(conversation)
        setAllMessagesRead(conversation)

        if(!boundConversations.has(conversation)){
            let newConversation=conversation;
            newConversation.on('messageAdded',(msg)=>messageAdded(msg,newConversation))
            setBoundConversations(new Set([...boundConversations,newConversation]))
        }
    },[messages.length,newMessage])

    const loadMessagesFor=(thisConversation)=>{
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

    const lastRead=(thisConversation)=>{
        thisConversation.getMessages()
        .then(msg=>{
            if(msg.items.length>1){
                let msgIndex=msg.items[1].index
                // console.log('msgIndex',msg,msgIndex);
                thisConversation.updateLastReadMessageIndex(msgIndex)
            }
        })        
    }

    const setAllMessagesRead=async(thisConversation)=>{
        const res= await thisConversation.setAllMessagesRead()
        const res2=await thisConversation.getMessagesCount()
        const res3=await thisConversation.getUnreadMessagesCount()
        // console.log('setAllMessagesRead',res,res2,res3);
    }


    const onMessageChanged=(e)=>{
        setNewMessage(e.target.value)
    }

    // const sendMessage=(e)=>{
    //     e.preventDefault()
    //     const message=newMessage
    //     setNewMessage(' ')
    //     conversation.sendMessage(message)
    // }

    const chatData={
        "phone_number" : conversation.friendlyName,
        "message_body" : newMessage
    }

    const sendMessage=async(e)=>{
        e.preventDefault()
        try{
            const res=await axios.post(`${base_url}/chat/send-message/${companyId}`,chatData)
            // console.log('send msg res',res);
            setNewMessage(' ')
            conversation.sendMessage(newMessage)

        }catch(e){
            console.log('send msg err',e);
        }
    }

    console.log('messages',messages);

    return (
        <div>
            <div>
                <strong>
                    {conversation.friendlyName}
                </strong>
            </div> 
            <div>
                <ConversationMessages 
                    messages={messages}
                    identity={conversation.friendlyName}
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
  )
}

export default Conversation