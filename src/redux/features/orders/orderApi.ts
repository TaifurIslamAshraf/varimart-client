import { apiSlice } from "../apiSlice/apiSlice";
import { getUserOrders } from "./orderSlice";

const orderApi = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    getOrder: build.query({
      query: ({ userId }) => ({
        url: "/order/user-orders",
        method: "GET",
        params: {
          userId,
        },
        credentials: "include",
      }),

      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const result = await queryFulfilled;
          dispatch(getUserOrders(result.data));
        } catch (error: any) {
          console.log(error.message);
        }
      },
    }),

    createOrder: build.mutation({
      query: (data) => ({
        url: "/order/create-order",
        method: "POST",
        body: data,
        credentials: "include",
      }),
    }),

    getSalesReport: build.query({
      query: () => ({
        url: "/order/monthly-sales",
        method: "GET",
        credentials: "include",
      }),
    }),
    getOrderStatus: build.query({
      query: () => ({
        url: "/order/order-status",
        method: "GET",
        credentials: "include",
      }),
    }),
    getAllOrders: build.query({
      query: ({ orderStatus, page }) => ({
        url: "/order/all-orders",
        params: {
          orderStatus,
          page,
        },
        method: "GET",
        credentials: "include",
      }),
    }),
  }),
});

export const {
  useGetOrderQuery,
  useCreateOrderMutation,
  useGetSalesReportQuery,
  useGetOrderStatusQuery,
  useGetAllOrdersQuery,
} = orderApi;
