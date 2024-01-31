import { apiSlice } from "../apiSlice/apiSlice";
import { getProductReviews } from "./reviewSlice";

const reviewApi = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    createReview: build.mutation({
      query: (data) => ({
        url: "/product/create-review",
        method: "PUT",
        body: data,
        credentials: "include",
      }),
    }),

    getReviews: build.query({
      query: ({ productId, userId }) => ({
        url: "/product/all-reviews",
        method: "GET",
        params: {
          productId,
          userId,
        },
        credentials: "include",
      }),

      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const result = await queryFulfilled;
          dispatch(getProductReviews(result.data));
        } catch (error: any) {
          console.log(error.message);
        }
      },
    }),
  }),
});

export const { useCreateReviewMutation, useGetReviewsQuery } = reviewApi;
