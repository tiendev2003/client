import { ErrorMessage, Field, Form, Formik } from "formik";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { Breadcrumb } from "../../components";
import { registerUser } from "../../features/auth/authAction";

const RegisterPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, userInfo, error, success } = useSelector(
    (state) => state.auth
  );

  const initialValues = {
    TenNguoiDung: "",
    TenTaiKhoan: "",
    Email: "",
    MatKhau: "",
    SDT: "",
  };
  useEffect(() => {
    if (userInfo) navigate("/");
    if (success) navigate("/dang-nhap");
  }, [navigate, userInfo, success]);
  const validationSchema = Yup.object({
    TenNguoiDung: Yup.string().required("Họ và Tên là bắt buộc"),
    TenTaiKhoan: Yup.string()
      .required("Tên Tài Khoản là bắt buộc")
      .max(255, "Tên Tài Khoản không được quá 255 ký tự"),
    Email: Yup.string()
      .email("Email không hợp lệ")
      .required("Email là bắt buộc")
      .max(255, "Email không được quá 255 ký tự"),
    MatKhau: Yup.string()
      .required("Mật khẩu là bắt buộc")
      .min(5, "Mật khẩu phải có ít nhất 5 ký tự"),
    SDT: Yup.string()
      .required("Số điện thoại là bắt buộc")
      .min(10, "Số điện thoại phải có 10 ký tự")
      .max(10, "Số điện thoại phải có 10 ký tự"),
  });
  const handleSubmit = (values, { setSubmitting }) => {
    dispatch(registerUser(values)).then(() => {
      setSubmitting(false);
    });
  };

  return (
    <>
      <Breadcrumb title="Đăng ký" items="Đăng ký" />

      <div className="login-area py-120">
        <div className="container">
          <div className="col-md-5 mx-auto">
            <div className="login-form">
              <div className="login-header">
                <img src="/img/logo/logo-dark.png" alt="" />
                <p>Tạo tài khoản BillardBooking</p>
              </div>
              <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
              >
                {({ isSubmitting }) => (
                  <Form>
                    <div className="form-group">
                      <label>Họ và Tên</label>
                      <div className="form-group-icon">
                        <Field
                          type="text"
                          name="TenNguoiDung"
                          className="form-control"
                          placeholder="Nhập họ và tên"
                        />
                        <i className="fa fa-user"></i>
                        <ErrorMessage
                          name="TenNguoiDung"
                          component="div"
                          className="text-danger"
                        />
                      </div>
                    </div>
                    <div className="form-group">
                      <label>Tên Tài Khoản</label>
                      <div className="form-group-icon">
                        <Field
                          type="text"
                          name="TenTaiKhoan"
                          className="form-control"
                          placeholder="Nhập tên tài khoản"
                        />
                        <i className="fa fa-user"></i>
                        <ErrorMessage
                          name="TenTaiKhoan"
                          component="div"
                          className="text-danger"
                        />
                      </div>
                    </div>
                    <div className="form-group">
                      <label>Email</label>
                      <div className="form-group-icon">
                        <Field
                          type="email"
                          name="Email"
                          className="form-control"
                          placeholder="Nhập email"
                        />
                        <i className="fa-solid fa-address-book"></i>
                        <ErrorMessage
                          name="Email"
                          component="div"
                          className="text-danger"
                        />
                      </div>
                    </div>
                    <div className="form-group">
                      <label>Mật khẩu</label>
                      <div className="form-group-icon">
                        <Field
                          type="password"
                          name="MatKhau"
                          className="form-control"
                          placeholder="Nhập mật khẩu"
                        />
                        <i className="fa fa-lock"></i>
                        <ErrorMessage
                          name="MatKhau"
                          component="div"
                          className="text-danger"
                        />
                      </div>
                    </div>
                    <div className="form-group">
                      <label>Số điện thoại</label>
                      <div className="form-group-icon">
                        <Field
                          type="text"
                          name="SDT"
                          className="form-control"
                          placeholder="Nhập số điện thoại"
                        />
                        <i className="fa fa-phone"></i>
                        <ErrorMessage
                          name="SDT"
                          component="div"
                          className="text-danger"
                        />
                      </div>
                    </div>
                    <div className="d-flex align-items-center">
                      <button
                        type="submit"
                        className="theme-btn"
                        disabled={isSubmitting || loading}
                      >
                        <i className="far fa-paper-plane"></i>{" "}
                        {loading ? "Đang đăng ký..." : "Đăng ký"}
                      </button>
                    </div>

                    {error && <p className="text-danger">{error}</p>}
                  </Form>
                )}
              </Formik>

              <div className="login-footer">
                <div className="login-divider">
                  <span>Or</span>
                </div>
                <div className="social-login">
                  <a href="#" className="btn-fb">
                    <i className="fa-brands fa-facebook"></i> Facebook
                  </a>
                  <a href="#" className="btn-gl">
                    <i className="fa-brands fa-google"></i> Google
                  </a>
                </div>
                <p>
                  Bạn đã có tài khoản? <Link to="/dang-nhap">Đăng nhập.</Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default RegisterPage;
