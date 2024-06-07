import React from 'react'
import { Box, Text } from "@chakra-ui/layout";
import { Chatstate } from '../../context/ChatProvider';
import { IconButton } from '@chakra-ui/react';
import { ArrowBackIcon } from '@chakra-ui/icons';
import { getSender , getSenderFull } from '../../config/LogicsChat';
import ProfileModal from './ProfileModal';
import UpdateGroupchatModal from './UpdateGroupchatModal';

function SingleChat({fetchAgain,setFetchAgain}) {
  const { user , selectedchat,setselectedchat , chat,setchat } = Chatstate();
  console.log(selectedchat)
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
                    // fetchMessages={fetchMessages}
                    fetchAgain={fetchAgain}
                    setFetchAgain={setFetchAgain}
                  />
            
            </>)}


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