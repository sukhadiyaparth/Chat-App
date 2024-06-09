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

function SingleChat({fetchAgain,setFetchAgain}) {
  const { user , selectedchat,setselectedchat , chat,setchat } = Chatstate();
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [newMessage, setNewMessage] = useState("");
const  toast = useToast();


const fetchMessages = async () => {
  if (!selectedchat) return;

  try {
    const config = {
      headers: {
        Authorization: `Bearer ${user?.JwtToken}`,
      },
    };

    setLoading(true);

    const { data } = await axios.get(
      `/api/messages/${selectedchat?._id}`,
      config
    );
    setMessages(data);
    setLoading(false);

  } catch (error) {
    toast({
      title: "Error Occured!",
      description: "Failed to Load the Messages",
      status: "error",
      duration: 5000,
      isClosable: true,
      position: "bottom",
    });
  }
};



  const sendMessage =async(event)=>{
    if (event.key === "Enter" && newMessage) {
 try {
  const config = {
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${user?.JwtToken}`,
    },
  };

  setNewMessage("");
  const { data } = await axios.post(
    "/api/messages",
    {
      content: newMessage,
      chatId: selectedchat?._id,
    },
    config
  );

  setMessages([...messages, data]);


  
 } catch (error) {
  toast({
    title: "Error Occured!",
    description: "Failed to send the Message",
    status: "error",
    duration: 5000,
    isClosable: true,
    position: "top-right2",
  });
 }

    }
  }
  const typingHandler =(e)=>{
    setNewMessage(e.target.value)
  }


  useEffect(() => {
    fetchMessages();

    // eslint-disable-next-line
  }, [selectedchat]);
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
                    fetchMessages={fetchMessages}
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