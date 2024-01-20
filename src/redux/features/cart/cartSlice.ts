import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface CartType {
  cartItems: any[];
}

const initialState: CartType = {
  cartItems: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    allCartItems: (state, action: PayloadAction<{ cartItems: {} }>) => {
      state.cartItems.push(action.payload.cartItems);
    },
  },
});

export const { allCartItems } = cartSlice.actions;
export default cartSlice.reducer;
