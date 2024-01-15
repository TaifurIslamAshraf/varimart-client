import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./features/apiSlice/apiSlice";
import authSlice from "./features/auth/authSlice";
import bannerSlice from "./features/banners/bannerSlice";
import categorySlice from "./features/category/categorySlice";

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authSlice,
    banner: bannerSlice,
    category: categorySlice,
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
