// src/apiSlice.js
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IProduct } from '../../interfaces';

interface ProductsResponse {
  data: IProduct[];
  // add other properties as needed
}

const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_SERVER_URL }),
    endpoints: (builder) => ({
      getItems: builder.query<ProductsResponse, void>({
        query: () => '/api/products?populate=products,thumbnail',
      }),
    }),
  });
  
  export const { useGetItemsQuery } = apiSlice;
  export type UseGetItemsQueryType = typeof apiSlice.endpoints.getItems.useQuery;
  export default apiSlice;