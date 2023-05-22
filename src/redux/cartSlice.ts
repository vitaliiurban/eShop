import { createSlice } from "@reduxjs/toolkit";
import { ProductModule } from "../models/products.model";
const initialState: ProductModule[] = [];
export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action) {
      state.push(action.payload);
    },
    deleteFromCart(state, action) {},
  },
});
export const { addToCart } = cartSlice.actions;
