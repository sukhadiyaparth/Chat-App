import { Button, Image, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure } from '@chakra-ui/react'
import React from 'react'

function ProfileModal({children,user}) {
    const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <>{
        children && (
            <span onClick={onOpen}>{children}</span>

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