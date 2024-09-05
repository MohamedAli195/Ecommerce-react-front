import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../../app/store';
import { IProduct } from '../../interfaces';
import { addItemToShoppingCart } from '../../utils';
import { createStandaloneToast } from '@chakra-ui/react';
const {toast} =createStandaloneToast()

export interface IProductCart {
  id:number,
  quantity?:number,
  attributes:{
  title:string,
  description:string,
  stock:number,
  price:number,
  category:string
  thumbnail:{
      data:{
          attributes:{
              
                  url:string
              
          }
      }
  }
  }
  
}
// Define a type for the slice state
export interface CartState {
  cart: IProductCart[];
}

// Define the initial state using that type
export const initialState: CartState = {
  cart: [],
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<IProduct>) => {
      // state.cart = [...state.cart, action.payload];
        state.cart = addItemToShoppingCart(state.cart,action.payload)
    },
    removeFromCart:(state,action:PayloadAction<number>)=>{
      state.cart = state.cart.filter((item)=>item.id!==action.payload)
      toast({
        title:"removed from cart", 
        status: 'error',
        duration: 9000,
        isClosable: true,
      })
    },
    clearCart:(state)=>{
      state.cart=[]
      toast({
        title:"cleard from cart", 
        status: 'error',
        duration: 9000,
        isClosable: true,
      })
    }
  },
});

export const { addToCart ,removeFromCart ,clearCart} = cartSlice.actions;

// Selectors
export const selectCart = (state: RootState) => state.cart;

export default cartSlice.reducer; // Ensure the default export is the reducer
