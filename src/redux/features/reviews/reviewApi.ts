import { apiSlice } from "../apiSlice/apiSlice";

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
  }),
});

export const { useCreateReviewMutation } = reviewApi;
