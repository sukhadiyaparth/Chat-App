import { Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure } from '@chakra-ui/react'
import React from 'react'

function ProfileModal({children}) {
    const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <>{
        children && (
            <span onClick={onOpen}>{children}</span>

        )}
        
        <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Modal Title</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            gxg
          </ModalBody>

        
        </ModalContent>
      </Modal>
        </>
  )
}

export default ProfileModal