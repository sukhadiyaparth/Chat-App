import React, { useEffect } from 'react'
import Login from '../components/authentication/Login'
import Signup from '../components/authentication/Signup'
import { Box, Container, Text ,Tabs , TabList , Tab , TabPanels , TabPanel} from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'
function Home() {

    const navigate = useNavigate();

    useEffect(()=>{

        const userInfo = JSON.parse(localStorage.getItem("userInfo"));
        if(userInfo){
            navigate("/chats")
        }
    },[navigate])
    return (
        <div style={{ backgroundColor: 'black', minHeight: '100vh', padding: '20px',     backgroundImage: 'url("/bg.jpg")',
    }}>
            <Container maxW='xl' centerContent>

                <Box
                    d="flex"
                    justifyContent="center"
                    p="3"
                    bg="white"
                    w="100%"
                    m="40px 0 15px 0"
                    borderWidth="1px"
                    borderRadius="lg"
                >
                    <Text fontSize="4xl" fontFamily="Work sans" color="black">Chat App</Text>

                </Box>

                <Box 
                    bg='white'
                    w="100%"
                    p={4}
                    borderWidth="1px"
                    borderRadius="lg"
                    color="black"

                >


                    <Tabs variant='soft-rounded' colorScheme='green'>
                        <TabList>
                            <Tab width="50%">Log In</Tab>
                            <Tab width="50%">Sign Up</Tab>
                        </TabList>
                        <TabPanels>
                            <TabPanel>
                                {/* Log In */}
                                <Login/>
                            </TabPanel>
                            <TabPanel>
                                {/* Sign Up */}
                                <Signup/>
                            </TabPanel>
                        </TabPanels>
                    </Tabs>


                </Box>

            </Container>
        </div>
    )
}

export default Home