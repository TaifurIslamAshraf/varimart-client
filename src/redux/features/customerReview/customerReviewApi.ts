import { apiSlice } from "../apiSlice/apiSlice";
import { allCustomerReviews } from "./customerReviewSlice";

export const customerReviewApi = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    getAllCustomerReview: build.query({
      query: () => ({
        method: "GET",
        url: "/review/create-customer-review",
      }),

      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const result = await queryFulfilled;
          dispatch(allCustomerReviews({ customerReview: result }));
        } catch (error: any) {
          console.log(error.message);
        }
      },
    }),

    createReview: build.mutation({
      query: ({ data }) => ({
        url: "/review/create-customer-review",
        method: "POST",
        body: data,
        credentials: "include",
      }),
    }),
  }),
});

export const { useGetAllCustomerReviewQuery, useCreateReviewMutation } =
  customerReviewApi;
