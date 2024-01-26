import { apiSlice } from "../apiSlice/apiSlice";
import { allCartItems, totalPrice } from "./cartSlice";

const cartApi = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    syncCart: build.mutation({
      query: ({
        isSelect,
        productId,
        isSelectAll,
        cartQuantity,
        deleteCartItem,
      }) => ({
        url: `/cart/cart-sync`,
        method: "POST",
        params: {
          isSelect,
          productId,
          isSelectAll,
          cartQuantity,
          deleteCartItem,
        },
        credentials: "include",
      }),
    }),

    addToCart: build.mutation({
      query: ({ productId }) => ({
        url: "/cart/add-to-cart",
        method: "POST",
        body: { productId },
        credentials: "include",
      }),
    }),

    getCartItem: build.query({
      query: () => ({
        url: "/cart/get-cart",
        method: "GET",
        credentials: "include",
      }),

      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;

          dispatch(allCartItems(result.data));
        } catch (error: any) {
          console.log(error.message);
        }
      },
    }),

    totalPrice: build.query({
      query: () => ({
        url: "/cart/updated-price",
        method: "GET",
        credentials: "include",
      }),

      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;

          dispatch(totalPrice(result.data));
        } catch (error: any) {
          console.log(error.message);
        }
      },
    }),
  }),
});

export const {
  useTotalPriceQuery,
  useSyncCartMutation,
  useGetCartItemQuery,
  useAddToCartMutation,
} = cartApi;
