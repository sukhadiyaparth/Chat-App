import { Box, Button, Tooltip ,Text, MenuButton, Menu, MenuList, Avatar } from '@chakra-ui/react';
import React, { useState } from 'react'
import { BellIcon, ChevronDownIcon } from "@chakra-ui/icons";

function SideDrawer() {
  const [serch , setserch ] = useState("");
  const [serchResult  , setserchResult ] = useState([]);
  const [loading , setloading] = useState(false);
  const [Chatloading , setChatloading] = useState()
  return (
      <Box  
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      bg="white"
      w="100%"
      p="5px 10px 5px 10px"
      borderWidth="5px">

        <Tooltip label="Search User to chat " hasArrow placement='bottom-end'>
          <Button variant="ghost">
          <i className='fas fa-search'></i>
          <Text display={{base: "none" , md: "flex"}} px='4'>
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
              <BellIcon fontSize='2xl' m={1}/>
            </MenuButton>
            {/* <MenuList></MenuList> */}
          </Menu>
          <Menu>
            <MenuButton as={Button} rightIcon={<ChevronDownIcon/>}>
              <Avatar size="sm" cursor="pointer"/>
            </MenuButton>
            {/* <MenuList></MenuList> */}
          </Menu>
        </div>


      </Box>
  ) 
}

export default SideDrawer