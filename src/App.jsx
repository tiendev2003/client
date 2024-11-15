import { Suspense, lazy } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import LoadingSpinner from "./components/LoadingSpinner";
import { AdminLayout } from "./layouts/AdminLayout";
import MainLayout from "./layouts/MainLayout";
import ProfileLayout from "./layouts/ProfileLayout";
import { StoreLayout } from "./layouts/StoreLayout";
import ContentManagement from "./pages/Admin/ContentManagement";
import DashboardAdmin from "./pages/Admin/Dashboard";
import SystemConfiguration from "./pages/Admin/SystemConfiguration";
import UserManagement from "./pages/Admin/Users/UserManagement";
import { DashboardStore } from "./pages/StoreOwner/DashboardStore";
 
import ViewOrder from "./pages/StoreOwner/Orders/ViewOrder";
import { CreateSanPham } from "./pages/StoreOwner/Sanpham/CreateSanPham";
import { EditSanpham } from "./pages/StoreOwner/Sanpham/EditSanpham";
import { ManageSanpham } from "./pages/StoreOwner/Sanpham/ManageSanpham";
import { CreateService } from "./pages/StoreOwner/Services/CreateService";
import { ServiceManagement } from "./pages/StoreOwner/Services/ServiceManagement";
import { SettingStore } from "./pages/StoreOwner/SettingStore";
import { CreateBilliardTable } from "./pages/StoreOwner/Tables/CreateBilliardTable";
import ManageBilliardTables from "./pages/StoreOwner/Tables/ManageBilliardTables";
import ProtectedRoute from "./routing/ProtectedRoute";

import CreateBanner from "./pages/Admin/Banner/CreateBanner";
import EditBanner from "./pages/Admin/Banner/EditBanner";
import ManagementBanner from "./pages/Admin/Banner/ManagementBanner";
import CreateDMA from "./pages/Admin/DanhMucAnh/CreateDMA";
import EditDMA from "./pages/Admin/DanhMucAnh/EditDMA";
import ManagementDMA from "./pages/Admin/DanhMucAnh/ManagementDMA";
import CreateRole from "./pages/Admin/Roles/CreateRole";
import EditRole from "./pages/Admin/Roles/EditRole";
import ManagementRole from "./pages/Admin/Roles/ManagementRole";
import CreateStore from "./pages/Admin/Store/CreateStore";
import EditStore from "./pages/Admin/Store/EditStore";
import StoreManagement from "./pages/Admin/Store/StoreManagement";
import ViewStore from "./pages/Admin/Store/ViewStore";
import { CreateCTKM } from "./pages/StoreOwner/CTKM/CreateCTKM";
import { EditCTKM } from "./pages/StoreOwner/CTKM/EditCTKM";
import { ManageCTKM } from "./pages/StoreOwner/CTKM/ManageCTKM";
import CurrentStore from "./pages/StoreOwner/CurrentStore";
import { CreateDanhMucBan } from "./pages/StoreOwner/DanhMucBan/CreateDanhMucBan";
import { EditDanhMucBan } from "./pages/StoreOwner/DanhMucBan/EditDanhMucBan";
import { ManageDanhMucBan } from "./pages/StoreOwner/DanhMucBan/ManageDanhMucBan";
import { CreateDanhMucCTKM } from "./pages/StoreOwner/DanhMucCTKM/CreateDanhMucCTKM";
import { EditDanhMucCTKM } from "./pages/StoreOwner/DanhMucCTKM/EditDanhMucCTKM";
import { ManageDanhMucCTKM } from "./pages/StoreOwner/DanhMucCTKM/ManageDanhMucCTKM";
import { CreateDanhMucSanPham } from "./pages/StoreOwner/DanhMucSanPham/CreateDanhMucSanPham";
import { EditDanhMucSanPham } from "./pages/StoreOwner/DanhMucSanPham/EditDanhMucSanPham";
import { ManageDanhMucSanPham } from "./pages/StoreOwner/DanhMucSanPham/ManageDanhMucSanPham";
import { DetailPaymentInvoices } from "./pages/StoreOwner/DetailPaymentInvoices";
import ManagePaymentsInvoices from "./pages/StoreOwner/ManagePaymentsInvoices";
import DetailOrder from "./pages/StoreOwner/Orders/DetailOrder";
import ManagementOrder from "./pages/StoreOwner/Orders/ManagementOrder";
import { EditService } from "./pages/StoreOwner/Services/EditService";
import { EditBilliardTable } from "./pages/StoreOwner/Tables/EditBilliardTable";

