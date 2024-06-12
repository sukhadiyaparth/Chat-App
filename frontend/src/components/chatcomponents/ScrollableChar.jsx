import React from 'react'
import  ScrollableFeed from 'react-scrollable-feed'
import { isLastMessage, isSameSender, isSameSenderMargin, isSameUser } from '../../config/LogicsChat'
import { Avatar, Tooltip } from '@chakra-ui/react'
import { Chatstate } from '../../context/ChatProvider';
function ScrollableChar({messages}) {
  const{user} = Chatstate();
  console.log(user, "user")
  console.log(messages, "sender")

// console.log(messages[0]._id , "m1")
  return (
    <ScrollableFeed>
      
        {messages && 
        messages.map((m,i)=>(
           

            <div style={{ display: "flex" }} key={m?._id} >
                {(isSameSender(messages, m, i, user?._id) ||
              isLastMessage(messages, i, user?._id)) && (
              <Tooltip label={m?.sender?.name} placement="bottom-start" hasArrow>
                <Avatar
                  mt="7px"
                  mr={1}
                  size="sm"
                  cursor="pointer"
                  name={m?.sender?.name}
                  src={m?.sender?.pic}
                />
              </Tooltip>
            )}
            <span
            
              style={{
                backgroundColor: `${
                  m.Sender?._id === user?._id ? "#BEE3F8" : "#B9F5D0"
                }`,
                maxWidth: "75%",  

                marginLeft: isSameSenderMargin(messages, m, i, user?._id),
                marginTop: isSameUser(messages, m, i, user?._id) ? 3 : 10,
                borderRadius: "20px",
                padding: "5px 15px",
              }}
            >
              {m?.content}
            </span>
            
            </div>
        ))
        }
    </ScrollableFeed>
  )
}

export default ScrollableChar