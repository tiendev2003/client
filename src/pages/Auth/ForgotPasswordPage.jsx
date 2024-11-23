import { useState } from "react";
import { toast } from "react-toastify";
import axiosClient from "../../api/axiosClient";
import { Breadcrumb } from "../../components";

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) {
      toast.error("Vui lòng nhập email hoặc số điện thoại");
      return;
    }
    // Call API to send reset password link
    try {
      const res = await axiosClient.post("/sendmail", { email });
      if (res.data) {
        toast.success(res.data.message);
      } else {
        toast.error(res.data.error);
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <>
      <Breadcrumb title="Quên mật khẩu" items="Quên mật khẩu" />

      <div className="login-area py-120">
        <div className="container">
          <div className="col-md-5 mx-auto">
            <div className="login-form">
              <div className="login-header">
                <img src="../img/logo/logo-dark.png" alt="" />
                <p>Đặt lại mật khẩu BillardBooking</p>
              </div>
              <form action="#" onSubmit={handleSubmit}>
                <div className="form-group">
                  <label>Email</label>
                  <div className="form-group-icon">
                    <input
                      type="email"
                      name="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="form-control"
                      placeholder="Nhập mail hoặc số điện thoại"
                    />
                    <i className="fa-solid fa-address-book"></i>
                  </div>
                </div>
                <div className="d-flex align-items-center">
                  <button type="submit" className="theme-btn">
                    <i className="fa fa-key"></i> Gửi liên kết đặt lại
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ForgotPasswordPage;
