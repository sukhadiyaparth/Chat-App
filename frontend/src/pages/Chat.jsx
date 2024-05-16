import React from 'react'
import Chatstate from '../context/ChatProvider'
import { Box ,Flex   } from '@chakra-ui/react'
import SideDrawer from '../components/chatcomponents/SideDrawer';
import MyChat from '../components/chatcomponents/MyChat';
import ChatBox from '../components/chatcomponents/ChatBox';

function Chat() {
  // const { user } = Chatstate();
  return (
    <div style={{ width: "100%" }}>
       <SideDrawer/>
      <Box 
       display="flex"
       justifyContent="space-between"
       w="100%"
       h="91.5vh"
       p="10px">
         <MyChat/>
         <ChatBox/>
      </Box>


    </div>
  )
}

export default Chat