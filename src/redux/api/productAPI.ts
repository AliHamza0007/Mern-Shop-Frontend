import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {
  AllProductsResponse,
  CategoriesResponse,
  DeleteProductRequest,
  MessageResponse,
  NewProductRequest,
  ProductResponse,
  SearchProductsRequest,
  SearchProductsResponse,
  UpdateProductRequest,
} from 'src/types/api-types';

// Import the server URL and version from environment variables
const server = import.meta.env.VITE_SERVER_URL;
const server_v1 = import.meta.env.VITE_SERVER_VERSION;

// Create the product API using createApi
export const productAPI = createApi({
  reducerPath: 'productApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${server + server_v1}/product/`,
  }),
  tagTypes: ['product'], // Define the tag type
  endpoints: (builder) => ({
    // Define various endpoints
    latestProducts: builder.query<AllProductsResponse, string>({
      query: () => 'latest',
      providesTags: ['product'], // This query provides the 'product' tag
    }),
    allProducts: builder.query<AllProductsResponse, string>({
      query: (id) => `admin?id=${id}`,
      providesTags: ['product'],
    }),
    categories: builder.query<CategoriesResponse, string>({
      query: () => `categories`,
      providesTags: ['product'],
    }),

    searchProducts: builder.query<
      SearchProductsResponse,
      SearchProductsRequest
    >({
      query: ({ price, search, sort, category, page }) => {
        let base = `?search=${search}&page=${page}`;

        if (price) base += `&price=${price}`;
        if (sort) base += `&sort=${sort}`;
        if (category) base += `&category=${category}`;

        return base;
      },
      providesTags: ['product'],
    }),

    productDetails: builder.query<ProductResponse, string>({
      query: (id) => id,
      providesTags: ['product'],
    }),

    newProduct: builder.mutation<MessageResponse, NewProductRequest>({
      query: ({ formData, id }) => ({
        url: `?id=${id}`,
        method: 'POST',
        body: formData,
      }),
      invalidatesTags: ['product'], // Invalidate 'product' tag after mutation
    }),

    updateProduct: builder.mutation<MessageResponse, UpdateProductRequest>({
      query: ({ formData, userId, productId }) => ({
        url: `${productId}?id=${userId}`,
        method: 'PUT',
        body: formData,
      }),
      invalidatesTags: ['product'],
    }),

    deleteProduct: builder.mutation<MessageResponse, DeleteProductRequest>({
      query: ({ userId, productId }) => ({
        url: `${productId}?id=${userId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['product'],
    }),
  }),
});

// Destructure the generated hooks for easier usage
export const {
  useLatestProductsQuery,
  useAllProductsQuery,
  useCategoriesQuery,
  useSearchProductsQuery,
  useNewProductMutation,
  useProductDetailsQuery,
  useUpdateProductMutation,
  useDeleteProductMutation,
} = productAPI;
