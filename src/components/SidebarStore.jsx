import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../features/auth/authSlice";

export const SidebarStore = ({ isOpen }) => {
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.auth);

  return (
    <aside
      className={`sidebar dash-sidebar ${isOpen ? "open" : "closed"}`}
      style={{
        paddingBottom: "100px",
      }}
    >
      <div className="dash-sidebar-top">
        <div className="dash-img">
          <img
            src={userInfo.AnhDaiDien_NguoiDung || "/img/account/user.jpg"}
            alt=""
          />
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
        
        <li>
          <Link to="/store/order/view">
            <i className="fa fa-gauge-high"></i> Quản lý bàn trạng thái
           </Link>
        </li>
        <li>
          <Link to="/store/order">
            <i className="fa fa-gauge-high"></i> Đơn đặt bàn
          </Link>
        </li>
        <li>
          <Link to="/store/invoice">
            <i className="fas fa-file-invoice"></i> Hóa đơn
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
            href="#profile-menu-7"
            data-bs-toggle="collapse"
            aria-expanded="true"
            aria-controls="profile-menu-7"
            className="collapsed"
          >
            <i className="fa-solid fa-tags"></i> Quản lý danh mục bàn
            <i className="fa-solid fa-caret-down profile-menu-angle"></i>
          </a>
          <div className="collapse" id="profile-menu-7">
            <ul className="profile-menu-list">
              <li>
                <Link to="/store/manage-category-table/create">
                  Thêm danh mục bàn
                </Link>
              </li>
              <li>
                <Link to="/store/manage-category-table">
                  Danh sách danh mục bàn
                </Link>
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
            <i className="fa-solid fa-bell-concierge"></i> Quản lý dịch vụ
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
        <li className="profile-menu">
          <a
            href="#profile-menu-3"
            data-bs-toggle="collapse"
            aria-expanded="true"
            aria-controls="profile-menu-3"
            className="collapsed"
          >
            <i className="fa-solid fa-box"></i> Quản lý sản phẩm
            <i className="fa-solid fa-caret-down profile-menu-angle"></i>
          </a>
          <div className="collapse" id="profile-menu-3">
            <ul className="profile-menu-list">
              <li>
                <Link to="/store/manage-sanpham/create">Thêm sản phẩm</Link>
              </li>
              <li>
                <Link to="/store/manage-sanpham">Danh sách sản phẩm</Link>
              </li>
            </ul>
          </div>
        </li>
        <li className="profile-menu">
          <a
            href="#profile-menu-6"
            data-bs-toggle="collapse"
            aria-expanded="true"
            aria-controls="profile-menu-6"
            className="collapsed"
          >
            <i className="fa-solid fa-tags"></i> Quản lý danh mục sản phẩm
            <i className="fa-solid fa-caret-down profile-menu-angle"></i>
          </a>
          <div className="collapse" id="profile-menu-6">
            <ul className="profile-menu-list">
              <li>
                <Link to="/store/manage-category-sanpham/create">
                  Thêm danh mục sản phẩm
                </Link>
              </li>
              <li>
                <Link to="/store/manage-category-sanpham">
                  Danh sách danh mục sản phẩm
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
            <i className="fa-solid fa-tags"></i> Quản lý danh mục khuyến mãi
            <i className="fa-solid fa-caret-down profile-menu-angle"></i>
          </a>
          <div className="collapse" id="profile-menu-4">
            <ul className="profile-menu-list">
              <li>
                <Link to="/store/manage-category-ctkm/create">
                  Thêm danh mục km
                </Link>
              </li>
              <li>
                <Link to="/store/manage-category-ctkm">
                  Danh sách danh mục km
                </Link>
              </li>
            </ul>
          </div>
        </li>
        <li className="profile-menu">
          <a
            href="#profile-menu-5"
            data-bs-toggle="collapse"
            aria-expanded="true"
            aria-controls="profile-menu-5"
            className="collapsed"
          >
            <i className="fa-solid fa-percent"></i> Quản lý khuyến mãi
            <i className="fa-solid fa-caret-down profile-menu-angle"></i>
          </a>
          <div className="collapse" id="profile-menu-5">
            <ul className="profile-menu-list">
              <li>
                <Link to="/store/manage-ctkm/create">Thêm khuyến mãi</Link>
              </li>
              <li>
                <Link to="/store/manage-ctkm">Danh sách khuyến mãi</Link>
              </li>
            </ul>
          </div>
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
