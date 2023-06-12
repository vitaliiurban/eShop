import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ProductModule, CategoriesModule } from "../models/products.model";

export const productsApi = createApi({
  reducerPath: "productsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://emerald-bat-shoe.cyclic.app",
  }),
  endpoints: (builder) => ({
    getCategories: builder.query<CategoriesModule[], void>({
      query: () => "/categories",
      transformResponse: (response: string[]) => {
        return response.concat("all categories");
      },
    }),
    getProducts: builder.query<ProductModule[], void>({
      query: () => `/products`,
    }),
    getProduct: builder.query<ProductModule, number>({
      query: (productId) => `/products/${productId}`,
    }),
  }),
});

export const {
  useGetCategoriesQuery,
  useGetProductsQuery,
  useGetProductQuery,
} = productsApi;
