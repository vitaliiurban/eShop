import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ProductModule, CategoriesModule } from "../models/products.model";

export const productsApi = createApi({
  reducerPath: "productsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://ecommerce-hydl.onrender.com",
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
    updateProduct: builder.mutation<void, Partial<ProductModule>>({
      query: (partialProduct) => ({
        url: `/products/${partialProduct.id}`,
        method: "PATCH",
        body: partialProduct,
      }),
      async onQueryStarted({ id }, { dispatch, queryFulfilled }) {
        const { data } = await queryFulfilled;
        dispatch(
          productsApi.util.updateQueryData(
            "getProducts",
            undefined,
            (draft) => {
              const product = draft.find((p) => p.id === id);
              if (product) {
                Object.assign(product, data);
              }
            }
          )
        );
      },
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetCategoriesQuery,
  useUpdateProductMutation,
} = productsApi;
