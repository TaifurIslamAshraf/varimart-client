import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  allOrders: {},
};

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    getAllOrders: (state, action) => {
      state.allOrders = action.payload;
    },
  },
});

export const { getAllOrders } = orderSlice.actions;
export default orderSlice.reducer;
