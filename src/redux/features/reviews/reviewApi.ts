import { apiSlice } from "../apiSlice/apiSlice";
import { getProductReviews } from "./reviewSlice";

const reviewApi = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    createReview: build.mutation({
      query: ({ data, accessToken }) => ({
        url: "/product/create-review",
        method: "PUT",
        body: data,
        credentials: "include",
        headers: {
          authorization: `Bearer ${accessToken}`,
        },
      }),
      invalidatesTags: ["Reviews"] as any,
    }),

    getReviews: build.query({
      query: ({ productId, userId, accessToken }) => ({
        url: "/product/all-reviews",
        method: "GET",
        params: {
          productId,
          userId,
        },
        credentials: "include",
        headers: {
          authorization: `Bearer ${accessToken}`,
        },
      }),
      providesTags: ["Reviews"] as any,
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const result = await queryFulfilled;
          dispatch(getProductReviews(result.data));
        } catch (error: any) {
          console.log(error.message);
        }
      },
    }),

    getAllProductReviews: build.query({
      query: ({ accessToken }) => ({
        url: "/product/all-product-reviews",
        method: "GET",
        credentials: "include",
        headers: {
          authorization: `Bearer ${accessToken}`,
        },
      }),
      providesTags: ["Reviews"] as any,
    }),

    updateReviewStatus: build.mutation({
      query: ({ data, accessToken }) => ({
        url: "/product/update-review-status",
        method: "PUT",
        body: data,
        credentials: "include",
        headers: {
          authorization: `Bearer ${accessToken}`,
        },
      }),
      invalidatesTags: ["Reviews"] as any,
    }),
    deleteReview: build.mutation({
      query: ({ reviewId, productId, accessToken }) => ({
        url: `/product/delete-review`,
        method: "DELETE",
        body: {
          productId,
          reviewId,
        },
        credentials: "include",
        headers: {
          authorization: `Bearer ${accessToken}`,
        },
      }),
      invalidatesTags: ["Reviews"] as any,
    }),
  }),
});

export const {
  useCreateReviewMutation,
  useGetReviewsQuery,
  useUpdateReviewStatusMutation,
  useGetAllProductReviewsQuery,
  useDeleteReviewMutation,
} = reviewApi;
