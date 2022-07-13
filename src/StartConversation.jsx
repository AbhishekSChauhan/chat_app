import React, { useState } from 'react'
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
            // console.log('joining convo');
            
            setConversations([...conversations,conversation])
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

    const handleInit=(token)=>{
        initConversations(token)
    }

    const uniqConversation=conversations.filter((e,i,a)=>a.indexOf(e)===i)
    console.log('conversations',conversations,selectedConversationSid,uniqConversation);

    const selectedConversation = conversations.find((e)=>e.sid===selectedConversationSid)
console.log('selectCOnvo',selectedConversation);
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
        <div style={{display:'flex'}}>
            <div >
                <AllConversationsList 
                    handleInit={handleInit}
                    tokenValue={tokenValue}
                    friendlyName={friendlyName}
                    conversations={conversations}
                    selectedConversationSid={selectedConversationSid}
                    setSelectedConversationSid={setSelectedConversationSid}
                    status={status}
                    conversationContent={conversationContent}
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