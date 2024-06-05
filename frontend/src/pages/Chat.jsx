import React, { useEffect, useState } from 'react'
import {Chatstate} from '../context/ChatProvider'
import { Box ,Flex   } from '@chakra-ui/react'
import SideDrawer from '../components/chatcomponents/SideDrawer';
import MyChat from '../components/chatcomponents/MyChat';
import ChatBox from '../components/chatcomponents/ChatBox';
import { redirect, useNavigate } from 'react-router-dom';

function Chat() {
  const { user } = Chatstate();
  const navigate = useNavigate()
  const [fetchAgain, setFetchAgain] = useState(false);
  console.log(user)
    if(!user){
      navigate("/")
    }
 

  return (

    <div style={{ width: "100%" }}>
     <SideDrawer/> 
      <Box 
       display="flex"
       justifyContent="space-between"
       w="100%"
       h="91.5vh"
       p="10px">
        <MyChat fetchAgain={fetchAgain} />
       <ChatBox  fetchAgain={fetchAgain} setFetchAgain={setFetchAgain}  />
      </Box>


    </div>
  )
}

export default Chat