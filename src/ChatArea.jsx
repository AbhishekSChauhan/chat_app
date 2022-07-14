import React from 'react'
import ChatInputBox from './ChatInputBox'
import ConversationMessages from './ConversationMessages'

const ChatArea = ({messages,conversation,sendMessage,newMessage,onMessageChanged}) => {
  return (
    <div>
        
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

export default ChatArea