import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "./features/auth/authServices";
import authReducer from "./features/auth/authSlice";
import bookingReducer from "./features/book/bookSlice";
import productReducer from './features/sanpham/sanphamSlice';
import shopSlice from "./features/shop/shopSlice";
import userReducer from './features/user/userSlice';
import dichvuReducer from './features/dichvu/dichvuSlice';
import danhMucSanPhamReducer from './features/danhmucsanpham/danhMucSanPhamSlice';
import danhMucKhuyenMaiReducer from './features/danhmuckm/danhMucKhuyenMaiSlice';
import ctkmReducer from './features/ctkm/ctkmSlice';
import banForStoreSlice from './features/banforstore/banForStoreSlice';
import danhMucBanReducer from './features/danhmucban/danhMucBanSlice';
const store = configureStore({
  reducer: {
    user: userReducer,
    auth: authReducer,
    [authApi.reducerPath]: authApi.reducer,
    shop: shopSlice,
    booking: bookingReducer,
    banforstore: banForStoreSlice,
    products: productReducer,
    dichvu: dichvuReducer,
    danhMucSanPham: danhMucSanPhamReducer,
    danhMucKhuyenMai: danhMucKhuyenMaiReducer,
    danhMucBan: danhMucBanReducer,
    ctkm: ctkmReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware),
})

export default store;
