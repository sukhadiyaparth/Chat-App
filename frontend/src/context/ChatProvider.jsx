import React, { createContext, useContext, useEffect, useState } from 'react'


const ChatContex = createContext(null);

function ChatProvider(props) {
    const [user,setuser] = useState() 

    useEffect(()=>{
        const userInfo = JSON.parse(localStorage.getItem("userInfo"));
        setuser(userInfo);
     
    },[])
  return (
<ChatContex.Provider value={{user,setuser}}>
    {props?.childer}
</ChatContex.Provider>  )
};

export const ChatState = ()=>{
    return useContext(ChatContex);
}

export default ChatProvider;