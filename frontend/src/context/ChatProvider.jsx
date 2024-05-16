import React, { createContext, useContext, useEffect, useState } from 'react'


const ChatContex = createContext(null);



export const useChat = ()=>
    useContext(ChatContex);

function ChatProvider({ children }) {
    const [user,setuser] = useState() 

    
  return (
<ChatContex.Provider value={{user,setuser}}>
    {children}
</ChatContex.Provider>  )
};



export default ChatProvider;