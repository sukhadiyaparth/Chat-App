import React, { useEffect, useState } from 'react'
import { Chatstate } from '../../context/ChatProvider';
import { Box, Button, Stack, Text, useToast } from '@chakra-ui/react';
import axios from "axios";
import { AddIcon } from "@chakra-ui/icons";
import ChatLoading from './ChatLoading';
import { getSender } from '../../config/LogicsChat';
function MyChat() {
  const { user , selectedchat,setselectedchat , chat,setchat } = Chatstate();
  const [loggedUser , setloggedUser] = useState()
  const toast = useToast();

const fetchChat = async()=> {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${user?.JwtToken}`,
      },
    };

    const { data } = await axios.get("/api/chat", config);
    setchat(data);
  } catch (error) {
    toast({
      title: "Error Occured!",
      description: "Failed to Load the chats",
      status: "error",
      duration: 5000,
      isClosable: true,
      position: "bottom-left",
    });
  }
};

useEffect(()=>{

  fetchChat();

},[])


  return (
      <Box
      display={{ base: setselectedchat ? "none" : "flex", md: "flex" }}
      flexDir="column"
      alignItems="center"
      p={3}
      // bg="black"
      w={{ base: "100%", md: "31%" }}
      borderRadius="lg"
      borderWidth="1px"
      >
        <Box
                pb={3}
                px={3}
                fontSize={{ base: "28px", md: "30px" }}
                fontFamily="Work sans"
                display="flex"
                w="100%"
                // color="white"
                justifyContent="space-between"
                alignItems="center"
        >
                  My Chats

                  <Button
                   display="flex"
                   fontSize={{ base: "17px", md: "10px", lg: "17px" }}
                   rightIcon={<AddIcon />}
       >
                  Create Goup Chat
                  </Button>


        </Box>

        <Box
                        w="full"

        >
          {chat ?<Stack overflowY="scroll">

            {
              chat.map((chats)=>(
                <Box
                onClick={() => setselectedchat(chats)}
                cursor="pointer"
                bg={selectedchat === chats ? "#38B2AC" : "#E8E8E8"}
                color={selectedchat === chats ? "white" : "black"}
                px={3}
                py={2}
                borderRadius="lg"
                key={chat._id}
                >
                    <Text>
                      {chats.isGroupChat? chats.ChatName:
                      getSender(loggedUser, chats.users)
                      }
                    </Text>
                </Box>
              ))
            }

          </Stack> :(<ChatLoading/>)}
        </Box>

      </Box>


  )
}

export default MyChat