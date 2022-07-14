import React from 'react'
import ConvoList from './ConvoList';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));


const AllConversationsList = ({latestTextValue,handleInit,tokenValue,friendlyName,conversationContent,setMessagesArray,
    status,conversations,selectedConversationSid,setSelectedConversationSid,setParticipantIdentity}) => {
  return (
    <div style={{display:'flex'}}>

        <div 
        onClick={()=>handleInit(tokenValue)}
        >
            {friendlyName}
            {/* <p>{latestTextValue}</p> */}
        </div>
        
        
        <div style={{display:'flex'}}>
            <div>            
                {status==='success' && ( 
                    <div> 
                    {conversations.map(conversation=>(
                        <ConvoList
                            key={conversation.sid}
                            latestTextValue={latestTextValue}
                            conversation={conversation}
                            selectedConversationSid={selectedConversationSid}
                            setSelectedConversationSid={setSelectedConversationSid}
                            setParticipantIdentity={setParticipantIdentity}
                            setMessagesArray={setMessagesArray}
                        />                        
                    ))} 
                    </div>                 
                    
                )} 
            </div>  

            <div style={{width:'600px',height:'50px'}}>
                {conversationContent}
            </div>                
        </div>
    </div>
  )
}

export default AllConversationsList