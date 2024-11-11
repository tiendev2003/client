import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { logout } from "../features/auth/authSlice";

export const SidebarAdmin = ({ isOpen }) => {
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.auth);
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path;
  };
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
            <Link
              to="/admin/dashboard"
              className={isActive("/admin/dashboard") ? "active" : ""}
            >
              <i className="fa fa-gauge-high"></i> Báo cáo &amp; Thống kê
            </Link>
          </li>
          <li>
            <Link
              to="/admin/management-user"
              className={isActive("/admin/management-user") ? "active" : ""}
            >
              <i className="fa fa-users"></i> Quản lí tài khoản
            </Link>
          </li>
          

          <li className="profile-menu">
            <a
              href="#profile-menu-2"
              data-bs-toggle="collapse"
              aria-expanded="true"
              aria-controls="profile-menu-2"
              className="collapsed"
            >
              <i className="fa-solid fa-shop"></i> Quản lí cửa hàng
              <i className="fa-solid fa-caret-down profile-menu-angle"></i>
            </a>
            <div className="collapse  " id="profile-menu-2">
              <ul className="profile-menu-list">
                <li>
                  <Link
                    to="/admin/management-store/create"
                    className={
                      isActive("/admin/management-store/create") ? "active" : ""
                    }
                  >
                    Thêm cửa hàng
                  </Link>
                </li>
                <li>
                  <Link
                    to="/admin/management-store"
                    className={
                      isActive("/admin/management-store") ? "active" : ""
                    }
                  >
                    Phê duyệt cửa hàng mới
                  </Link>
                </li>
              </ul>
            </div>
          </li>

          <li className="profile-menu">
            <a
              href="#profile-menu-3"
              data-bs-toggle="collapse"
              aria-expanded="true"
              aria-controls="profile-menu-3"
              className="collapsed"
            >
              <i className="fa-solid fa-shop"></i> Quản lí quyền
              <i className="fa-solid fa-caret-down profile-menu-angle"></i>
            </a>
            <div className="collapse" id="profile-menu-3">
              <ul className="profile-menu-list">
                <li>
                  <Link
                    to="/admin/management-role/create"
                    className={
                      isActive("/admin/management-role/create") ? "active" : ""
                    }
                  >
                    Thêm quyền
                  </Link>
                </li>
                <li>
                  <Link
                    to="/admin/management-role"
                    className={
                      isActive("/admin/management-role") ? "active" : ""
                    }
                  >
                    Danh sách quyền
                  </Link>
                </li>
              </ul>
            </div>
          </li>
          <li className="profile-menu">
            <a
              href="#profile-menu-4"
              data-bs-toggle="collapse"
              aria-expanded="true"
              aria-controls="profile-menu-4"
              className="collapsed"
            >
              <i className="fa-solid fa-images"></i> Quản lí danh mục ảnh
              <i className="fa-solid fa-caret-down profile-menu-angle"></i>
            </a>
            <div className="collapse" id="profile-menu-4">
              <ul className="profile-menu-list">
                <li>
                  <Link
                    to="/admin/management-dma/create"
                    className={
                      isActive("/admin/management-dma/create") ? "active" : ""
                    }
                  >
                    Thêm danh mục
                  </Link>
                </li>
                <li>
                  <Link
                    to="/admin/management-dma"
                    className={
                      isActive("/admin/management-dma") ? "active" : ""
                    }
                  >
                    Danh sách danh mục ảnh
                  </Link>
                </li>
              </ul>
            </div>
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
