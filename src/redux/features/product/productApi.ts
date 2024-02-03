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
  }),
});

export const { useGetStockStatusQuery } = productApi;
