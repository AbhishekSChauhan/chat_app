import React from 'react'
import ConvoList from './ConvoList';

const AllConversationsList = ({handleInit,tokenValue,friendlyName,conversationContent,
    status,conversations,selectedConversationSid,setSelectedConversationSid}) => {
  return (
    <div style={{display:'flex'}}>
        <div onClick={()=>handleInit(tokenValue)}>
        {friendlyName}
        </div>
        
        <div style={{display:'flex',justifyContent:'space-between'}}>
            <div>            
                {status==='success' && (
                    
                    <ConvoList
                        conversations={conversations}
                        selectedConversationSid={selectedConversationSid}
                        onConversationClick={(item) => {
                            setSelectedConversationSid(item.sid);
                        }}
                    />
                )} 
            </div>

            <div>
                {conversationContent}
            </div>
        </div>
    </div>
  )
}

export default AllConversationsList