import React from 'react'
import { List, Typography } from "antd";
const { Text } = Typography;

const ConvoList = ({ conversations, selectedConversationSid, onConversationClick }) => {
  return (
    <div>
        <List
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
            />
    </div>
  )
}

export default ConvoList