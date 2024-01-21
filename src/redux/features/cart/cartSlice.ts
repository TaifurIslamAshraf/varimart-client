import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { getCookie, setCookie } from "cookies-next";
import toast from "react-hot-toast";

interface CartType {
  cartItems: any[];
  allCartProducts: {};
}

const storedCookie = getCookie("product_cart") as string;

const initialState: CartType = {
  cartItems: storedCookie ? JSON.parse(storedCookie) : [],
  allCartProducts: {},
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    storeCartItem: (state, action: PayloadAction<{ product: any }>) => {
      const { product } = action.payload;

      // Check if the product is already in the cart
      const existingProductIndex = state.cartItems.findIndex(
        (item) => item === product
      );

      if (existingProductIndex !== -1) {
        toast.error("Product alredy exitst in cart");
      } else {
        // If the product is not in the cart, add it
        state.cartItems.push(product);
        toast.success("Product Add To Cart");
      }

      setCookie("product_cart", JSON.stringify(state.cartItems));
    },

    deleteCartItem: (state, action: PayloadAction<{ productId: string }>) => {
      const cartCookie = getCookie("product_cart") as string;
      const parseCookie = JSON.parse(cartCookie);
      setCookie(
        "product_cart",
        parseCookie.filter((item: string) => item !== action.payload.productId)
      );

      state.cartItems = state.cartItems.filter(
        (item) => item !== action.payload.productId
      );
    },

    allCartItems: (state, action) => {
      state.allCartProducts = action.payload.cartAllProducts;
    },
  },
});

export const { storeCartItem, deleteCartItem, allCartItems } =
  cartSlice.actions;
export default cartSlice.reducer;
