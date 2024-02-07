import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  allOrders: {},
  userOrders: {},
};

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    getAllOrders: (state, action) => {
      state.userOrders = action.payload;
    },
    getUserOrders: (state, action) => {
      state.allOrders = action.payload;
    },
  },
});

export const { getAllOrders, getUserOrders } = orderSlice.actions;
export default orderSlice.reducer;
