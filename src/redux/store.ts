import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./features/apiSlice/apiSlice";
import authSlice from "./features/auth/authSlice";
import bannerSlice from "./features/banners/bannerSlice";
import cartSlice from "./features/cart/cartSlice";
import categorySlice from "./features/category/categorySlice";
import orderSlice from "./features/orders/orderSlice";
import porductSlice from "./features/product/productSlice";
import reviewSlice from "./features/reviews/reviewSlice";

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authSlice,
    banner: bannerSlice,
    category: categorySlice,
    cart: cartSlice,
    porductReviews: reviewSlice,
    order: orderSlice,
    product: porductSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});

// initialize app

const initiallize = () => {
  store.dispatch(
    apiSlice.endpoints.refreshToken.initiate({}, { forceRefetch: true })
  );

  store.dispatch(
    apiSlice.endpoints.userInfo.initiate({}, { forceRefetch: true })
  );
};

initiallize();
