import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ProductModule, CategoriesModule } from "../models/products.model";

export const productsApi = createApi({
  reducerPath: "productsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3001",
  }),
  endpoints: (builder) => ({
    getProducts: builder.query<ProductModule[], void>({
      query: () => `/products`,
    }),
    getCategories: builder.query<CategoriesModule[], void>({
      query: () => "/categories",
      transformResponse: (response: string[]) => {
        return response.concat("all categories");
      },
    }),
  }),
});

export const { useGetProductsQuery, useGetCategoriesQuery } = productsApi;
