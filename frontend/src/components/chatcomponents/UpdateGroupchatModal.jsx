import React, { useState } from 'react'
import { ViewIcon } from "@chakra-ui/icons";
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
    useDisclosure,
    FormControl,
    Input,
    useToast,
    Box,
    IconButton,
    Spinner,
} from "@chakra-ui/react";
import { Chatstate } from '../../context/ChatProvider';
import Userdelete from '../UserAvtar/Userdelete';
import axios from 'axios';
import UserListItem from '../UserAvtar/UserListItem';
function UpdateGroupchatModal({ fetchAgain, setFetchAgain ,fetchMessages}) {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [groupChatname, setgroupChatname] = useState();
    const [search, setsearch] = useState();
    const [searchResult, setsearchResult] = useState([]);
    const [loading, setloading] = useState(false)
    const [renameLoading, setrenameLoading] = useState(false)

    const { selectedchat, setselectedchat, user } = Chatstate();
    const toast = useToast();


    const handleRemove = async(Removeuser) => {
      // if (selectedchat?.groupAdmin._id !== user._id && Removeuser._id !== user._id) {
      //   toast({
      //     title: "Only admins can remove someone!",
      //     status: "error",
      //     duration: 5000,
      //     isClosable: true,
      //     position: "bottom",
      //   });
      //   return;
      // }


      try {
        setloading(true);
        const config = {
          headers: {
            Authorization: `Bearer ${user?.JwtToken}`,
          },
        };
        const { data } = await axios.put(
          `/api/chat/groupremove`,
          {
            chatId: selectedchat?._id,
            userId: Removeuser?._id,
          },
          config
        );
  
        Removeuser?._id === user?._id ? setselectedchat() : setselectedchat(data);
        setFetchAgain(!fetchAgain);
        fetchMessages();
        setloading(false);
      } catch (error) {
        toast({
          title: "Error Occured!",
          description: error.response.data.message,
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "bottom",
        });
        setloading(false);
      }
      setgroupChatname("");






    }
    const handleAddUser = async(Adduser) => {
        if (selectedchat?.users.find((u) => u._id === Adduser._id)) {
            toast({
              title: "User Already in group!",
              status: "error",
              duration: 5000,
              isClosable: true,
              position: "top-right",
            });
            return;
          }
console.log(selectedchat);
          if (selectedchat.groupAdmin?._id !== user?._id) {
            toast({
              title: "Only admins can add someone!",
              status: "error",
              duration: 5000,
              isClosable: true,
              position: "top-right",
            });
            return;
          }

          try {
            setloading(true);
            const config = {
              headers: {
                Authorization: `Bearer ${user?.JwtToken}`,
              },
            };
            const { data } = await axios.put(
              `/api/chat/groupadd`,
              {
                chatId: selectedchat?._id,
                userId: Adduser?._id,
              },
              config
            );
      
            setselectedchat(data);
            setFetchAgain(!fetchAgain);
            setloading(false);
          } catch (error) {
            toast({
              title: "Error Occured!",
              description: error.response.data.message,
              status: "error",
              duration: 5000,
              isClosable: true,
              position: "top-right",
            });
            setloading(false);
          }
          setgroupChatname("");
      
    }

    const handleRename = async () => {
        if (!groupChatname) return;
        try {
            setrenameLoading(true);
            const config = {
                headers: {
                    Authorization: `Bearer ${user?.JwtToken}`,
                },
            };
            const {data} = await axios.put(
                `/api/chat/rename`,
                {
                    chatId: selectedchat?._id,
                    chatname: groupChatname,
                },
                config
            );
            console.log(data)
            setselectedchat(data);
            setFetchAgain(!fetchAgain);
            setrenameLoading(false);
        } 
        catch (error) {
            console.log(error)
            toast({
                title: "Error Occured!",
                description: error,
                status: "error",
                duration: 5000,
                isClosable: true,
                position: "top-right",
            });
            setrenameLoading(false);
        }
        setgroupChatname("");

    }
    const handleSearch =async (query) => {
        setsearch(query);
        if (!query) {
          return;
        }
    
        try {
            setloading(true);
          const config = {
            headers: {
              Authorization: `Bearer ${user?.JwtToken}`,
            },
          };
          const { data } = await axios.get(`/api/user?search=${search}`, config);
          console.log(data);
          setloading(false);
          setsearchResult(data);
        } catch (error) {
          toast({
            title: "Error Occured!",
            description: "Failed to Load the Search Results",
            status: "error",
            duration: 5000,
            isClosable: true,
            position: "bottom-left",
          });
          setloading(false);
        }
    }

    return (
        <div>
            <IconButton display={{ base: "flex" }} icon={<ViewIcon />} onClick={onOpen} />
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader
                        fontSize="35px"
                        fontFamily="Work sans"
                        d="flex"
                        justifyContent="center"


                    >{selectedchat?.ChatName}</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Box>
                            {selectedchat.users.map((u) => (
                                <Userdelete
                                    key={u?._id}
                                    user={u}
                                    handleFunction={() => handleRemove(u)}
                                />
                            ))}
                        </Box>

                        <FormControl display="flex">
                            <Input
                                placeholder="Chat Name"
                                mb={5}
                                value={groupChatname}
                                onChange={(e) => setgroupChatname(e.target.value)}
                            />
                            <Button
                                variant="solid"
                                colorScheme="teal"
                                ml={1}
                                isLoading={renameLoading}
                                onClick={handleRename}
                            >
                                Update
                            </Button>
                        </FormControl>

                        <FormControl>
                            <Input
                                placeholder="Add User to group"
                                mb={1}
                                onChange={(e) => handleSearch(e.target.value)}
                            />
                        </FormControl>

                        {loading ? (
              <Spinner size="lg" />
            ) : (
              searchResult?.map((user) => (
                <UserListItem
                  key={user?._id}
                  user={user}
                  handleFunction={() => handleAddUser(user)}
                />
              ))
            )}
                    </ModalBody>

                    <ModalFooter>
                        <Button onClick={() => handleRemove(user)} colorScheme="red">
                            Leave Group
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>

        </div>
    )
}

export default UpdateGroupchatModal