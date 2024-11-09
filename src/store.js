import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "./features/auth/authServices";
import authReducer from "./features/auth/authSlice";
import banForStoreSlice from "./features/banforstore/banForStoreSlice";
import bookingReducer from "./features/book/bookSlice";
import ctkmReducer from "./features/ctkm/ctkmSlice";
import danhgiaSlice from "./features/danhgia/danhgiaSlice";
import danhMucBanReducer from "./features/danhmucban/danhMucBanSlice";
import danhMucKhuyenMaiReducer from "./features/danhmuckm/danhMucKhuyenMaiSlice";
import danhMucSanPhamReducer from "./features/danhmucsanpham/danhMucSanPhamSlice";
import dichvuReducer from "./features/dichvu/dichvuSlice";
import roleSlice from "./features/role/roleSlice";
import productReducer from "./features/sanpham/sanphamSlice";
import shopSlice from "./features/shop/shopSlice";
import userReducer from "./features/user/userSlice";
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
    role: roleSlice,
    danhgia: danhgiaSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware),
});

export default store;
