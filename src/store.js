import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "./features/auth/authServices";
import authReducer from "./features/auth/authSlice";
import bookingReducer from "./features/book/bookSlice";
import productReducer from './features/sanpham/sanphamSlice';
import shopSlice from "./features/shop/shopSlice";
import userReducer from './features/user/userSlice';

const store = configureStore({
  reducer: {
    user: userReducer,
    auth: authReducer,
    [authApi.reducerPath]: authApi.reducer,
    shop: shopSlice,
    booking: bookingReducer,
    products: productReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware),
})

export default store;
