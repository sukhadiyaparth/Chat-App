import { Box, Button, Tooltip, Text, MenuButton, Menu, MenuList, Avatar, MenuItem, MenuDivider, useDisclosure , Input, Spinner } from '@chakra-ui/react';
import React, { useState } from 'react'
import { BellIcon, ChevronDownIcon } from "@chakra-ui/icons";
import ProfileModal from './ProfileModal';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@chakra-ui/react';

import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
} from '@chakra-ui/react'
import { Chatstate } from '../../context/ChatProvider';
import axios from 'axios';
import ChatLoading from './ChatLoading';
import UserListItem from '../UserAvtar/UserListItem';
import { getSender } from '../../config/LogicsChat';

function SideDrawer() {
  const [search, setsearch] = useState("");
  const [serchResult, setserchResult] = useState([]);
  const [loading, setloading] = useState(false);
  const [Chatloading, setChatloading] = useState();
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure()
  const btnRef = React.useRef()
  const toast = useToast();
  const { user , setselectedchat ,setuser, chat,setchat, notification , setnotification } = Chatstate();


  const logoutHandler = () => {
    localStorage.removeItem("user_details")
    navigate('/')
    setuser(null)
  }
  
  const  handleSearch = async()=>{
        if(!search){

          toast({
            title: 'Please Enter  something in search',
            status: 'warning',
            duration: 4000,
            isClosable: true,
            position: "top-right"
          });
          return;

        }

        try{
          setloading(true);
              const  config={
                headers: {
                  Authorization : `Bearer ${user?.JwtToken}`
                }
              } ;

          const {data} = await axios.get(`https://chat-app-api-git-main-parth-sukhadiyas.vercel.app/api/user?search=${search}`, config);
          
          setloading(false)
          setserchResult(data)
        }
        catch(err){
          toast({
            title: 'Error Occured',
            status: 'Faild to Load the Search Results',
            duration: 4000,
            isClosable: true,
            position: "top-right"
          });
        }
  }

  const accessChat = async(userId)=>{
    console.log(userId);


    try {
      setChatloading(true);
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${user?.JwtToken}`,
        },
      };
      const { data } = await axios.post(`https://chat-app-api-git-main-parth-sukhadiyas.vercel.app/api/chat`, {userId} , config);
      // we update the chat or apnded the chat if it is exist
      if (!chat.find((c) => c?._id === data?._id)) setchat([data, ...chat]);
      setselectedchat(data);
      setChatloading(false);
      onClose();
    } catch (error) {
      toast({
        title: "Error fetching the chat",
        description: error.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top-right",
      });
    }


  }

  return (
    <>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        bg="white"
        w="100%"
        p="5px 10px 5px 10px"
        borderWidth="5px">

        <Tooltip label="Search User to chat " hasArrow placement='bottom-end'>
          <Button variant="ghost" ref={btnRef}  onClick={onOpen}>
            <i className='fas fa-search'></i>
            <Text display={{ base: "none", md: "flex" }} px='4'>
              Search User
            </Text>
          </Button>

        </Tooltip>


        <Text fontSize="2xl" fontFamily="work sans">
          Chat App
        </Text>
        <div>
          <Menu>
            <MenuButton p={1}>
              <BellIcon fontSize='2xl' m={1} />
            </MenuButton>
            <MenuList pl={2}>
              {!notification.length && "No New Messages"}
              {notification.map((notif)=>{
                <MenuItem key={notif?._id} onClick={()=>{
                  setselectedchat(notif?.chat)
                  setnotification(notification.filter((n)=> n!== notif))
                }}>
                  {
                    notif?.chat?. isGroupChat ? `New Message in ${notif?.chat?.ChatName}`:`New Message from ${getSender(user,notif?.chat?.users)}`
                  }
                
                </MenuItem>
              })}
            </MenuList>
          </Menu>
          <Menu>
            <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
              <Avatar size="sm" cursor="pointer" name={user?.name}
              />
            </MenuButton>
            <MenuList>
              <ProfileModal user={user}>
                <MenuItem>Profile</MenuItem>
              </ProfileModal>
              <MenuDivider />
              <MenuItem onClick={logoutHandler}>Log Out</MenuItem>
            </MenuList>

          </Menu>
        </div>


      </Box>


      <Drawer
        isOpen={isOpen}
        placement='left'
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          
          <DrawerHeader borderBottomWidth="1px">Search Users</DrawerHeader>

          <DrawerBody>
          <Box display="flex" pb={2}>

            <Input
            placeholder="Search by name or email"
            mr={2}
            value={search}
            onChange={(e)=>setsearch(e.target.value)}
            />
          <Button onClick={handleSearch}> Go</Button>
          </Box>
          {loading ? (
            <ChatLoading/>)
          :(
            serchResult?.map((user)=>(
              <UserListItem
              key= {user?._id}
              user= {user}
              handleFunction={()=>accessChat(user?._id)}
              
              />
            ))
          )}
          {Chatloading  && <Spinner ml="auto" d="flex" />}
        </DrawerBody>
       
        </DrawerContent>
        
      </Drawer>
    </>
  )
}

export default SideDrawer
