import React from 'react'

const ChatInputBox = ({sendMessage,newMessage,onMessageChanged}) => {
  return (
    <div>
        <form onSubmit={sendMessage}>
            <input 
                type={'text'}
                value={newMessage}
                onChange={onMessageChanged}
                placeholder='write something awesome'
            />
            <button type='submit'>Send</button>
        </form>
    </div>
  )
}

export default ChatInputBox