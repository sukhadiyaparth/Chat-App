import React, { createContext, useContext, useEffect, useState } from 'react'
import { redirect, useNavigate } from 'react-router-dom';


const ChatContex = createContext(null);




function ChatProvider(props) {
    const [user,setuser] = useState() ;
    const [selectedchat,setselectedchat] = useState() ;
    const [chat,setchat] = useState([]) ;


    useEffect(() => {
        const userInfo = JSON.parse(localStorage.getItem("user_details"));
        // console.log(userInfo)
        if(userInfo){
        setuser(userInfo);}
    
   
      }, []);
    
    
  return (
<ChatContex.Provider value={{user,setuser , selectedchat,setselectedchat , chat,setchat}}>
    {props.children}
</ChatContex.Provider>  )
};

export const Chatstate = ()=>
    useContext(ChatContex);

export default ChatProvider;