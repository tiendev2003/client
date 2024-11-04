import PropTypes from "prop-types";
import { Link, NavLink, Outlet } from "react-router-dom";
import { Breadcrumb } from "../components";
import { useSelector } from "react-redux";

const ProfileLayout = () => {
  const {userInfo} = useSelector((state) => state.auth);
  return (
    <>
      <Breadcrumb title="Hồ sơ của tôi" items="Hồ sơ của tôi" />
      <div className="user-profile py-120">
        <div className="container">
          <div className="row">
            <div className="col-lg-3">
              <div className="user-profile-sidebar">
                <div className="user-profile-sidebar-top">
                  <div className="user-profile-img">
                    <img src={userInfo.AnhDaiDien_NguoiDung ||   "/img/account/user.jpg"} alt="" />
                    <button type="button" className="profile-img-btn">
                      <i className="fa fa-camera"></i>
                    </button>
                    <input type="file" className="profile-img-file" />
                  </div>
                  <h4>{userInfo.TenNguoiDung}</h4>
                  <p>
                    <a href="#" className="__cf_email__">
                      {userInfo.Email}
                    </a>
                  </p>
                </div>
                <ul className="user-profile-sidebar-list">
                  <li>
                    <NavLink
                      to="/dashboard"
                      className={({ isActive }) => (isActive ? "active" : "")}
                    >
                      <i className="fa fa-gauge-high"></i> Thống kê
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/profile"
                      className={({ isActive }) => (isActive ? "active" : "")}
                    >
                      <i className="fa fa-user"></i> Hồ sơ của tôi
                    </NavLink>
                  </li>

                  <li>
                    <NavLink
                      to="/bookings"
                      className={({ isActive }) => (isActive ? "active" : "")}
                    >
                      <i className="fa fa-shopping-bag"></i> Đặt bàn của tôi
                    </NavLink>
                  </li>

                  <li>
                    <NavLink
                      to="/setting"
                      className={({ isActive }) => (isActive ? "active" : "")}
                    >
                      <i className="fa fa-cog"></i> Cài đặt
                    </NavLink>
                  </li>
                  <li>
                    <Link to="#">
                      <i className="fa fa-sign-out"></i> Đăng xuất
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-lg-9">
              <div className="user-profile-wrapper">
                <Outlet />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
ProfileLayout.propTypes = {
  children: PropTypes.node,
};

export default ProfileLayout;
