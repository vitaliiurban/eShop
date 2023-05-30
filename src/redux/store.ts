import { configureStore } from "@reduxjs/toolkit";
import { productsApi } from "./productsApi";
import { cartSlice } from "./cartSlice";
import { CartState } from "../redux/cartSlice";
export interface RootState {
  cart: CartState;
}

export const store = configureStore({
  reducer: {
    [productsApi.reducerPath]: productsApi.reducer,
    cart: cartSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(productsApi.middleware),
});
