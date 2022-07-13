import { Spin, Modal, Icon } from "antd";
import React, { useState } from 'react'
import './MessageBubble.css'

const Media = ({hasFailed,url}) => {
  return (
    <div 
        className={`${'media'}${!url ? " " + 'placeholder' : ""}`}
        onClick={() => {
        Modal.info({
            centered: true,
            icon: null,
            okText: "Close",
            width: "60%",
            content: (
            <div className={'picture_container'}>
                <img style={{ width: "100%", height: "100%" }} src={url} alt='media' />
            </div>
            )
        })
    }}
    >
        {!url && !hasFailed && <div>Loading</div>}

        {hasFailed && (
            <div style={{ display: "flex", flexDirection: "column" }}>
                <p>Failed to load media</p>
            </div>
        )}

        {!hasFailed && url && (
            <div className={'media_icon'}>
            <div style={{ zIndex: 123, position: "absolute" }}>
                View
              {/* <Icon type={"eye"} style={{ fontSize: "5em", opacity: 0.3 }} /> */}
            </div>
            <div
              className={'picture_preview'}
              style={{ backgroundImage: `url(${url})`, zIndex: 122 }}
            ></div>
          </div>
        )}
    </div>
  )
}

export default Media