import { apiSlice } from "../apiSlice/apiSlice";
import { getUserOrders } from "./orderSlice";

const orderApi = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    getOrder: build.query({
<<<<<<< HEAD
      query: ({ userId, accessToken }) => ({
=======
      query: ({ userId }) => ({
>>>>>>> origin/production-version
        url: "/order/user-orders",
        method: "GET",
        params: {
          userId,
        },
        credentials: "include",
<<<<<<< HEAD
        headers: {
          authorization: `Bearer ${accessToken}`,
        },
=======
>>>>>>> origin/production-version
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
<<<<<<< HEAD
      query: ({ accessToken }) => ({
        url: "/order/monthly-sales",
        method: "GET",
        credentials: "include",
        headers: {
          authorization: `Bearer ${accessToken}`,
        },
=======
      query: ({}) => ({
        url: "/order/monthly-sales",
        method: "GET",
        credentials: "include",
>>>>>>> origin/production-version
      }),
      providesTags: ["Orders"] as any,
    }),
    getOrderStatus: build.query({
<<<<<<< HEAD
      query: ({ accessToken }) => ({
        url: "/order/order-status",
        method: "GET",
        credentials: "include",
        headers: {
          authorization: `Bearer ${accessToken}`,
        },
=======
      query: ({}) => ({
        url: "/order/order-status",
        method: "GET",
        credentials: "include",
>>>>>>> origin/production-version
      }),
      providesTags: ["Orders"] as any,
    }),
    getAllOrders: build.query({
      query: ({ orderStatus, page, accessToken }) => ({
        url: "/order/all-orders",
        params: {
          orderStatus,
          page,
        },
        method: "GET",
        credentials: "include",
<<<<<<< HEAD
        headers: {
          authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
=======
>>>>>>> origin/production-version
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
<<<<<<< HEAD
      query: ({ id, data, accessToken }) => ({
=======
      query: ({ id, data }) => ({
>>>>>>> origin/production-version
        url: `/order/update-order-status/${id}`,
        method: "PUT",
        body: data,
        credentials: "include",
<<<<<<< HEAD
        headers: {
          authorization: `Bearer ${accessToken}`,
        },
=======
>>>>>>> origin/production-version
      }),
      providesTags: ["Orders"] as any,
    }),
    deleteOrder: build.mutation({
<<<<<<< HEAD
      query: ({ id, accessToken }) => ({
        url: `/order/delete-order/${id}`,
        method: "DELETE",
        credentials: "include",
        headers: {
          authorization: `Bearer ${accessToken}`,
        },
=======
      query: ({ id }) => ({
        url: `/order/delete-order/${id}`,
        method: "DELETE",
        credentials: "include",
>>>>>>> origin/production-version
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
