import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { changePassword, updateUserInfo } from "../../features/user/userSlice";
 
const ProfileSettingPage = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const [userData, setUserData] = useState({
    TenTaiKhoan: userInfo.TenTaiKhoan || "",
    TenNguoiDung: userInfo.TenNguoiDung,
    Email: userInfo.Email,
    SDT: userInfo.SDT,
  });
  const dispatch = useDispatch();

  const [passwordData, setPasswordData] = useState({
    old_password: "",
    new_password: "",
  });

  const handleUserChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleUserSubmit = (e) => {
    console.log(userData);
    e.preventDefault();
    dispatch(updateUserInfo(userData))
      .unwrap()
      .then(() => {
        toast.success("User information updated successfully");
      })
      .catch((err) => {
        toast.error(err.message || "Failed to update user information");
      });
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    dispatch(changePassword(passwordData))
      .unwrap()
      .then(() => {
        toast.success("Password changed successfully");
      })
      .catch((err) => {
        toast.error(err.message || "Failed to change password");
      });
  };
  return (
    <>
      <div className="col-lg-12 mb-4">
        <div className="user-profile-card">
          <h4 className="user-profile-card-title">Cập nhật thông tin người dùng</h4>
          <div className="user-profile-form">
            <form onSubmit={handleUserSubmit}>
              <div className="row">
                <div className="col-md-6">
                  <div className="form-group">
                    <label>Tên tài khoản</label>
                    <input
                      type="text"
                      className="form-control"
                      name="TenTaiKhoan"
                      value={userData.TenTaiKhoan}
                      onChange={handleUserChange}
                      placeholder="First Name"
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label>Tên người dùng</label>
                    <input
                      type="text"
                      className="form-control"
                      value={userData.TenNguoiDung}
                      onChange={handleUserChange}
                      name="TenNguoiDung"
                      placeholder="Last Name"
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label>Email</label>
                    <input
                      type="text"
                      className="form-control"
                      name="Email"
                      value={userData.Email}
                      onChange={handleUserChange}
                      placeholder="Email"
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label>Số điện thoại</label>
                    <input
                      type="text"
                      className="form-control"
                      value={userData.SDT}
                      onChange={handleUserChange}
                      placeholder="Phone"
                      name="SDT"
                    />
                  </div>
                </div>
              </div>
              <button type="submit" className="theme-btn mt-4">
                Cập nhật thông tin<i className="far fa-user"></i>
              </button>
            </form>
          </div>
        </div>
      </div>
      <div className="col-lg-12">
        <div className="user-profile-card">
          <h4 className="user-profile-card-title">Thay đổi mật khẩu</h4>
          <div className="col-lg-12">
            <div className="user-profile-form">
              <form onSubmit={handlePasswordSubmit}>
                <div className="form-group">
                  <label>Mật khẩu cũ</label>
                  <input
                    type="password"
                    className="form-control"
                    placeholder="********"
                    name="old_password"
                    value={passwordData.old_password}
                    onChange={handlePasswordChange}
                  />
                </div>
                <div className="form-group">
                  <label>Mật khẩu mới</label>
                  <input
                    type="password"
                    className="form-control"
                   placeholder="********"
                    value={passwordData.new_password}
                    onChange={handlePasswordChange}
                    name="new_password"
                  />
                </div>
                <div className="form-group">
                  <label>Nhập lại mật khẩu</label>
                  <input
                    type="password"
                    className="form-control"
                 placeholder="********"
                    name="confirm_password"
                    value={passwordData.confirm_password}
                    onChange={handlePasswordChange}
                  />
                </div>
                <button type="submit" className="theme-btn mt-4">
                  Thay đổi <i className="fa fa-key"></i>
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfileSettingPage;
