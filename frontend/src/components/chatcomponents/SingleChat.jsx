import React, { useEffect, useState } from 'react'
import { Box, Text } from "@chakra-ui/layout";
import axios from 'axios';

import { Chatstate } from '../../context/ChatProvider';
import { FormControl, IconButton, Input, Spinner , useToast} from '@chakra-ui/react';
import { ArrowBackIcon } from '@chakra-ui/icons';
import { getSender , getSenderFull } from '../../config/LogicsChat';
import ProfileModal from './ProfileModal';
import UpdateGroupchatModal from './UpdateGroupchatModal';
import "./style.css";
import ScrollableChar from './ScrollableChar';
import io from "socket.io-client"
import Lottie from "react-lottie";
import animationData from "../../animation/typing.json";


// const ENDPOINT = "https://chat-app-api-lilac.vercel.app";
var socket, selectedChatCompare;
const defaultOptions = {
  loop: true,
  autoplay: true,
  animationData: animationData,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice",
  },
};


function SingleChat({fetchAgain,setFetchAgain}) {
  const { user , selectedchat,setselectedchat , notification , setnotification  } = Chatstate();
    const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [newMessage, setNewMessage] = useState("");
  const [socketconnected , setsocketconnected] = useState(false)
  const [typing , settyping] =useState(false);
  const [isTyping , setISTyping] =useState(false);

const  toast = useToast();


const fetchMessages = async () => {
  if (!selectedchat?._id) return;

  try {
    const config = {
      headers: {
        Authorization: `Bearer ${user?.JwtToken}`,
      },
    };

    setLoading(true);

    const { data } = await axios.get(
      `https://chat-app-api-git-main-parth-sukhadiyas.vercel.app/api/messages/${selectedchat?._id}`,
      config
    );
    setMessages(data);
    setLoading(false);

console.log(selectedchat?._id , "id");
    socket.emit("join Chat", selectedchat?._id);
    console.log("messages", data)


  } catch (error) {
    toast({
      title: "Error Occured!",
      description: "Failed to Load the Messages",
      status: "error",
      duration: 5000,
      isClosable: true,
      position: "top-right",
    });
  }
};



  const sendMessage =async(event)=>{
    if (event?.key === "Enter" && newMessage) {
      socket.emit("stop typing", selectedchat?._id)
      try {
  const config = {
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${user?.JwtToken}`,
    },
  };
  setNewMessage(" ");

  const { data } = await axios.post(
    "https://chat-app-api-git-main-parth-sukhadiyas.vercel.app/api/messages",
    {
      content: newMessage,
      chatId: selectedchat?._id,
    },
    config
  );

  setMessages([...messages, data]);
socket.emit("new message",data)

  
 } catch (error) {
  toast({
    title: "Error Occured!",
    description: "Failed to send the Message",
    status: "error",
    duration: 5000,
    isClosable: true,
    position: "top-right",
  });
 }

    }
  }
 

  useEffect(()=>{
    // connection code
    socket = io("https://vercel.com",{
    // withCredentials: true, 
    path:'/parth-sukhadiyas/chat-app-api/socket.io',

    transports: ['websocket'],
    // upgrade: false,
    // reconnectionAttempts: 5, // Number of reconnection attempts before giving up
    // timeout: 20000 // Connection timeout in milliseconds
      
    }
      )
console.log(user);
    socket.emit("setup",user)
    socket.on ("conncted " ,()=>setsocketconnected(true))
    socket.on("typing" , ()=> setISTyping(true));
    socket.on("stop typing" , ()=> setISTyping(false))


    
  })

  useEffect(() => {
    fetchMessages();
    selectedChatCompare = selectedchat
    // eslint-disable-next-line
  }, [selectedchat]);
useEffect(()=>{
  socket.on("message recieved", (newMessageRecieved)=>{
    console.log(newMessageRecieved, "newMessageRecieved");
    if(!selectedChatCompare || selectedChatCompare?._id !==newMessageRecieved.chat?._id){
      // give notification
      if (!notification.includes(newMessageRecieved)) {
        setnotification([newMessageRecieved, ...notification]);
        setFetchAgain(!fetchAgain);
      }
    }else{
      setMessages([...messages, newMessageRecieved])
    }
  })
})

 
const typingHandler =(e)=>{
  setNewMessage(e?.target?.value)
  
  if (!socketconnected) return;

  if (!typing) {
    settyping(true);
    socket.emit("typing", selectedchat?._id);
  }
  let lastTypingTime = new Date().getTime();
  var timerLength = 3000;
  setTimeout(() => {
    var timeNow = new Date().getTime();
    var timeDiff = timeNow - lastTypingTime;
    if (timeDiff >= timerLength && typing) {
      socket.emit("stop typing", selectedchat?._id);
      settyping(false);
    }
  }, timerLength);



}



  return (
    <>
    {
      selectedchat ?(
       <>
        <Text
            fontSize={{ base: "28px", md: "30px" }}
            pb={3}
            px={2}
            w="100%"
            fontFamily="Work sans"
            display="flex"
            justifyContent={{ base: "space-between" }}
            alignItems="center"
          >
            <IconButton
              display={{ base: "flex", md: "none" }}
              icon={<ArrowBackIcon />}
              onClick={() => setselectedchat("")}
            />
            {!selectedchat?.isGroupChat?(<>
            
            {getSender(user,selectedchat?.users)}
            <ProfileModal  user={getSenderFull(user,selectedchat?.users)}/>
            </>):(<>
            
              {selectedchat?.ChatName?.toUpperCase()}
                  <UpdateGroupchatModal
                    fetchAgain={fetchAgain}
                    setFetchAgain={setFetchAgain}
                    // fetchMessages={fetchMessages}
                  />
            
            </>)}


          </Text>   
          <Box
           display="flex"
           flexDir="column"
           justifyContent="flex-end"
           p={3}
           bg="#E8E8E8"
           w="100%"
           h="100%"
           borderRadius="lg"
           overflowY="hidden">
               {loading ? (
              <Spinner
                size="xl"
                w={20}
                h={20}
                alignSelf="center"
                margin="auto"
              />
            ) : (
              <div className="messages">
              <ScrollableChar messages={messages}/>
              </div>
            )}

             <FormControl
              onKeyDown={sendMessage}
              id="first-name"
              isRequired
              mt={3}
            >
            {isTyping && <div><Lottie
                    options={defaultOptions}
                    // height={50}
                    width={70}
                    style={{ marginBottom: 15, marginLeft: 0 }}
                  /></div>}
              <Input
                variant="filled"
                bg="#E0E0E0"
                placeholder="Enter a message.."
                value={newMessage}
                onChange={typingHandler}
              />
                          </FormControl>


          </Box>
       
       </> 
      ):(
        <Box display="flex" alignItems="center" justifyContent="center" h="100%">
          <Text fontSize="3xl" pb={3} fontFamily="Work sans">
            Click  to Start Chating
          </Text>
        </Box>



      )
    }
    
    </>
  )
}

export default SingleChat
