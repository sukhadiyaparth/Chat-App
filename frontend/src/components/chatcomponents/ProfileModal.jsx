import { Button, IconButton, Image, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure } from '@chakra-ui/react'
import React from 'react'
import { ViewIcon } from "@chakra-ui/icons";

function ProfileModal({children,user}) {
    const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <>{
        children ? (
            <span onClick={onOpen}>{children}</span>

        ):(        <IconButton display={{ base: "flex" }} icon={<ViewIcon />} onClick={onOpen} />
      )}
        
        <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader 
          fontSize="40px"
          fontFamily ="Work sans"
          display="flex"
          justifyContent="center"
          >{user.name}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
           <Image
           borderRadius="full"
           boxSize="150px"
           src = {user?.pic}
           />
          </ModalBody>

        
        </ModalContent>
      </Modal>
        </>
  )
}

export default ProfileModal