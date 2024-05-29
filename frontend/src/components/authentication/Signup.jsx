import { Button, FormControl, FormLabel, Input, InputGroup, InputRightElement, VStack } from '@chakra-ui/react'
import React, { useState } from 'react'
// import {createBrowserHistory } from "react-router-dom";
import { useNavigate } from 'react-router-dom';

import { useToast } from '@chakra-ui/react';
import axios from 'axios';


function Signup() {
    // let history = createBrowserHistory();
    let navigate = useNavigate();


    const [name , setname] = useState("");
    const [email, setemail] = useState("");
    const [password , setpassword] = useState("");
    const [cpassword , setcpassword] = useState("");
    const [ img , setimg] = useState("");
    const [ show, setshow] = useState(false)
    const[loading , setloading] = useState(false)
    const toast = useToast();




function handelClick(){
    return setshow(!show)
}
const submitHandler =async ()=>{
    setloading(true);

    if( !name || !email|| !password){
        toast({
            title: 'Please Enter  All The Field',
            status: 'warning',
            duration: 6000,
            isClosable: true,
            position: "top-right"
          });
          setloading(false)

          return;
    }
    if(password !== cpassword){
        toast({
            title: 'Passwords Do Not Match ',
            status: 'warning',
            duration: 6000,
            isClosable: true,
            position: "top-right"
          });
          setloading(false)


          return;
    }
    try {
        const config = {
            headers: {
              "Content-type": "application/json",
            },
          };
        const {data}= await axios.post("/api/user",
        {
          name,
          email,
          password,
          img,
        },
        config);
        console.log(data);

        toast({
            title: ' Registration Successful',
            status: 'success',
            duration: 6000,
            isClosable: true,
            position: "top-right"
          });
          localStorage.setItem("user_details",JSON.stringify(data));
        setloading(false);
        // history.push('/chats');
        navigate('/chats');


    } catch (error) {
        toast({
            title: 'Error Occured',
            description : error?.response?.data?.message,
            status: 'error',
            duration: 6000,
            isClosable: true,
            position: "top-right"
          });
          setloading(false)
    }
}

const cloudinar = (userpic)=>{
setloading(true);

if (userpic === undefined){
    toast({
        title: 'Please Select Image',
        status: 'warning',
        duration: 6000,
        isClosable: true,
        position: "top-right"
      });

      return;
}

if(userpic.type === "image/png" || userpic.type === "image/jpeg"){

    //cloudinary Code

    const  data = new FormData();
    data.append("file",userpic);
    data.append("upload_preset","Chat_Application");
    data.append("cloud_name","dec7lhw67")
    fetch("https://api.cloudinary.com/v1_1/dec7lhw67/image/upload",{
        method: "Post",
        body : data
    }).then((res)=>{
       return res.json();
    }).then(data=>{
        setimg(data?.url?.toString());
        console.log(data?.url?.toString());

        setloading(false)
    }).catch((err)=>{
        setloading(false)
        console.log(err);
    })
}else{
    toast({
        title: 'Please Select Image',
        status: 'warning',
        duration: 6000,
        isClosable: true,
        position: "top-right"
      });

      return;
}
}

  return (
<VStack>
    <FormControl id="first-name" isRequired>
        <FormLabel>
            Name
        </FormLabel>
        <Input
        placeholder='Enter Your Name'
        onChange={(e)=>  setname(e.target.value)}        
        />

    </FormControl>
    <FormControl id="email" isRequired>
        <FormLabel>
            Email
        </FormLabel>
        <Input
        placeholder='Enter Your Email'
        onChange={(e)=>  setemail(e.target.value)}        
        />

    </FormControl>
    <FormControl id="password" isRequired>
        <FormLabel>
            Password
        </FormLabel>
        <InputGroup>
        <Input
        type={show ? "text" : "password"}
        placeholder='Enter Your Password'
        onChange={(e)=>  setpassword(e.target.value)}        
        />
        <InputRightElement width="4.5rem">
            <Button size="sm" h="1.75rem" onClick={handelClick}>
                {show ? "Hide" : "Show"}
            </Button>
        </InputRightElement>

        </InputGroup>

    </FormControl>
    <FormControl id="cpassword" isRequired>
        <FormLabel>
            CPassword
        </FormLabel>
        <InputGroup>
        <Input
        type={show ? "text" : "password"}
        placeholder='Enter Your CPassword'
        onChange={(e)=>  setcpassword(e.target.value)}        
        />
        <InputRightElement width="4.5rem">
            <Button size="sm" h="1.75rem" onClick={handelClick}>
                {show ? "Hide" : "Show"}
            </Button>
        </InputRightElement>

        </InputGroup>

    </FormControl>
    <FormControl id="pic" isRequired>
        <FormLabel>
            Upload Your Picture
        </FormLabel>
        <Input
        type='file'
        p={1.5}
        placeholder='Enter Your Photo'
        onChange={(e)=>  cloudinar(e.target.files[0])}        
        />

    </FormControl>
    <Button
        colorScheme="blue"
        width="100%"
        style={{ marginTop: 15 }}
        isLoading= {loading}
        onClick={submitHandler}
      >
        Sign Up
      </Button>
</VStack>
  )
}

export default Signup