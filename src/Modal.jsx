import React from 'react'
import './MessageBubble.css'
const Modal = () => {
  return (
    <div className='modal'>
        <div className='modal-content'>
            <div className='modal-body'>
                Modal Content
            </div>
            <div className='modal-footer'>
                <button >Close</button>
            </div>
        </div>
    </div>
  )
}

export default Modal