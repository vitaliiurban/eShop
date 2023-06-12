import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ProductModule } from "../models/products.model";

export interface WishState extends Array<ProductModule> {}

const initialState: WishState = JSON.parse(
  localStorage.getItem("wish") || "[]"
);

export const wishSlice = createSlice({
  name: "wish",
  initialState,
  reducers: {
    addToWish: (state, action: PayloadAction<ProductModule>) => {
      return [...state, action.payload];
    },
    deleteFromWish: (state, action: PayloadAction<ProductModule>) => {
      return state.filter((product) => product.id !== action.payload.id);
    },
    clearWish: () => {
      return [];
    },
  },
});

export const { addToWish, deleteFromWish, clearWish } = wishSlice.actions;
