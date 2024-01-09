import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  token: "",
  user: {},
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    userRegistretion: (state, action: PayloadAction<{ token: string }>) => {
      state.token = action.payload.token;
    },

    userLogin: (
      state,
      action: PayloadAction<{ accessToken: string; user: object }>
    ) => {
      state.token = action.payload.accessToken;
      state.user = action.payload.user;
    },

    userLogout: (state, action) => {
      state.token = "";
      state.user = "";
    },
  },
});

export const { userLogin, userLogout, userRegistretion } = authSlice.actions;
export default authSlice.reducer;
