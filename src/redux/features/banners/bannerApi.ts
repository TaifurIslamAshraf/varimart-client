import { apiSlice } from "../apiSlice/apiSlice";
import { allBanner, topBanner } from "./bannerSlice";

export const bannerApi = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    getTopBanner: build.query({
      query: () => ({
        url: "/banner/get-all-banners?bannerType=topBanner",
        method: "GET",
      }),

      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          dispatch(topBanner({ topBanner: [...result.data.banner] as [] }));
        } catch (error: any) {
          console.log(error);
        }
      },
    }),
    getAllBanner: build.query({
      query: ({ bannerType, category }) => ({
        url: "/banner/get-all-banners",
        params: {
          bannerType,
          category,
        },
        method: "GET",
      }),

      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          dispatch(allBanner({ topBanner: [...result.data.banner] as [] }));
        } catch (error: any) {
          console.log(error);
        }
      },
    }),
  }),
});

export const { useGetTopBannerQuery, useGetAllBannerQuery } = bannerApi;
