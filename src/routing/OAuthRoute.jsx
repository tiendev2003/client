import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { LoadingSpinner } from "../components";

const OAuthRoute = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Lấy các query parameters từ URL callback của Google
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get("token");
    const user = urlParams.get("user");
    if (token) {
      try {
        // Lưu token vào localStorage
        localStorage.setItem("userToken", token);
        localStorage.setItem("userInfor", user);

        // Hiển thị thông báo đăng nhập thành công
        toast.success("Đăng nhập Google thành công!");

        // Điều hướng đến trang chính hoặc trang admin tùy vào vai trò người dùng
        navigate("/");
        navigate(0);
      } catch (error) {
        toast.error(
          "Đã xảy ra lỗi khi xử lý thông tin đăng nhập Google.",
          error
        );
        navigate("/dang-nhap");
      }
    }
  }, [navigate]);

  return <LoadingSpinner />;
};

export default OAuthRoute;
