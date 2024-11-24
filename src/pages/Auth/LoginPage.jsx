import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import * as yup from "yup";
import { Breadcrumb } from "../../components";
import { loginUser } from "../../features/auth/authAction";

const validationSchema = yup.object().shape({
  Email: yup.string().required("Email là bắt buộc"),
  MatKhau: yup.string().required("Mật khẩu là bắt buộc"),
});
const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, userInfo, error } = useSelector((state) => state.auth);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });
  useEffect(() => {
    if (userInfo) {
      console.log(userInfo);
      switch (userInfo.id_QuyenTK) {
       
        case 1:
          navigate("/admin/dashboard");
          break;
        case 2:
          navigate("/store");
          break;
        case 4:
          navigate("/profile");
          break;
        default:
          navigate("/notfound");
      }
    }
  }, [navigate, userInfo]);

  const onSubmit = async (data) => {
    dispatch(loginUser(data));
  };

  const handleGoogleLogin = async () => {
    try {
      
      const response = await fetch("http://127.0.0.1:8000/api/auth/google/redirect")
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
     

  };

  return (
    <>
      <Breadcrumb title="Đăng nhập" items="Đăng nhập" />

      <div className="login-area py-120">
        <div className="container">
          <div className="col-md-5 mx-auto">
            <div className="login-form">
              <div className="login-header">
                <img src="/img/logo/logo-dark.png" alt="" />
                <p> Đăng nhập bằng tài khoản BillardBooking</p>
              </div>
              {error && <div className="alert alert-danger">{error}</div>}
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="form-group">
                  <label>Email &amp; Số điện thoại</label>
                  <div className="form-group-icon">
                    <input
                      type="text"
                      {...register("Email")}
                      className="form-control"
                      placeholder="Nhập email hoặc eố điện thoại"
                    />
                    <i className="fa-solid fa-address-book"></i>
                    {errors.Email && (
                      <div className="text-danger">{errors.Email.message}</div>
                    )}
                  </div>
                </div>
                <div className="form-group">
                  <label>Mật khẩu</label>
                  <div className="form-group-icon">
                    <input
                      type="password"
                      {...register("MatKhau")}
                      className="form-control"
                      placeholder="Nhập mật khẩu"
                    />
                    <i className="fa fa-lock"></i>
                    {errors.MatKhau && (
                      <div className="text-danger">
                        {errors.MatKhau.message}
                      </div>
                    )}
                  </div>
                </div>
                <div className="d-flex justify-content-between mb-3">
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      value=""
                      id="remember"
                    />
                    <label className="form-check-label" htmlFor="remember">
                      Ghi nhớ
                    </label>
                  </div>
                  <Link to={"/quen-mat-khau"} className="forgot-pass">
                    Quên mật khẩu?
                  </Link>
                </div>
                <div className="d-flex align-items-center">
                  <button
                    type="submit"
                    className="theme-btn"
                    disabled={loading}
                  >
                    <i className="fa fa-sign-in"></i> Đăng nhập{" "}
                    {loading && <i className="fa fa-spinner fa-spin"></i>}
                  </button>
                </div>
              </form>
              <div className="login-footer">
                <div className="login-divider">
                  <span>Or</span>
                </div>
                <div className="social-login">
                  <a href="#" className="btn-fb">
                    <i className="fa-brands fa-facebook"></i> Facebook
                  </a>
                  <a href="#" className="btn-gl" onClick={handleGoogleLogin}>
                    <i className="fa-brands fa-google"></i> Google
                  </a>
                </div>
                <p>
                  Bạn chưa có tài khoản?? <Link to="/dang-ky">Đăng ký.</Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
