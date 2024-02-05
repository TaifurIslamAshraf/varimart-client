import { apiSlice } from "../apiSlice/apiSlice";

const productApi = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    getStockStatus: build.query({
      query: () => ({
        url: "/product/stock-status",
        method: "GET",
        credentials: "include",
      }),
    }),

    createProduct: build.mutation({
      query: (data) => ({
        url: "/product/create-product",
        method: "POST",
        body: data,
        credentials: "include",
      }),
    }),
  }),
});

export const { useGetStockStatusQuery, useCreateProductMutation } = productApi;
