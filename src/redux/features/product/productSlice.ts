import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  productCreateData: {},
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    creactProduct: (state, action) => {
      state.productCreateData = {
        ...state.productCreateData,
        ...action.payload,
      };
    },
  },
});

export const { creactProduct } = productSlice.actions;
export default productSlice.reducer;
