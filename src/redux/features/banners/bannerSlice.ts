import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  topBanner: [],
  mainBanner: [],
};

const bannerSlice = createSlice({
  name: "banner",
  initialState,
  reducers: {
    topBanner: (state, action: PayloadAction<{ topBanner: [] }>) => {
      state.mainBanner = [...action.payload.topBanner];
    },
  },
});

export const { topBanner } = bannerSlice.actions;
export default bannerSlice.reducer;
