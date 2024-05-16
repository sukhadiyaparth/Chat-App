import React, { createContext, useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';


const ChatContex = createContext(null);





function ChatProvider({ children }) {
    const [user,setuser] = useState() ;
    // let navigate = useNavigate();

    // useEffect(() => {
    //     const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    //     setuser(userInfo);
    
    //     if (!userInfo){ navigate("/");}
    //   }, [navigate]);
    
    
  return (
<ChatContex.Provider value={{user,setuser}}>
    {children}
</ChatContex.Provider>  )
};

export const Chatstate = ()=>
    useContext(ChatContex);

export default ChatProvider;