import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ProductModule } from "../models/products.model";

export interface CartState extends Array<ProductModule> {}

const initialState: CartState = JSON.parse(
  localStorage.getItem("cart") || "[]"
);

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<ProductModule>) => {
      return [...state, action.payload];
    },
    deleteFromCart: (state, action: PayloadAction<ProductModule>) => {
      return state.filter((product) => product.id !== action.payload.id);
    },
    clearCart: () => {
      return [];
    },
  },
});

export const { addToCart, deleteFromCart, clearCart } = cartSlice.actions;
