import React, { useEffect, useState } from 'react'
import { List, Typography } from "antd";
const { Text } = Typography;

const ConvoList = ({ conversation, setMessagesArray,latestTextValue, setParticipantIdentity,setSelectedConversationSid }) => {
    const [participants, setParticipants] = useState([])
    const setSID=(id)=>{
        setSelectedConversationSid(id)
        getParticipant(id)
    }

    useEffect(()=>{
        getMessages()
    },[conversation])
// console.log(conversation.friendlyName);
    const getParticipant=async()=>{
        try{
            const res=await conversation.getParticipants()
            // console.log('participants res',res); 
            setParticipants(res)           
        }catch(err){
            console.log('participants err',err);
        }
    }

    // Assigning participants to check incoming and outgoing msgs
    const identity=(participants.map((e)=>{
        if(e.identity!==null){
            return e.sid
        }
    }).filter(e=>e!==undefined).join(''))
    setParticipantIdentity(identity)

    const getMessages=async()=>{
        try{
            const res=await conversation.getMessages()
            // console.log('messages res',res); 
            setMessagesArray(res.items)
            // let msgArray=res.items
            // console.log("msgArray",msgArray[msgArray.length-2].type);

            // setParticipants(res)           
        }catch(err){
            console.log('messages err',err);
        }
    }

    return (
    
    <div>
        <div onClick={()=>setSID(conversation.sid)}>
            <strong>
                {conversation.friendlyName!==null ? conversation.friendlyName: conversation.configuration.userIdentity}
                {/* {conversation.friendlyName} || {conversation.userIdentity} */}
            </strong>
            <p>{latestTextValue}</p>
        </div>
        {/* <List
                header={"Open Conversations"}
                dataSource={conversations}
                renderItem={item => {
                    const activeChannel = item.sid === selectedConversationSid;
                    // const conversationItemClassName = joinClassNames([
                    //     conversationsItemStyles['conversation-item'],
                    //     activeChannel && conversationsItemStyles['conversation-item--active']
                    // ]);

                    return (
                        <List.Item
                            key={item.sid}
                            onClick={() => onConversationClick(item)}
                            // className={conversationItemClassName}
                        >
                            <Text
                                strong
                                // className={conversationsItemStyles['conversation-item-text']}
                            >
                                {item.friendlyName || item.sid}
                            </Text>
                        </List.Item>
                    )
                }}
            /> */}
    </div>
  )
}

export default ConvoList