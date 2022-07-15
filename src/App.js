import logo from './logo.svg';
import './App.css';
import ConversationsApp from './ConversationsApp';
import { ChatApp } from './ChatApp';
import { useState } from 'react';
import axios from 'axios';

const base_url='https://dev-api.bizly.me/api/v1'
const companyId= '5738177c-5dc7-4c1a-a20a-f4c576c74c63'

function App() {
  const [newPhoneNumber, setNewPhoneNumber] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [isConversationAdded, setIsConversationAdded] = useState(false)

  const addContact=(e)=>{
    e.preventDefault()
    // setPhoneNumber(newPhoneNumber)
    setNewPhoneNumber('')
    console.log(newPhoneNumber,phNo);
    createConversation()
  
  }

  const phNo={
    "phone_number" : `+${newPhoneNumber}`
  }

  const createConversation=async()=>{
    try{
        
        const response = await axios.post(`${base_url}/chat/add-conversation/${companyId}`,phNo,{withCredentials:true})
        console.log('convo',response)
        setIsConversationAdded(true)
    }catch(e){
        console.log(e);
    }
}

  return (
    <div className="App">
      {/* <ConversationsApp /> */}
      <div>
          <form onSubmit={addContact}>
              <input type={'number'} value={newPhoneNumber}
              onChange={(e)=>setNewPhoneNumber(e.target.value)}
              placeholder='Enter new contact'
              />
              <button type='submit'>Add</button>
          </form>
      </div>
      <ChatApp isConversationAdded={isConversationAdded} />
    </div>
  );
}

export default App;
