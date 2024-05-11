import { apiSlice } from "../apiSlice/apiSlice";

const productApi = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    getStockStatus: build.query({
      query: ({ accessToken }) => ({
        url: "/product/stock-status",
        method: "GET",
        credentials: "include",
        headers: {
          authorization: `Bearer ${accessToken}`,
        },
      }),

      providesTags: ["Products"] as never,
    }),

    createProduct: build.mutation({
      query: ({ data, accessToken }) => ({
        url: "/product/create-product",
        method: "POST",
        body: data,
        credentials: "include",
        headers: {
          authorization: `Bearer ${accessToken}`,
        },
      }),
      invalidatesTags: ["Products"] as never,
    }),
    deleteProduct: build.mutation({
      query: ({ productId, accessToken }) => ({
        url: `/product/delete-product/${productId}`,
        method: "DELETE",
        credentials: "include",
        headers: {
          authorization: `Bearer ${accessToken}`,
        },
      }),
    }),
    updateProduct: build.mutation({
      query: ({ data, accessToken }) => ({
        url: `product/update-product`,
        method: "PUT",
        body: data,
        credentials: "include",
        headers: {
          authorization: `Bearer ${accessToken}`,
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
