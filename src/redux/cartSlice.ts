import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ProductModule } from "../models/products.model";

export interface CartItem {
  product: ProductModule;
  quantity: number;
}

export type CartState = CartItem[];

const initialState: CartState = JSON.parse(
  localStorage.getItem("cart") || "[]"
);

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartItem>) => {
      const { product, quantity } = action.payload;
      const existingItemIndex = state.findIndex(
        (item) => item.product.id === product.id
      );
      if (existingItemIndex !== -1) {
        state[existingItemIndex].quantity += quantity;
      } else {
        state.push({ product, quantity });
      }
    },
    deleteFromCart: (state, action: PayloadAction<CartItem>) => {
      return state.filter(
        (item) => item.product.id !== action.payload.product.id
      );
    },
    updateQuantity: (
      state,
      action: PayloadAction<{ productId: number; quantity: number }>
    ) => {
      const { productId, quantity } = action.payload;
      const itemIndex = state.findIndex(
        (item) => item.product.id === productId
      );
      if (itemIndex !== 1) {
        state[itemIndex].quantity = quantity;
      }
    },
    clearCart: () => {
      return [];
    },
  },
});

export const { addToCart, deleteFromCart, updateQuantity, clearCart } =
  cartSlice.actions;
