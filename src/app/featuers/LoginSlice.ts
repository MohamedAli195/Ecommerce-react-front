import { createAsyncThunk, createSlice, isRejectedWithValue, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { axionsInstance } from "../../api/axios.config";
import { createStandaloneToast } from "@chakra-ui/react";
import { IUserDataApi } from "../../interfaces";
import CookieService from "../../classes/CookieService";

// Define the user type based on your API structure
const {toast} =createStandaloneToast()
export interface User {
    identifier:string
  password: string;
}

// Define the state type
export interface IState {
  loading: boolean;
  data: any; // Adjust type as per your data structure
  error: any | null; // Adjust type as per your error structure
}

const initialState: IState = {
  loading: false,
  data: null,
  error: null,
};

// Define the return type and parameter type for the async thunk
export const userLogin = createAsyncThunk<any, User, { rejectValue: string }>(
  "login/userLogin",
  async (user, thunkAPI) => {
    try {
      const { data } = await axionsInstance.post("/api/auth/local", user);
      return data;
    } catch (error) {
        // console.log(error?.response?.data?.error?.message)
    //   let errorMessage = {}
    //   if (axios.isAxiosError(error)) {
    //     errorMessage = error;
    //   }
    //   return thunkAPI.rejectWithValue(errorMessage);
    // return thunkAPI.rejectWithValue(error);
    // console.log(error)
    let errorMessage = 'An unknown error occurred';
  if (axios.isAxiosError(error) && error.response) {
    errorMessage = error.response.data?.error?.message || 'An error occurred';
  }
  return thunkAPI.rejectWithValue(errorMessage);
   }
  }
);

export const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(userLogin.pending, (state) => {
        state.loading = true;
      })
      .addCase(userLogin.fulfilled, (state, action: PayloadAction<{jwt:string,user:IUserDataApi}>) => {
        state.loading = false;
        state.data = action.payload;
        state.error = null;
        CookieService.set("jwt",action.payload.jwt,null)
        toast({
            title: "loged in successful", 
            
            status: 'success',
            duration: 9000,
            isClosable: true,
          })
      })
      .addCase(userLogin.rejected, (state, action: PayloadAction<string | undefined>) => {
        state.loading = false;
        state.data = null;
        state.error = action.payload || "An error occurred";
        console.log(action.payload)
        toast({
            title: action.payload, 
            
            status: 'error',
            duration: 9000,
            isClosable: true,
          })
      });
  },
});
export const selectLogin = (state: { login: IState }) => state.login;
export default loginSlice.reducer;
