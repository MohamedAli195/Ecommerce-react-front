import React from "react";
import {
  Drawer as ChakraDrawer,
  DrawerOverlay,
  DrawerContent,
  DrawerFooter,
  DrawerBody,
  Button
} from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { onCloseDrawer, selectGlobal } from "../app/featuers/GlobalSlice";
import { useDispatch } from "react-redux";
import { clearCart, selectCart } from "../app/featuers/CartSlice";
import CartDrawerItem from "./CartDrawerItem";

function Drawer() {
    const btnRef = React.useRef()
    const {isOpenDrawer} = useSelector(selectGlobal)
    const {cart} = useSelector(selectCart)

    const dispatch = useDispatch()
    const onCloseHandler = ()=>{
        dispatch(onCloseDrawer())
    }
  return (
    <>
      <ChakraDrawer
        isOpen={isOpenDrawer}
        placement='right'
        onClose={onCloseHandler}
        // finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerBody>
            {
                cart.map((product)=>{
                  return(
                    <CartDrawerItem product={product} key={product.id} />
                  )
                })
            }
          </DrawerBody>

          <DrawerFooter>
            <Button variant='outline' mr={3} colorScheme="red" onClick={()=>{dispatch(clearCart())}}>
              Clear All
            </Button>
           
          </DrawerFooter>
        </DrawerContent>
      </ChakraDrawer>
    </>
  );
}

export default Drawer;
