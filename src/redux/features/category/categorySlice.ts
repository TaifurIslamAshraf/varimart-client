import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState = {
  category: {},
};

const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    allCategory: (state, action: PayloadAction<{ category: {} }>) => {
      state.category = action.payload.category;
    },
  },
});

export const { allCategory } = categorySlice.actions;
export default categorySlice.reducer;
