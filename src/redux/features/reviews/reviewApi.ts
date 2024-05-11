import { apiSlice } from "../apiSlice/apiSlice";
import { getProductReviews } from "./reviewSlice";

const reviewApi = apiSlice.injectEndpoints({
  endpoints: (build) => ({
<<<<<<< HEAD
    createProductReview: build.mutation({
      query: ({ data, accessToken }) => ({
=======
    createReview: build.mutation({
      query: ({ data, refresh_token }) => ({
>>>>>>> parent of dd4062c (make compateble with next-auth)
        url: "/product/create-review",
        method: "PUT",
        body: data,
        credentials: "include",
        headers: {
          refresh_token,
        },
      }),
      invalidatesTags: ["Reviews"] as any,
    }),

    getReviews: build.query({
      query: ({ productId, userId, refresh_token }) => ({
        url: "/product/all-reviews",
        method: "GET",
        params: {
          productId,
          userId,
        },
        credentials: "include",
        headers: {
          refresh_token,
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
      query: ({ refresh_token }) => ({
        url: "/product/all-product-reviews",
        method: "GET",
        credentials: "include",
        headers: {
          refresh_token,
        },
      }),
      providesTags: ["Reviews"] as any,
    }),

    updateReviewStatus: build.mutation({
      query: ({ data, refresh_token }) => ({
        url: "/product/update-review-status",
        method: "PUT",
        body: data,
        credentials: "include",
        headers: {
          refresh_token,
        },
      }),
      invalidatesTags: ["Reviews"] as any,
    }),
    deleteReview: build.mutation({
      query: ({ reviewId, productId, refresh_token }) => ({
        url: `/product/delete-review`,
        method: "DELETE",
        body: {
          productId,
          reviewId,
        },
        credentials: "include",
        headers: {
          refresh_token,
        },
      }),
      invalidatesTags: ["Reviews"] as any,
    }),
  }),
});

export const {
  useCreateProductReviewMutation,
  useGetReviewsQuery,
  useUpdateReviewStatusMutation,
  useGetAllProductReviewsQuery,
  useDeleteReviewMutation,
} = reviewApi;
