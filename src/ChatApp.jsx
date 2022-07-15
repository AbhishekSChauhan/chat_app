import axios from 'axios'
import React, { useEffect, useState } from 'react'
import StartConversation from './StartConversation'

const base_url='https://dev-api.bizly.me/api/v1'
const companyId= '5738177c-5dc7-4c1a-a20a-f4c576c74c63'

export const ChatApp = ({isConversationAdded}) => {
    const [tokens, setTokens] = useState([])
    // const [newPhoneNumber, setNewPhoneNumber] = useState('')
    // const [phoneNumber, setPhoneNumber] = useState('')
    // const [isConversationAdded, setIsConversationAdded] = useState(false)

    // const phNo={
    //     "phone_number" : `+${newPhoneNumber}`
    // }

    useEffect(()=>{
        refreshToken()
    },[isConversationAdded])

    // useEffect(()=>{
    //     refreshToken()
    // },[])

    const refreshToken=async()=>{
        const res=await axios.post(`${base_url}/chat/refresh-token`,{withCredentials:true})
        console.log('refresh token',res);
        setTokens(res.data.data)
    }

    // const createConversation=async()=>{
    //     try{
            
    //         const response = await axios.post(`${base_url}/chat/add-conversation/${companyId}`,phNo,{withCredentials:true})
    //         console.log('convo',response)
    //         setIsConversationAdded(true)
    //     }catch(e){
    //         console.log(e);
    //     }
    // }

    // const addContact=(e)=>{
    //     e.preventDefault()
    //     // setPhoneNumber(newPhoneNumber)
    //     setNewPhoneNumber('')
    //     console.log(newPhoneNumber,phNo);
    //     createConversation()
    // }

    return (
        <div style={{display:'flex',margin:'20px 40px'}}>
            
            <div>
                {tokens.map(token=>(
                    <div key={token.token}>
                        <StartConversation 
                            key={token.token}
                            friendlyName={token.friendly_name}
                            tokenValue={token.token}
                            refreshToken={refreshToken}
                            companyId={companyId}
                            // isConversationAdded={isConversationAdded}
                        />
                    </div>
                ))}
            </div>
        </div>
    )
}
