import GlobalSlice, { globalSlice } from './featuers/GlobalSlice';
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web 


import { configureStore } from '@reduxjs/toolkit';
import loginSlice from './featuers/LoginSlice';
import cartSlice from './featuers/CartSlice'; // Ensure the correct import
import productsSlice from './featuers/product/productsSlice';

const persistConfig = {
  key: 'cart',
  storage,
}
const persisedCart= persistReducer(persistConfig,cartSlice)

export const store = configureStore({
  reducer: {
    login: loginSlice,
    cart: persisedCart,
    global:GlobalSlice,
    products:productsSlice
  },
});
export const persistorStore =persistStore(store)

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {login: LoginState, cart: CartState}
export type AppDispatch = typeof store.dispatch;

