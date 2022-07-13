import axios from 'axios'
import React, { useEffect, useState } from 'react'
import StartConversation from './StartConversation'

const base_url='https://dev-api.bizly.me/api/v1'
const companyId= '5738177c-5dc7-4c1a-a20a-f4c576c74c63'
export const ChatApp = () => {
    const [tokens, setTokens] = useState([])

    useEffect(()=>{
        refreshToken()
    },[])
    const refreshToken=async()=>{
        const res=await axios.post(`${base_url}/chat/refresh-token`,{withCredentials:true})
        console.log('refresh token',res);
        setTokens(res.data.data)
    }

    return (
        <div style={{display:'flex',margin:'20px 40px'}}>
            <div>
                {tokens.map(token=>(
                    <div>
                        <StartConversation 
                            key={token.token}
                            friendlyName={token.friendly_name}
                            tokenValue={token.token}
                            refreshToken={refreshToken}
                            companyId={companyId}
                        />
                    </div>
                ))}
            </div>
        </div>
    )
}
