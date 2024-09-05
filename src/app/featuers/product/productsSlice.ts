import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IProduct } from '../../../interfaces';
import { axionsInstance } from '../../../api/axios.config';

// Define a type for the slice state
export interface ProductsState {
  loading: boolean;
  products: IProduct[];
  error: string | null;
}

// Define the initial state using that type
export const initialState: ProductsState = {
  loading: true,
  products: [],
  error: null,
};

// Create async thunk for fetching product list
export const getProductList = createAsyncThunk<IProduct[], void, { rejectValue: string }>(
  'products/getProductList',
  async (_, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    console.log("first")
    try {
      const { data } = await axionsInstance.get('/api/products?populate=products,thumbnail');
      console.log(data);
      return data;
    } catch (err) {
      const errorMessage = (err as Error).message || 'Unknown error';
      return rejectWithValue(errorMessage);
    }
  }
);

// Create products slice
export const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getProductList.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getProductList.fulfilled, (state, action: PayloadAction<IProduct[]>) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(getProductList.rejected, (state, action: PayloadAction<string | undefined>) => {
        state.loading = false;
        state.error = action.payload || 'Unknown error';
      });
  },
});

// Selectors
export default productsSlice.reducer; // Ensure the default export is the reducer
