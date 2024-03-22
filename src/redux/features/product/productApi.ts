import { apiSlice } from "../apiSlice/apiSlice";

const productApi = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    getStockStatus: build.query({
      query: ({}) => ({
        url: "/product/stock-status",
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      }),

      providesTags: ["Products"] as never,
    }),

    createProduct: build.mutation({
      query: ({ data }) => ({
        url: "/product/create-product",
        method: "POST",
        body: data,
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      }),
      invalidatesTags: ["Products"] as never,
    }),
    deleteProduct: build.mutation({
      query: ({ productId }) => ({
        url: `/product/delete-product/${productId}`,
        method: "DELETE",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      }),
    }),
    updateProduct: build.mutation({
      query: ({ data }) => ({
        url: `product/update-product`,
        method: "PUT",
        body: data,
        credentials: "include",
        headers: {
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
