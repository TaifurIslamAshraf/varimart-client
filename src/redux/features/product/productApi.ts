import { apiSlice } from "../apiSlice/apiSlice";

const productApi = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    getStockStatus: build.query({
<<<<<<< HEAD
      query: ({ accessToken }) => ({
        url: "/product/stock-status",
        method: "GET",
        credentials: "include",
        headers: {
          authorization: `Bearer ${accessToken}`,
        },
=======
      query: ({}) => ({
        url: "/product/stock-status",
        method: "GET",
        credentials: "include",
>>>>>>> origin/production-version
      }),

      providesTags: ["Products"] as never,
    }),

    createProduct: build.mutation({
<<<<<<< HEAD
      query: ({ data, accessToken }) => ({
=======
      query: ({ data }) => ({
>>>>>>> origin/production-version
        url: "/product/create-product",
        method: "POST",
        body: data,
        credentials: "include",
<<<<<<< HEAD
        headers: {
          authorization: `Bearer ${accessToken}`,
        },
=======
>>>>>>> origin/production-version
      }),
      invalidatesTags: ["Products"] as never,
    }),
    deleteProduct: build.mutation({
<<<<<<< HEAD
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
=======
      query: ({ productId }) => ({
        url: `/product/delete-product/${productId}`,
        method: "DELETE",
        credentials: "include",
      }),
    }),
    updateProduct: build.mutation({
      query: ({ data }) => ({
>>>>>>> origin/production-version
        url: `product/update-product`,
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
