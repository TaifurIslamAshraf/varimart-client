import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  topBanner: [],
  mainBanner: [],
  allBanner: [],
};

const bannerSlice = createSlice({
  name: "banner",
  initialState,
  reducers: {
    topBanner: (state, action: PayloadAction<{ topBanner: [] }>) => {
      state.topBanner = [...action.payload.topBanner];
    },
    mainBanner: (state, action: PayloadAction<{ topBanner: [] }>) => {
      state.mainBanner = [...action.payload.topBanner];
    },
    allBanner: (state, action: PayloadAction<{ topBanner: [] }>) => {
      state.allBanner = [...action.payload.topBanner];
    },
  },
});

export const { topBanner, mainBanner, allBanner } = bannerSlice.actions;
export default bannerSlice.reducer;
