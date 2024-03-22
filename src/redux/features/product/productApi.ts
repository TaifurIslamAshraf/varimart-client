import { apiSlice } from "../apiSlice/apiSlice";

const productApi = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    getStockStatus: build.query({
      query: ({ refresh_token }) => ({
        url: "/product/stock-status",
        method: "GET",
        credentials: "include",
        headers: {
          refresh_token,
          "Content-Type": "application/json",
        },
      }),

      providesTags: ["Products"] as never,
    }),

    createProduct: build.mutation({
      query: ({ data, refresh_token }) => ({
        url: "/product/create-product",
        method: "POST",
        body: data,
        credentials: "include",
        headers: {
          refresh_token,
          "Content-Type": "application/json",
        },
      }),
      invalidatesTags: ["Products"] as never,
    }),
    deleteProduct: build.mutation({
      query: ({ productId, refresh_token }) => ({
        url: `/product/delete-product/${productId}`,
        method: "DELETE",
        credentials: "include",
        headers: {
          refresh_token,
          "Content-Type": "application/json",
        },
      }),
    }),
    updateProduct: build.mutation({
      query: ({ data, refresh_token }) => ({
        url: `product/update-product`,
        method: "PUT",
        body: data,
        credentials: "include",
        headers: {
          refresh_token,
          "Content-Type": "application/json",
        },
      }),

      invalidatesTags: ["Products"] as never,
    }),
  }),
});

export const {
  useGetStockStatusQuery,
  useCreateProductMutation,
  useDeleteProductMutation,
  useUpdateProductMutation,
} = productApi;
