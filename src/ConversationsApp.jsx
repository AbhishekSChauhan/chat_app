import axios from 'axios'
import React, { useEffect, useState } from 'react'
import InitConversations from './InitConversations';
import Conversation from './Conversation';

const base_url='https://dev-api.bizly.me/api/v1'
// const base_url='http://localhost:9999/api/v1'

const companyId= '5738177c-5dc7-4c1a-a20a-f4c576c74c63'

const ConversationsApp = () => {
    const [tokens, setTokens] = useState([])
    // const [myToken, setMyToken] = useState('')
    // const [companyId, setCompanyId] = useState('')
    // const [message, setMessage] = useState('')
    // const [conversationSID, setConversationSID] = useState(null)
    const [conversations, setConversations] = useState([])
    const [selectedConversationSid, setSelectedConversationSid] = useState(null)

    const [newPhoneNumber, setNewPhoneNumber] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')

    const phNo={
        "phone_number" : `+${phoneNumber}`
    }

    // console.log('ph',phNo);
    
    useEffect(()=>{
        // createConversation()
        // getListingData()
    },[])
  
    useEffect(()=>{
        // getToken()
        refreshToken()
    },[companyId,phoneNumber])

    const addCompany=async()=>{        
        try{
            const response=await axios.get(`${base_url}/company/${companyId}`,)
            console.log('company id res',response);
            // setCompanyId(response.data.data.entity.company_id)
        }catch(e){
            console.log(e);
        }
    }

    // const getListingData=async()=>{
    //     const res=axios.get(`https://dev-api.bizly.me/api/v1/listing/get-all/${companyId}`)
    //     console.log('listing data',res);
    // }   


    const createConversation=async()=>{
        try{
            
            const response = await axios.post(`${base_url}/chat/add-conversation/${companyId}`,phNo)
            console.log('convo',response)
            // setStatusString(response.data.data)
            // setStatus(response.data.status)
            // setConversationSID(response.data.data)
        }catch(e){
            console.log(e);
        }
    }
    

    const getToken=async()=>{
        try{
            const response = await axios.get(`${base_url}/chat/get-token/${companyId}`)
            console.log('tokens',response)
            setTokens(response.data.data)
        }catch(e){
            console.log(e);
        }
    }

    const refreshToken=async()=>{
        const res=await axios.post(`${base_url}/chat/refresh-token`,{withCredentials:true})
        console.log('refresh token',res);
        setTokens(res.data.data)
    }

    const addContact=(e)=>{
        e.preventDefault()
        setPhoneNumber(newPhoneNumber)
        setNewPhoneNumber('')
        createConversation()
    }

    

    

    
    return (
        <div>            
            <button onClick={addCompany}>Get Company id</button>
            
            <form onSubmit={addContact}>
                <input type={'number'} value={newPhoneNumber}
                onChange={(e)=>setNewPhoneNumber(e.target.value)}
                placeholder='Enter new contact'
                />
                <button type='submit'>Add</button>
            </form>
            <div style={{display:'flex'}}>
            <div style={{width:'200px'}}>
                {tokens.map((token,i)=>(
                    <InitConversations 
                        key={token.token} 
                        companyId={companyId} 
                        friendlyName={token.friendly_name}
                        tokenValue={token.token}
                        conversations={conversations}
                        setConversations={setConversations}
                        selectedConversationSid={selectedConversationSid}
                        setSelectedConversationSid={setSelectedConversationSid}
                        refreshToken={refreshToken}
                    />
                ))}
            </div>
            
            </div>
        </div>
    )
}

export default ConversationsApp