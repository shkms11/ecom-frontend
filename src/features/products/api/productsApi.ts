import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { Product } from "../types/product.types";

export const productsApi = createApi({
  reducerPath: "productsApi",

  baseQuery: fetchBaseQuery({
    baseUrl: "/api",
    credentials: "include",
  }),

  tagTypes: ["Products"],

  endpoints: (builder) => ({
    // GET all products
    getProducts: builder.query<Product[], void>({
      query: () => "/products",
      providesTags: ["Products"],
    }),

    // GET product by ID
    getProductById: builder.query<Product, string>({
      query: (id) => `/products/${id}`,
      providesTags: (_result, _error, id) => [{ type: "Products", id }],
    }),

    // SEARCH products
    searchProducts: builder.query<Product[], string>({
      query: (query) => `/products/search?q=${query}`,
      providesTags: ["Products"],
    }),

    // CREATE product
    createProduct: builder.mutation<Product, Partial<Product>>({
      query: (body) => ({
        url: "/products",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Products"],
    }),

    // UPDATE product
    updateProduct: builder.mutation<
      Product,
      { id: string; data: Partial<Product> }
    >({
      query: ({ id, data }) => ({
        url: `/products/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: (_result, _error, { id }) => [
        "Products",
        { type: "Products", id },
      ],
    }),

    // DELETE product
    deleteProduct: builder.mutation<void, string>({
      query: (id) => ({
        url: `/products/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Products"],
    }),
  }),
});

// auto-generated hooks
export const {
  useGetProductsQuery,
  useGetProductByIdQuery,
  useSearchProductsQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
} = productsApi;
