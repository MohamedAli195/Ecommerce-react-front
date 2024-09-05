import {
    AlertDialog,
    AlertDialogBody,
    AlertDialogCloseButton,
    AlertDialogContent,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogOverlay,
    Button,
    useDisclosure
  } from "@chakra-ui/react";
import { AxiosResponse } from "axios";
  import React from "react";
  
  interface IProps {
    isOpen:boolean,
    onOpen:()=>void,
    onClose:()=>void,
    title:string,
    description:string,
    cancelTxt:string,
    okTxt:string,
    variant:string
    onOkHandler:()=>void
    
  }
  function CustomDialog({isOpen,onClose,onOpen,cancelTxt,description,okTxt,title,variant,onOkHandler}:IProps) {
    const cancelRef = React.useRef<HTMLButtonElement | null>(null); // Explicitly type the ref
  
    return (
      <>
        <Button onClick={onOpen}>Discard</Button>
        <AlertDialog
          motionPreset="slideInBottom"
          leastDestructiveRef={cancelRef}
          onClose={onClose}
          isOpen={isOpen}
          isCentered
        >
          <AlertDialogOverlay />
  
          <AlertDialogContent>
            <AlertDialogHeader>{title}</AlertDialogHeader>
            <AlertDialogCloseButton />
            <AlertDialogBody>
              {description}
            </AlertDialogBody>
            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose} >
                {cancelTxt}
              </Button>
              <Button  variant={variant} colorScheme="red" ml={3} onClick={ ()=> {onOkHandler()
                onClose()}
               }>
                {okTxt}
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </>
    );
  }
  
  export default CustomDialog;
  