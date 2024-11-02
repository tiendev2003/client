import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "./features/auth/authServices";
import authReducer from "./features/auth/authSlice";
import shopSlice from "./features/shop/shopSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    [authApi.reducerPath]: authApi.reducer,
    shop: shopSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware),
})

export default store;
