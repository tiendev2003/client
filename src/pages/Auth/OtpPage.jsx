import { Breadcrumb } from "../../components";

const OtpPage = () => {
  return (
    <>
      <Breadcrumb title="Xác nhận OTP" items="Xác nhận OTP" />
      <div className="login-area py-120">
        <div className="container">
          <div className="col-md-5 mx-auto">
            <div className="login-form">
              <div className="login-header">
                <img src="/img/logo/logo-dark.png" alt="" />
                <p>Mã OTP</p>
              </div>
              <form action="#">
                <div className="form-group">
                  <label>OTP</label>
                  <div className="form-group-icon">
                    <input
                      type="email"
                      className="form-control"
                      placeholder="Nhập mã OTP"
                    />
                  <i className="fa fa-address-book"></i>
                  </div>
                </div>
                <div className="d-flex align-items-center">
                  <button type="submit" className="theme-btn">
                    <i className="fa fa-key"></i> Xác nhận
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

export default OtpPage;
