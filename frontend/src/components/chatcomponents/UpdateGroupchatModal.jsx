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
function UpdateGroupchatModal({ fetchAgain, setFetchAgain }) {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [groupChatname, setgroupChatname] = useState();
    const [search, setsearch] = useState();
    const [searchResult, setsearchResult] = useState([]);
    const [loading, setloading] = useState(false)
    const [renameLoading, setrenameLoading] = useState(false)

    const { selectedchat, setselectedchat, user } = Chatstate();
    const toast = useToast();


    const handleRemove = (user) => {

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
    const handleSearch = (() => {

    })

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