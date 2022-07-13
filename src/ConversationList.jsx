import React, { useState } from 'react'
import NewCard from './NewCard';


function removeDuplicates(originalArray, prop) {
    var newArray = [];
    var lookupObject  = {};

    for(var i in originalArray) {
       lookupObject[originalArray[i][prop]] = originalArray[i];
    }

    for(i in lookupObject) {
        newArray.push(lookupObject[i]);
    }
     return newArray;
}

const ConversationList = ({conversation, setSelectedConversationSid, status}) => {
    // const [participant, setParticipant] = useState('')
    console.log('list convo',conversation.participants);
//     let uniqueConversations = removeDuplicates(conversation, "friendlyName");
    const participant=Object.values(conversation.participants)
    let array_keys=new Array()

    


    const addSids=()=>{
      setSelectedConversationSid(conversation.sid)
    }
    return (
    <div>
            <div onClick={addSids}>
              {conversation.friendlyName}
            </div>
            {/* <NewCard /> */}
    </div>
  )
}

export default ConversationList