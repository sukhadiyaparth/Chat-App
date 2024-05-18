import { Box, Button, Tooltip, Text, MenuButton, Menu, MenuList, Avatar, MenuItem, MenuDivider, useDisclosure , Input } from '@chakra-ui/react';
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
function SideDrawer() {
  const [serch, setserch] = useState("");
  const [serchResult, setserchResult] = useState([]);
  const [loading, setloading] = useState(false);
  const [Chatloading, setChatloading] = useState();
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure()
  const btnRef = React.useRef()
  const toast = useToast();


  const logoutHandler = () => {
    localStorage.removeItem("user_details")
    navigate('/')
  }
  const { user } = Chatstate();
  const  handleSearch = ()=>{
        if(!serch){

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
          const {data} = axios.get(`api/user?search=${serch}`);
          setloading(false)
          setserch(data)
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
            {/* <MenuList></MenuList> */}
          </Menu>
          <Menu>
            <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
              <Avatar size="sm" cursor="pointer" name={user.name}
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
            value={serch}
            onChange={(e)=>setserch(e.target.value)}
            />
          <Button onClick={handleSearch}> Go</Button>
          </Box>
          {loading ? 
            <Chatloading/>
          :<span>Result</span>}
        </DrawerBody>
       
        </DrawerContent>
        
      </Drawer>
    </>
  )
}

export default SideDrawer