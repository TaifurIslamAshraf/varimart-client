import { apiSlice } from "../apiSlice/apiSlice";
import { topBanner } from "./bannerSlice";

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

    createBanner: build.mutation({
      query: ({ data }) => ({
        url: "/banner/create-banner",
        method: "POST",
        body: data,

        credentials: "include",
      }),
    }),
    deleteBanner: build.mutation({
      query: ({ id }) => ({
        url: `/banner/delete-banner/${id}`,
        method: "DELETE",
        credentials: "include",
      }),
    }),
  }),
});

export const {
  useGetTopBannerQuery,
  useCreateBannerMutation,
  useDeleteBannerMutation,
} = bannerApi;
