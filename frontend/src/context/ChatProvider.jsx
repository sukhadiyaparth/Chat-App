import React, { createContext, useContext, useEffect, useState } from 'react'
import { redirect, useNavigate } from 'react-router-dom';


const ChatContex = createContext(null);




function ChatProvider(props) {
    const [user,setuser] = useState() ;


    useEffect(() => {
        const userInfo = JSON.parse(localStorage.getItem("user_details"));
        setuser(userInfo);
    
      

      }, []);
    
    
  return (
<ChatContex.Provider value={{user,setuser}}>
    {props.children}
</ChatContex.Provider>  )
};

export const Chatstate = ()=>
    useContext(ChatContex);

export default ChatProvider;