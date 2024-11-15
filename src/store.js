import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "./features/auth/authServices";
import authReducer from "./features/auth/authSlice";
import banForStoreSlice from "./features/banforstore/banForStoreSlice";
import bannerReducer from "./features/banner/bannerSlice";
import bookingReducer from "./features/book/bookSlice";
import ctkmReducer from "./features/ctkm/ctkmSlice";
import danhgiaSlice from "./features/danhgia/danhgiaSlice";
import danhMucAnhReducer from "./features/danhmucanh/dmaSlice";
import danhMucBanReducer from "./features/danhmucban/danhMucBanSlice";
import danhMucKhuyenMaiReducer from "./features/danhmuckm/danhMucKhuyenMaiSlice";
import danhMucSanPhamReducer from "./features/danhmucsanpham/danhMucSanPhamSlice";
import dichvuReducer from "./features/dichvu/dichvuSlice";
import hoadonReducer from "./features/hoadon/hoadonSlice";
import orderReducer from "./features/orders/orderSlice";
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
    orders: orderReducer,
    danhMucAnh: danhMucAnhReducer,
    hoadon: hoadonReducer,
    banner :bannerReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware),
});

export default store;
