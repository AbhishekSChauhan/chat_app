import React, { useState } from 'react'
import { useEffect } from 'react'
import Media from './Media'
import './MessageBubble.css'

const MessageBubble = ({direction,message}) => {
    const [msgType, setMsgType] = useState('')
    const [hasMedia, setHasMedia] = useState(message.type==='media')
    const [mediaDownloadFailed, setMediaDownloadFailed] = useState(false)
    const [mediaUrl, setMediaUrl] = useState(null)

    useEffect(()=>{
        const getMsgType=async()=>{
            const res=await message.getParticipant()
            // console.log('message.getParticipant()',res);
            setMsgType(res.type)
            // const attachedMedia=message.attachedMedia
            // console.log('attached media',attachedMedia.map(e=>e.services.mcsClient.network.config.mediaUrl));
            if(hasMedia){
              try{
                const mediaRes=await message.media.getContentTemporaryUrl()
                // console.log('mediaRes',mediaRes);
                setMediaUrl(mediaRes)
              }catch(e){
                console.log('error',e);
                setMediaDownloadFailed(true)
              }              
            }
        }
        getMsgType()
        document.getElementById(message.sid).scrollIntoView({behavior:'smooth'})

    },[])

  return (
    <li id={message.sid} className={direction==='incoming'?'received_msg':'outgoing_msg'} >
        <div className={direction==='incoming'?'received_withd_msg':'sent_msg'}>
          <div>
            <strong>
              {/* {message.author} */}
            </strong>
            <div>
                <div>
                  {hasMedia && (
                    <Media 
                      hasFailed={mediaDownloadFailed}
                      url={mediaUrl}
                    />
                  )}
                </div>
                {message.body}
                <span>
                   {" | "}  {message.state.timestamp.toLocaleTimeString()}
                </span>   
            </div>     
                
          </div>
          
        </div>
      </li>
  )
}

export default MessageBubble