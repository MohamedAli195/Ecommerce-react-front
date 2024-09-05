import { createStandaloneToast } from "@chakra-ui/react";
import { IProduct } from "../interfaces";
import { IProductCart } from "../app/featuers/CartSlice";
const {toast} =createStandaloneToast()

export const addItemToShoppingCart = (cart:IProductCart[],item:IProduct)=>{

    const exist = cart.find(Cartitem => Cartitem.id ===item.id)

    if(exist){
        toast({
            title: "added item tocart", 
            
            status: 'success',
            duration: 9000,
            isClosable: true,
          })
          
          return cart.map(CartItem => 
            CartItem.id === item.id 
              ? { ...CartItem, quantity: (CartItem.quantity ?? 0) + 1 } 
              : CartItem
          );
        }
    return [...cart,{...item,quantity:1}]
}