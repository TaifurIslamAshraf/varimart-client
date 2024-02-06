import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  productCreateData: {},
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    creactProductData: (state, action) => {
      state.productCreateData = {
        ...state.productCreateData,
        ...action.payload,
      };
    },

    resetProductData: (state, action) => {
      state.productCreateData = {};
    },
  },
});

export const { creactProductData, resetProductData } = productSlice.actions;
export default productSlice.reducer;
