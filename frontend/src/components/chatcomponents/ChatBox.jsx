import React from 'react'
import SingleChat from "./SingleChat";
import { Box } from "@chakra-ui/layout";
import { Chatstate } from '../../context/ChatProvider';

function ChatBox({fetchAgain, setfetchAgain}) {
  const { selectedchat  } = Chatstate();

  return (
<Box
      d={{ base: selectedchat ? "flex" : "none", md: "flex" }}
      alignItems="center"
      flexDir="column"
      p={3}
      bg="white"
      w={{ base: "100%", md: "68%" }}
      borderRadius="lg"
      borderWidth="1px"
    >
      <SingleChat fetchAgain={fetchAgain} setFetchAgain={setfetchAgain} />
    </Box>
  )
}

export default ChatBox