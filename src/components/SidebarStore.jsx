import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../features/auth/authSlice";

export const SidebarStore = ({ isOpen }) => {
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.auth);

  return (
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
          <Link to="/store">
            <i className="fa fa-gauge-high"></i> Báo cáo &amp; Thống kê{" "}
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
            <i className="fa-solid fa-table"></i> Quản lý bàn billiard
            <i className="fa-solid fa-caret-down profile-menu-angle"></i>
          </a>
          <div className="collapse" id="profile-menu-1">
            <ul className="profile-menu-list">
              <li>
                <Link to="/store/manage-tables/create">Thêm bàn</Link>
              </li>
              <li>
                <Link to="/store/manage-tables">Danh sách bàn</Link>
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
            className="collapsed"
          >
            <i className="fa-solid fa-table"></i> Quản lý dịch vụ
            <i className="fa-solid fa-caret-down profile-menu-angle"></i>
          </a>
          <div className="collapse" id="profile-menu-2">
            <ul className="profile-menu-list">
              <li>
                <Link to="/store/manage-services/create">Thêm dịch vụ</Link>
              </li>
              <li>
                <Link to="/store/manage-services">Danh sách dịch vụ</Link>
              </li>
            </ul>
          </div>
        </li>

        <li>
          <Link to="/store/promotions-statistics">
            <i className="fa-solid fa-tags"></i> Quản lý chương trình khuyến mãi
            và thống kê
          </Link>
        </li>
        <li>
          <Link to="/store/payments-invoices">
            <i className="fa-solid fa-file-invoice-dollar"></i> Quản lý thanh
            toán và hóa đơn
          </Link>
        </li>
        <li>
          <Link to="/store/setting">
            <i className="fa fa-cog"></i> Cài đặt
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
  );
};

SidebarStore.propTypes = {
  isOpen: PropTypes.bool,
};
