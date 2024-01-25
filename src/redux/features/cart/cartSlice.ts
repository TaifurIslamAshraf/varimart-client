import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface CartType {
  allCartProducts: {};
  totalPrice: {};
}

const initialState: CartType = {
  allCartProducts: {},
  totalPrice: {},
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    deleteCartItem: (state, action: PayloadAction<{ productId: string }>) => {},

    allCartItems: (state, action) => {
      state.allCartProducts = action.payload;
    },
    totalPrice: (state, action) => {
      state.totalPrice = action.payload;
    },
  },
});

export const { deleteCartItem, allCartItems, totalPrice } = cartSlice.actions;
export default cartSlice.reducer;
