import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  productReview: {},
};

const reviewSlice = createSlice({
  name: "reviews",
  initialState,
  reducers: {
    getProductReviews: (state, action) => {
      state.productReview = action.payload;
    },
  },
});

export const { getProductReviews } = reviewSlice.actions;
export default reviewSlice.reducer;
