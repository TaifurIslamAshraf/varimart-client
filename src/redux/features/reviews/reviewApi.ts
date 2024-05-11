import { apiSlice } from "../apiSlice/apiSlice";
import { getProductReviews } from "./reviewSlice";

const reviewApi = apiSlice.injectEndpoints({
  endpoints: (build) => ({
<<<<<<< HEAD
    createReview: build.mutation({
      query: ({ data, accessToken }) => ({
=======
    createProductReview: build.mutation({
      query: ({ data }) => ({
>>>>>>> origin/production-version
        url: "/product/create-review",
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
      invalidatesTags: ["Reviews"] as any,
    }),

    getReviews: build.query({
<<<<<<< HEAD
      query: ({ productId, userId, accessToken }) => ({
=======
      query: ({ productId, userId }) => ({
>>>>>>> origin/production-version
        url: "/product/all-reviews",
        method: "GET",
        params: {
          productId,
          userId,
        },
        credentials: "include",
<<<<<<< HEAD
        headers: {
          authorization: `Bearer ${accessToken}`,
        },
=======
>>>>>>> origin/production-version
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
<<<<<<< HEAD
      query: ({ accessToken }) => ({
        url: "/product/all-product-reviews",
        method: "GET",
        credentials: "include",
        headers: {
          authorization: `Bearer ${accessToken}`,
        },
=======
      query: ({}) => ({
        url: "/product/all-product-reviews",
        method: "GET",
        credentials: "include",
>>>>>>> origin/production-version
      }),
      providesTags: ["Reviews"] as any,
    }),

    updateReviewStatus: build.mutation({
<<<<<<< HEAD
      query: ({ data, accessToken }) => ({
=======
      query: ({ data }) => ({
>>>>>>> origin/production-version
        url: "/product/update-review-status",
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
      invalidatesTags: ["Reviews"] as any,
    }),
    deleteReview: build.mutation({
<<<<<<< HEAD
      query: ({ reviewId, productId, accessToken }) => ({
=======
      query: ({ reviewId, productId }) => ({
>>>>>>> origin/production-version
        url: `/product/delete-review`,
        method: "DELETE",
        body: {
          productId,
          reviewId,
        },
        credentials: "include",
<<<<<<< HEAD
        headers: {
          authorization: `Bearer ${accessToken}`,
        },
=======
>>>>>>> origin/production-version
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
