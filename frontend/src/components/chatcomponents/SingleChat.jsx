import React from 'react'
import { Box, Text } from "@chakra-ui/layout";
import { Chatstate } from '../../context/ChatProvider';
import { IconButton } from '@chakra-ui/react';
import { ArrowBackIcon } from '@chakra-ui/icons';

function SingleChat({fetchAgain,setfetchAgain}) {
  const { user , selectedchat,setselectedchat , chat,setchat } = Chatstate();
  const setSelectedChat =()=>{}

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
            d="flex"
            justifyContent={{ base: "space-between" }}
            alignItems="center"
          >
            <IconButton
              display={{ base: "flex", md: "none" }}
              icon={<ArrowBackIcon />}
              onClick={() => setSelectedChat("")}
            />


          </Text>
       
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