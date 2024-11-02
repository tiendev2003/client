import { Suspense, lazy } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import LoadingSpinner from "./components/LoadingSpinner";
import MainLayout from "./layouts/MainLayout";
import ProfileLayout from "./layouts/ProfileLayout";

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
const BookingHistory = lazy(() => import("./pages/User/BookingHistoryPage"));
const Wishlist = lazy(() => import("./pages/User/ProfileWishlistPage"));
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
            <Route path="/billiard/:slug" element={<BillardDetailPage />} />
            <Route path="/otp" element={<OtpPage />} />
            <Route element={<ProfileLayout />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/setting" element={<Settings />} />
              <Route path="/bookings" element={<Bookings />} />
              <Route path="/booking-history" element={<BookingHistory />} />
              <Route path="/wishlist" element={<Wishlist />} />
            </Route>
          </Route>
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
