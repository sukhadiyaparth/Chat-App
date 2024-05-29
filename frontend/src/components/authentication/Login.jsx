import { Button, FormControl, FormLabel, Input, InputGroup, InputRightElement, VStack } from '@chakra-ui/react'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

import { useToast } from '@chakra-ui/react';
import axios from 'axios';

function Login() {
    const [email , setemail] = useState("");
    const [password , setpassword] = useState("");
    const[loading , setloading] = useState(false)

    const [ show, setshow] = useState(false)
    let navigate = useNavigate();
    const toast = useToast();





function handelClick(){
    return setshow(!show)
}

const submitHandler =async ()=>{
    setloading(true);

    if(  !email|| !password){
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
  
    try {
        const     config = {
            headers: {
              "Content-type": "application/json",
            },
          };
        const {data}= await axios.post("/api/user/login",
        {
          email,
          password,
        },
        config);
        console.log(data);

        toast({
            title: ' Registration Successful',
            status: 'success',
            duration: 4000,
            isClosable: true,
            position: "top-right"
          });
          localStorage.setItem("user_details",JSON.stringify(data));
        setloading(false);
        // history.push('/chats');
        navigate('/chats');


    } catch (error) {
        toast({
            title: 'Invalid User',
            description : "Please Give Correct Email And Password",
            status: 'error',
            duration: 4000,
            isClosable: true,
            position: "top-right"
          });
          setloading(false)
    }
}


  return (
<VStack>
  
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

export default Login