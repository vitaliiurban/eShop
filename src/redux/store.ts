import { configureStore } from "@reduxjs/toolkit";
import { productsApi } from "./productsApi";
import { cartSlice } from "./cartSlice";
import { CartState } from "../redux/cartSlice";
import { WishState, wishSlice } from "./wishSlice";
export interface RootState {
  cart: CartState;
  wish: WishState;
}

export const store = configureStore({
  reducer: {
    [productsApi.reducerPath]: productsApi.reducer,
    cart: cartSlice.reducer,
    wish: wishSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(productsApi.middleware),
});
