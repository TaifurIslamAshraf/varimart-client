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
      action: PayloadAction<{ accessToken: string; user: any }>
    ) => {
      state.token = action.payload.accessToken;
      state.user = action.payload.user;
    },

    userLogout: (state, action) => {
      state.token = "";
      state.user = "";
    },

    updateUser: (state, action: PayloadAction<{ user: object }>) => {
      state.user = action.payload.user;
    },
  },
});

export const { userLogin, userLogout, userRegistretion, updateUser } =
  authSlice.actions;
export default authSlice.reducer;
