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
        headers: {
          "Content-Type": "application/json",
        },
      }),
      providesTags: ["Orders"] as any,
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
      invalidatesTags: ["Orders"] as any,
    }),

    getSalesReport: build.query({
      query: ({}) => ({
        url: "/order/monthly-sales",
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      }),
      providesTags: ["Orders"] as any,
    }),
    getOrderStatus: build.query({
      query: ({}) => ({
        url: "/order/order-status",
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      }),
      providesTags: ["Orders"] as any,
    }),
    getAllOrders: build.query({
      query: ({ orderStatus, page, refresh_token }) => ({
        url: "/order/all-orders",
        params: {
          orderStatus,
          page,
        },
        method: "GET",
        credentials: "include",
        headers: {
          refresh_token,
          "Content-Type": "application/json",
        },
      }),
      invalidatesTags: ["Orders"] as any,
    }),

    getSingleOrders: build.query({
      query: (id) => ({
        url: `/order/single-order/${id}`,
        method: "GET",
        credentials: "include",
      }),
      providesTags: ["Orders"] as any,
    }),
    updateOrderStatus: build.mutation({
      query: ({ id, data }) => ({
        url: `/order/update-order-status/${id}`,
        method: "PUT",
        body: data,
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      }),
      providesTags: ["Orders"] as any,
    }),
    deleteOrder: build.mutation({
      query: ({ id }) => ({
        url: `/order/delete-order/${id}`,
        method: "DELETE",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      }),
      providesTags: ["Orders"] as any,
    }),
  }),
});

export const {
  useGetOrderQuery,
  useCreateOrderMutation,
  useGetSalesReportQuery,
  useGetOrderStatusQuery,
  useGetAllOrdersQuery,
  useGetSingleOrdersQuery,
  useUpdateOrderStatusMutation,
  useDeleteOrderMutation,
} = orderApi;
