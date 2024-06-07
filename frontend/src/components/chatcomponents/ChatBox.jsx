import React from 'react'
import SingleChat from "./SingleChat";
import { Box } from "@chakra-ui/layout";
import { Chatstate } from '../../context/ChatProvider';

function ChatBox({fetchAgain, setFetchAgain}) {
  const { selectedchat  } = Chatstate();

  return (
<Box
      display={{ base: selectedchat ? "flex" : "none", md: "flex" }}
      alignItems="center"
      flexDir="column"
      p={3}
      bg="white"
      w={{ base: "100%", md: "68%" }}
      borderRadius="lg"     
      borderWidth="1px"
    >
      <SingleChat fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
    </Box>
  )
}

export default ChatBox