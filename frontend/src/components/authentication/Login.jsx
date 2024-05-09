import { Button, FormControl, FormLabel, Input, InputGroup, InputRightElement, VStack } from '@chakra-ui/react'
import React, { useState } from 'react'

function Login() {
    const [emial , setemail] = useState("");
    const [password , setpassword] = useState("");
   
    const [ show, setshow] = useState(false)



function handelClick(){
    return setshow(!show)
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
      >
        Sign Up
      </Button>
  
</VStack>
  )
}

export default Login