import { Breadcrumb } from "../../components";

const ForgotPasswordPage = () => {
  return (
    <>
      <Breadcrumb title="Quên mật khẩu" items="Quên mật khẩu" />

      <div className="login-area py-120">
        <div className="container">
          <div className="col-md-5 mx-auto">
            <div className="login-form">
              <div className="login-header">
                <img src="../assets/img/logo/logo-dark.png" alt="" />
                <p>Đặt lại mật khẩu BillardBooking</p>
              </div>
              <form action="#">
                <div className="form-group">
                  <label>Email</label>
                  <div className="form-group-icon">
                    <input
                      type="email"
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
