import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface CartType {
  allCartProducts: {
    success: string;
    message: string;
    cartItem: any[];
    selectAll: boolean;
  };
  totalPrice: {};
}

const initialState: CartType = {
  allCartProducts:
    {
      success: "",
      message: "",
      cartItem: [],
      selectAll: true,
    } || "",
  totalPrice: {},
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    deleteCartItem: (state, action: PayloadAction<{ productId: string }>) => {
      state.allCartProducts.cartItem = state.allCartProducts?.cartItem?.filter(
        (item: any) => item.productId !== action.payload.productId
      );
    },
    clearCart: (state, action) => {
      state.allCartProducts = {
        message: "",
        cartItem: [],
        success: "",
        selectAll: true,
      };
    },

    allCartItems: (state, action) => {
      state.allCartProducts = action.payload;
    },
    totalPrice: (state, action) => {
      state.totalPrice = action.payload;
    },
  },
});

export const { deleteCartItem, allCartItems, totalPrice, clearCart } =
  cartSlice.actions;
export default cartSlice.reducer;
