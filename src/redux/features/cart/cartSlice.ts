import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface CartType {
  allCartProducts: {
    success: string;
    message: string;
    cartItem: any[];
    selectAll: boolean;
  };
  totalPrice: {};
  buyNowItem: {};
  totalAmount: string;
}

const initialState: CartType = {
  allCartProducts: {
    success: "",
    message: "",
    cartItem: [],
    selectAll: true,
  },
  totalAmount: "",
  totalPrice: {},
  buyNowItem: {},
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

    byNowItem: (state, action) => {
      state.buyNowItem = action.payload;
    },
    clearBuyNow: (state, action) => {
      state.buyNowItem = {};
    },
    cartTotalAmount: (state, action) => {
      state.totalAmount = "";
    },
  },
});

export const {
  deleteCartItem,
  allCartItems,
  byNowItem,
  totalPrice,
  clearCart,
  clearBuyNow,
  cartTotalAmount,
} = cartSlice.actions;
export default cartSlice.reducer;
