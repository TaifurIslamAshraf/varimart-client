import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./features/apiSlice/apiSlice";
import authSlice from "./features/auth/authSlice";

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});

// initialize app

const initiallize = async () => {
  store.dispatch(
    apiSlice.endpoints.refreshToken.initiate({}, { forceRefetch: true })
  );

  store.dispatch(
    apiSlice.endpoints.userInfo.initiate({}, { forceRefetch: true })
  );
};

initiallize();
