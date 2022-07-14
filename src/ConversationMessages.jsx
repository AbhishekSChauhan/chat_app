import React from 'react'
import MessageBubble from './MessageBubble'

const ConversationMessages = ({messages,participantIdentity}) => {
  return (
    <div>
        <ul>
            {messages.map(m=>{
                if(m.state.participantSid===participantIdentity){
                    return <MessageBubble key={m.index} direction='outgoing' message={m}  />
                }else{
                    return <MessageBubble key={m.index} direction='incoming' message={m}  />
                }
            })}
        </ul>
    </div>
  )
}

export default ConversationMessages