import React, { useState } from 'react'
import { Client } from "@twilio/conversations";
import { useEffect } from 'react';
import axios from 'axios';
import Conversation from './Conversation';
import './Conversation.css'
import ConversationList from './ConversationList';
import { BsFillChatFill } from "react-icons/bs";
import { MdPrivateConnectivity } from "react-icons/md";
import { Badge, Icon, Layout, Spin, Typography } from "antd";
import { HeaderItem } from './HeaderItem';

const { Content, Sider, Header } = Layout;
const { Text } = Typography;

const base_url='https://dev-api.bizly.me/api/v1'

const InitConversations = ({tokenValue,conversations,setConversations,refreshToken,
    selectedConversationSid,setSelectedConversationSid,friendlyName,companyId}) => {
    const [statusString, setStatusString] = useState(null)
    const [status, setStatus] = useState(null)
    
    const [conversationsReady, setConversationsReady] = useState(false)

    useEffect(()=>{
    },[])

    useEffect(()=>{
        // initConversations()
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
                setConversationsReady(false)
            }
            if (state === "disconnected"){
                setStatusString('Disconnected')
                setStatus('warning')
                setConversationsReady(false)
            }
            if (state === "denied"){
                setStatusString('Failed to connect.')
                setStatus('error')
                setConversationsReady(false)
                console.log('state denied');
            }
        })


        client.onWithReplay('conversationJoined',(conversation)=>{
            // console.log('joining convo');
            
            setConversations([...conversations,conversation])
            setConversationsReady(true)
        })
        client.onWithReplay('conversationLeft',(conversation)=>{
            // console.log('convo left');
            let filter=conversations.filter(it=>it!==conversation)
            setConversations(filter)
        })

        client.on('tokenExpired',()=>{
            setStatusString('token is Expired')
        })

    }

    // console.log('init convo',conversations);

    const handleInit=(token)=>{
        setConversations([])
        initConversations(token)
        
    }

    const selectedConversation = conversations.find((e)=>e.sid===selectedConversationSid)

    let conversationContent;

    if(selectedConversation){
        conversationContent=(
            <Conversation 
                conversation={selectedConversation} 
                // phoneNumber={phoneNumber}
                companyId={companyId}
            />
        )
    }

  return (
    <div >
        <div onClick={()=>handleInit(tokenValue)}>
            <strong>{friendlyName}</strong>           
        </div> 
        <div>
            {status==='success' && conversations.length>0?(
                <div>
                {conversations.map(convo=>(
                    <div>
                    {convo.friendlyName===friendlyName &&(
                        <ConversationList
                        key={convo.sid}
                        conversation={convo}
                        setSelectedConversationSid={setSelectedConversationSid}
                        // onConversationClick={(item)=>{
                        //     setSelectedConversationSid(item.sid)
                        // }}
                        />
                    )}
                    </div>
                    
                ))}
                </div>
                

            ):(null)}
            
        </div>

        <div style={{width:'500px'}}>
                {conversationContent}
        </div>
    </div>
  )
}

export default InitConversations