import { Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay } from '@chakra-ui/react'
import  { ReactNode } from 'react'
interface IProps {
    isOpen:boolean
    onClose:()=>void
    title:string
    children:ReactNode
    closeTxt?:string
    okTxt?:string
    onSubmitHandler:()=>void
}
function CustomModal({children,closeTxt="close",isOpen,okTxt="Save",onClose,title,onSubmitHandler}:IProps) {
  return (
    <Modal blockScrollOnMount={false} isOpen={isOpen} onClose={onClose}>
    <ModalOverlay />
    <ModalContent>
      <ModalHeader>{title}</ModalHeader>
      <ModalCloseButton />
      <ModalBody>
        
{children}
        
      </ModalBody>

      <ModalFooter>
        <Button colorScheme='blue' mr={3} onClick={onClose}>
          {closeTxt}
        </Button>
        <Button variant='ghost' onClick={onSubmitHandler} >{okTxt}</Button>
      </ModalFooter>
    </ModalContent>
  </Modal>

  )
}

export default CustomModal