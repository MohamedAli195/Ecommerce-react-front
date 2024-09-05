import { createSlice } from '@reduxjs/toolkit';
import type { RootState } from '../store';


// Define a type for the slice state
export interface GlobalState {
  isOpenDrawer: boolean;
}

// Define the initial state using that type
export const initialState: GlobalState = {
    isOpenDrawer: false,
};

export const globalSlice = createSlice({
  name: 'global',
  initialState,
  reducers: {
    onOpenDrawer:(state)=>{
        state.isOpenDrawer=true
    },
    onCloseDrawer:(state)=>{
        state.isOpenDrawer=false
    }
  },
});

export const {onOpenDrawer, onCloseDrawer } = globalSlice.actions;

// Selectors
export const selectGlobal = (state: RootState) => state.global;

export default globalSlice.reducer; // Ensure the default export is the reducer
