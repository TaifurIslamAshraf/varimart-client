import { apiSlice } from "../apiSlice/apiSlice";
import { getProductReviews } from "./reviewSlice";

const reviewApi = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    createProductReview: build.mutation({
      query: ({ data }) => ({
        url: "/product/create-review",
        method: "PUT",
        body: data,
        credentials: "include",
      }),
      invalidatesTags: ["Reviews"] as any,
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
      query: ({}) => ({
        url: "/product/all-product-reviews",
        method: "GET",
        credentials: "include",
      }),
      providesTags: ["Reviews"] as any,
    }),

    updateReviewStatus: build.mutation({
      query: ({ data }) => ({
        url: "/product/update-review-status",
        method: "PUT",
        body: data,
        credentials: "include",
      }),
      invalidatesTags: ["Reviews"] as any,
    }),
    deleteReview: build.mutation({
      query: ({ reviewId, productId }) => ({
        url: `/product/delete-review`,
        method: "DELETE",
        body: {
          productId,
          reviewId,
        },
        credentials: "include",
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
