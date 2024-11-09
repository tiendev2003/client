// Navigation.js
import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import logoDark from "../assets/img/logo/logo-dark.png";
import logo from "../assets/img/logo/logo.png";
import { logout } from "../features/auth/authSlice.js";
import { handleScroll } from "../utils/script.js";
const Navigation = () => {
  const navbarRef = useRef(null);
  const { userInfo } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    const onScroll = () => handleScroll(navbarRef);

    window.addEventListener("scroll", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <div className="main-navigation">
      <nav className="navbar navbar-expand-lg" ref={navbarRef}>
        <div className="container">
          <Link className="navbar-brand" to="/">
            <img src={logo} className="logo-display" alt="logo" />
            <img src={logoDark} className="logo-scrolled" alt="logo" />
          </Link>
          <div className="mobile-menu-right">
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#main_nav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-btn-icon">
                <i className="fa fa-bars" />
              </span>
            </button>
          </div>
          <div className="collapse navbar-collapse" id="main_nav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link className="nav-link active" to="/">
                  Trang chủ
                </Link>
              </li>
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  to="#"
                  data-bs-toggle="dropdown"
                >
                  Danh sách quán
                </a>
                <ul className="dropdown-menu fade-down">
                  <li>
                    <Link className="dropdown-item" to="/billiard?badge=">
                      Tất cả
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="dropdown-item"
                      to="/billiard?badge=Quán mới"
                    >
                      Quán mới
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="dropdown-item"
                      to="/billiard?badge=Nổi bật"
                    >
                      Quán hot
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="dropdown-item"
                      to="/billiard?badge=Đang khuyến mãi"
                    >
                      Khuyến mãi
                    </Link>
                  </li>
                </ul>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="#">
                  Đối tác
                </Link>
              </li>
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  to="#"
                  data-bs-toggle="dropdown"
                >
                  Hỗ trợ
                </a>
                <ul className="dropdown-menu fade-down">
                  <li>
                    <Link className="dropdown-item" to="#">
                      Khách hàng
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="#">
                      Lịch đặt bàn
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="#">
                      Tuyển dụng
                    </Link>
                  </li>
                </ul>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/lien-he">
                  Liên hệ
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/gioi-thieu">
                  Giới thiệu
                </Link>
              </li>
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  to="#"
                  data-bs-toggle="dropdown"
                >
                  Chính sách
                </a>
                <ul className="dropdown-menu fade-down">
                  <li>
                    <Link className="dropdown-item" to="/chinh-sach-bao-mat">
                      Chính sách khách hàng
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/dieu-khoan-su-dung">
                      Chính sách bảo mật
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="#">
                      Tuyển dụng
                    </Link>
                  </li>
                </ul>
              </li>
            </ul>
            <div className="header-nav-right">
              {userInfo ? (
                <div className="header-account">
                  <div className="dropdown">
                    <div
                      data-bs-toggle="dropdown"
                      aria-expanded="true"
                      className=""
                    >
                      <img
                        src={
                          userInfo.AnhDaiDien_NguoiDung ||
                          "/img/account/user.jpg"
                        }
                        alt=""
                      />
                    </div>
                    <ul
                      className="dropdown-menu dropdown-menu-end  "
                      data-bs-popper="static"
                    >
                      <li>
                        <Link
                          className="dropdown-item"
                          to={`${
                            userInfo.id_QuyenTK == 2
                              ? "/store"
                              : userInfo.id_QuyenTK == 1
                              ? "/admin/dashboard"
                              : "/dashboard"
                          } `}
                        >
                          <i className="fa fa-gauge-high"></i> Dashboard
                        </Link>
                      </li>
                      <li>
                        <Link className="dropdown-item" to="/profile">
                          <i className="far fa-user"></i> My Profile
                        </Link>
                      </li>
                      <li>
                        <Link className="dropdown-item" to="/bookings">
                          <i className="fa fa-shopping-bag"></i> My Booking
                        </Link>
                      </li>

                      <li>
                        <Link className="dropdown-item" to="/setting">
                          <i className="fa fa-cog"></i> Settings
                        </Link>
                      </li>
                      <li>
                        <Link
                          className="dropdown-item"
                          to="#"
                          onClick={() => dispatch(logout())}
                        >
                          <i className="fa fa-sign-out"></i> Log Out
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
              ) : (
                <div className="header-btn">
                  <Link to={"/dang-ky"} className="theme-btn mt-2">
                    Đăng ký ngay
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navigation;