const HomePage = lazy(() => import("./pages/Home/HomePage"));
const AboutPage = lazy(() => import("./pages/About/AboutPage"));
const BlogPage = lazy(() => import("./pages/Blog/BlogPage"));
const PrivacyPage = lazy(() => import("./pages/PrivacyTerm/PrivacyPage"));
const TermsPage = lazy(() => import("./pages/PrivacyTerm/TermsPage"));
const FaqPage = lazy(() => import("./pages/Faq/FaqPage"));
const ContactPage = lazy(() => import("./pages/Contact/ContactPage"));
const LoginPage = lazy(() => import("./pages/Auth/LoginPage"));
const RegisterPage = lazy(() => import("./pages/Auth/RegisterPage"));
const ForgotPasswordPage = lazy(() =>
  import("./pages/Auth/ForgotPasswordPage")
);
const NotFoundPage = lazy(() => import("./pages/NotFound/NotFoundPage"));
const BlogDetailPage = lazy(() => import("./pages/Blog/BlogDetailPage"));
const BillardPage = lazy(() => import("./pages/Billiard/BilliardPage"));
const BillardDetailPage = lazy(() =>
  import("./pages/Billiard/BilliardDetailPage")
);
const OtpPage = lazy(() => import("./pages/Auth/OtpPage"));
const Dashboard = lazy(() => import("./pages/User/DashboardPage"));
const Profile = lazy(() => import("./pages/User/ProfilePage"));
const Settings = lazy(() => import("./pages/User/ProfileSettingPage"));
const Bookings = lazy(() => import("./pages/User/ProfileBookingPage"));
const Wishlist = lazy(() => import("./pages/User/ProfileWishlistPage"));
const BookingsDetail = lazy(() => import("./pages/User/ProfileBookingDetail"));
function App() {
  return (
    <Router>
      <Suspense fallback={<LoadingSpinner />}>
        <Routes>
          <Route element={<MainLayout />}>
            <Route index path="/" element={<HomePage />} />
            <Route path="/gioi-thieu" element={<AboutPage />} />
            <Route path="/lien-he" element={<ContactPage />} />
            <Route path="/tin-tuc" element={<BlogPage />} />
            <Route path="/chinh-sach-bao-mat" element={<PrivacyPage />} />
            <Route path="/dieu-khoan-su-dung" element={<TermsPage />} />
            <Route path="/huong-dan-su-dung" element={<FaqPage />} />
            <Route path="*" element={<NotFoundPage />} />
            <Route path="/dang-nhap" element={<LoginPage />} />
            <Route path="/dang-ky" element={<RegisterPage />} />
            <Route path="/quen-mat-khau" element={<ForgotPasswordPage />} />
            <Route path="/tin-tuc/:slug" element={<BlogDetailPage />} />
            <Route path="/billiard" element={<BillardPage />} />
            <Route path="/billiard/:id" element={<BillardDetailPage />} />
            <Route path="/otp" element={<OtpPage />} />
            <Route
              element={<ProtectedRoute allowedRoles={[1, 2, 3, 4, 5]} />}
              loader={true}
            >
              <Route element={<ProfileLayout />}>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/setting" element={<Settings />} />
                <Route path="/bookings" element={<Bookings />} />
                <Route path="/wishlist" element={<Wishlist />} />
                <Route path="/bookings/:id" element={<BookingsDetail />} />
              </Route>
            </Route>
          </Route>
          <Route element={<ProtectedRoute allowedRoles={[1]} />}>
            <Route element={<AdminLayout />}>
              <Route path="/admin/dashboard" element={<DashboardAdmin />} />
              <Route
                path="/admin/management-user"
                element={<UserManagement />}
              />

              <Route
                path="/admin/management-store"
                element={<StoreManagement />}
              />
              <Route
                path="/admin/management-store/create"
                element={<CreateStore />}
              />
              <Route
                path="/admin/management-store/edit/:id"
                element={<EditStore />}
              />
              <Route
                path="/admin/management-store/view/:id"
                element={<ViewStore />}
              />

              <Route
                path="/admin/management-role"
                element={<ManagementRole />}
              />
              <Route
                path="/admin/management-role/create"
                element={<CreateRole />}
              />
              <Route
                path="/admin/management-role/edit/:id"
                element={<EditRole />}
              />

              <Route path="/admin/management-dma" element={<ManagementDMA />} />
              <Route
                path="/admin/management-dma/create"
                element={<CreateDMA />}
              />
              <Route
                path="/admin/management-dma/edit/:id"
                element={<EditDMA />}
              />
              

              <Route
                path="/admin/banner"
                element={<ManagementBanner />}
              />
              <Route
                path="/admin/banner/create"
                element={<CreateBanner />}
              />
              <Route
                path="/admin/banner/eidt/:id"
                element={<EditBanner />}
              />


              <Route
                path="/admin/content-management"
                element={<ContentManagement />}
              />
              <Route
                path="/admin/system-configuration"
                element={<SystemConfiguration />}
              />
            </Route>
          </Route>
          <Route element={<ProtectedRoute allowedRoles={[2]} />}>
            <Route element={<StoreLayout />}>
              <Route path="/store" element={<DashboardStore />} />
              {/* dịch vụ */}
              <Route
                path="/store/manage-services"
                element={<ServiceManagement />}
              />
              <Route
                path="/store/manage-services/edit/:id"
                element={<EditService />}
              />
              <Route
                path="/store/manage-services/create"
                element={<CreateService />}
              />
              {/* danh mục sản phẩm */}
              <Route
                path="/store/manage-category-sanpham/create"
                element={<CreateDanhMucSanPham />}
              />
              <Route
                path="/store/manage-category-sanpham"
                element={<ManageDanhMucSanPham />}
              />
              <Route
                path="/store/manage-category-sanpham/edit/:id"
                element={<EditDanhMucSanPham />}
              />
              {/* danh mục ctkm */}
              <Route
                path="/store/manage-category-ctkm/create"
                element={<CreateDanhMucCTKM />}
              />
              <Route
                path="/store/manage-category-ctkm"
                element={<ManageDanhMucCTKM />}
              />
              <Route
                path="/store/manage-category-ctkm/edit/:id"
                element={<EditDanhMucCTKM />}
              />
              {/* ctkm */}
              <Route
                path="/store/manage-ctkm/create"
                element={<CreateCTKM />}
              />
              <Route path="/store/manage-ctkm" element={<ManageCTKM />} />
              <Route
                path="/store/manage-ctkm/edit/:id"
                element={<EditCTKM />}
              />
              {/* danh mục bàn */}
              <Route
                path="/store/manage-category-table/create"
                element={<CreateDanhMucBan />}
              />
              <Route
                path="/store/manage-category-table"
                element={<ManageDanhMucBan />}
              />
              <Route
                path="/store/manage-category-table/edit/:id"
                element={<EditDanhMucBan />}
              />
              {/* bàn */}

              <Route
                path="/store/manage-tables/create"
                element={<CreateBilliardTable />}
              />

              <Route
                path="/store/manage-tables/edit/:id"
                element={<EditBilliardTable />}
              />
              <Route
                path="/store/manage-tables"
                element={<ManageBilliardTables />}
              />

              {/* sản phẩm */}
              <Route path="/store/manage-sanpham" element={<ManageSanpham />} />
              <Route
                path="/store/manage-sanpham/create"
                element={<CreateSanPham />}
              />
              <Route
                path="/store/manage-sanpham/edit/:id"
                element={<EditSanpham />}
              />

              {/* thống kê */}
              <Route path="/store/location" element={<CurrentStore />} />
              <Route path="/store/order/view" element={<ViewOrder />} />
              <Route path="/store/order" element={<ManagementOrder />} />
              <Route path="/store/order/:id/:idban" element={<DetailOrder />} />
              <Route path="/store/setting" element={<SettingStore />} />
              <Route
                path="/store/invoice"
                element={<ManagePaymentsInvoices />}
              />
                <Route
              path="/store/invoice/:id"
              element={<DetailPaymentInvoices />}
            />
            </Route>
          
          </Route>
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
