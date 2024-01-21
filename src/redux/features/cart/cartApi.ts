import { apiSlice } from "../apiSlice/apiSlice";

const cartApi = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    getCartItems: build.query({
      query: (data) => ({
        url: "/product/cart-products",
        method: "GET",
        credentials: "include",
      }),
    }),
  }),
});

export const { useGetCartItemsQuery } = cartApi;
