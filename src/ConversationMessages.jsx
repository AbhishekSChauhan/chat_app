import React from 'react'
import MessageBubble from './MessageBubble'

const ConversationMessages = ({messages,identity}) => {
  return (
    <div>
        <ul>
            {messages.map(m=>{
                if(m.state.participantSid==="MBdd82b3f3571444b79e4deaa34de086e7"){
                    return <MessageBubble key={m.index} direction='outgoing' message={m} />
                }else{
                    return <MessageBubble key={m.index} direction='incoming' message={m} />
                }
            })}
        </ul>
    </div>
  )
}

export default ConversationMessages