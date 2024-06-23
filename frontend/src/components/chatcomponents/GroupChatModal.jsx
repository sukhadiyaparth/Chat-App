import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  useDisclosure,
  FormControl,
  Input,
  Box,
  useToast
} from "@chakra-ui/react";import React, { useState } from 'react'
import UserListItem from '../UserAvtar/UserListItem'
import axios from "axios";

import { Chatstate } from '../../context/ChatProvider';
import Userdelete from "../UserAvtar/Userdelete";

function GroupChatModal({children}) {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [groupChatName, setgroupChatName] = useState();
    const [selectedusaer, setselectedusaer] = useState([]);
    const [search, setsearch] = useState();
    const [searchResult , setsearchResult] = useState([]);
    const [loading , setloading] = useState(false)


    const toast = useToast()

    const{user, chat , setchat} = Chatstate();
    const handleSearch = async(usersearch)=>{
      setsearch(usersearch);
    if (!usersearch) {
      return;
    }

    try {
      setloading(true);
      const config = {
        headers: {
          Authorization: `Bearer ${user?.JwtToken}`,
        },
      };
      const { data } = await axios.get(`https://chat-app-api-git-main-parth-sukhadiyas.vercel.app/api/user?search=${usersearch}`, config);
      console.log(data);
      setloading(false);
      setsearchResult(data);
    } catch (error) {
      toast({
        title: "Error Occured!",
        description: "Failed to Load the Search Results",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top-right",
      });
    }
    }
    const handleSubmit =async()=>{

      if (!groupChatName || !selectedusaer) {
        toast({
          title: "Please fill all the feilds",
          status: "warning",
          duration: 5000,
          isClosable: true,
          position: "top-right",
        });
        return;
      }
  
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${user?.JwtToken}`,
          },
        };
        const response = await axios.post(
          `https://chat-app-api-git-main-parth-sukhadiyas.vercel.app/api/chat/group`,
          {
            name: groupChatName,
            user: JSON.stringify(selectedusaer.map((u) => u._id)),
          },
          config
        );
        console.log(response?.data)
        setchat([response?.data, ...chat]);
        onClose();
        toast({
          title: "New Group Chat Created!",
          status: "success",
          duration: 5000,
          isClosable: true,
          position: "top-right",
        });
      } catch (error) {
        toast({
          title: "Failed to Create the Chat!",
          description: error.response.data,
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "top-right",
        });
      }

    }
    const handleGroup =(userToAdd)=>{
      if (selectedusaer.includes(userToAdd)) {
        toast({
          title: "User already added",
          status: "warning",
          duration: 5000,
          isClosable: true,
          position: "top-right",
        });
        return;
      }
  
      setselectedusaer([...selectedusaer, userToAdd]);
    }

    const handleDelete = (deluser)=>{
      setselectedusaer(selectedusaer.filter((sel)=> sel._id !== deluser._id))
    }
  return (
    <>
    <span onClick={onOpen}>{children}</span>

<Modal isOpen={isOpen} onClose={onClose}>
  <ModalOverlay />
  <ModalContent>
    <ModalHeader
    fontSize="35px"
    fontFamily="work sans"
    display="flex"
    justifyContent="center"
    >Create Group Chat</ModalHeader>
    <ModalCloseButton />
    <ModalBody display="flex" flexDir="column" alignItems="center">
    <FormControl>
              <Input
                placeholder="Chat Name"
                mb={3}
                onChange={(e) => setgroupChatName(e.target.value)}
              />
            </FormControl>
            <FormControl>
              <Input
                placeholder="Add Users "
                mb={1}
                onChange={(e) => handleSearch(e.target.value)}
              />
            </FormControl>
            {/* render Search */}
            <Box w="100%" display="flex" flexWrap="wrap">
              {selectedusaer.map((user) => (
                <Userdelete
                  key={user._id}
                  user={user}
                  handleFunction={() => handleDelete(user)}
                />
              ))}
            </Box>

            {loading ? (
              // <ChatLoading />
              <div>Loading...</div>
            ) : (
              searchResult
                ?.slice(0, 4)
                .map((user) => (
                  <UserListItem
                    key={user?._id}
                    user={user}
                    handleFunction={() => handleGroup(user)}
                  />
                ))
            )}
    </ModalBody>

    <ModalFooter>
      <Button colorScheme='blue'  onClick={handleSubmit}>
        CreatChat      </Button>
    </ModalFooter>
  </ModalContent>
</Modal>
    
    </>
  )
}

export default GroupChatModal
