import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../features/auth/authSlice";

export const SidebarAdmin = ({ isOpen }) => {
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.auth);

  return (
    <>
      <aside className={`sidebar dash-sidebar ${isOpen ? "open" : "closed"}`}>
        <div className="dash-sidebar-top">
          <div className="dash-img">
            <img src={userInfo.AnhDaiDien_NguoiDung} alt="" />
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
        <ul className="dash-sidebar-list">
          <li>
            <Link to="/admin" className="active">
              <i className="fa fa-gauge-high"></i> Báo cáo &amp; Thống kê
            </Link>
          </li>

          <li className="profile-menu">
            <a
              href="#profile-menu-1"
              data-bs-toggle="collapse"
              aria-expanded="true"
              aria-controls="profile-menu-1"
              className="collapsed"
            >
              <i className="fa-solid fa-users"></i> Quản lí tài khoản{" "}
              <i className="fa-solid fa-caret-down profile-menu-angle"></i>
            </a>
            <div className="collapse" id="profile-menu-1">
              <ul className="profile-menu-list">
                <li>
                  <Link to="/admin/user-management/create">Tạo tài khoản</Link>
                </li>
                <li>
                  <Link to="/admin/user-management">Danh sách tài khoản</Link>
                </li>
              </ul>
            </div>
          </li>
          <li className="profile-menu">
            <a
              href="#profile-menu-2"
              data-bs-toggle="collapse"
              aria-expanded="true"
              aria-controls="profile-menu-2"
            >
              <i className="fa-solid fa-shop"></i> Quản lí cửa hàng
              <i className="fa-solid fa-caret-down profile-menu-angle"></i>
            </a>
            <div className="collapse show" id="profile-menu-2">
              <ul className="profile-menu-list">
                <li>
                  <Link to="/admin/store-management/create">Thêm cửa hàng</Link>
                </li>
                <li>
                  <Link to="/admin/store-management">
                    Phê duyệt cửa hàng mới
                  </Link>
                </li>
              </ul>
            </div>
          </li>

          <li>
            <Link to="/admin/content-management">
              <i className="fa fa-file-alt"></i> Quản lý nội dung
            </Link>
          </li>
          <li>
            <Link to="/admin/system-configuration">
              <i className="fa fa-cog"></i> Cấu hình hệ thống
            </Link>
          </li>

          <li>
            <a
              href="#"
              onClick={() => {
                dispatch(logout());
                //  reload lại trang
                window.location.reload();
              }}
            >
              <i className="fa fa-sign-out"></i> Đăng xuất
            </a>
          </li>
        </ul>
      </aside>
    </>
  );
};

SidebarAdmin.propTypes = {
  isOpen: PropTypes.bool,
};
