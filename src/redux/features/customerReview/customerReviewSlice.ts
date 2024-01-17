import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  customerReview: {},
};

const customerReviewSlice = createSlice({
  name: "customerReview",
  initialState,
  reducers: {
    allCustomerReviews: (
      state,
      action: PayloadAction<{ customerReview: {} }>
    ) => {
      state.customerReview = action.payload.customerReview;
    },
  },
});

export const { allCustomerReviews } = customerReviewSlice.actions;
export default customerReviewSlice.reducer;
