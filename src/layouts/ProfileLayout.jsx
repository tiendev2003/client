import PropTypes from "prop-types";
import { Link, NavLink } from "react-router-dom";
import { Breadcrumb } from "../components";

const ProfileLayout = ({ children }) => {
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
                    <img src="../assets/img//testimonial/04.jpeg" alt="" />
                    <button type="button" className="profile-img-btn">
                      <i className="fa fa-camera"></i>
                    </button>
                    <input type="file" className="profile-img-file" />
                  </div>
                  <h4>Huỳnh Gia Huy</h4>
                  <p>
                    <a href="#" className="__cf_email__">
                      huynhgiahuy@gmail.com
                    </a>
                  </p>
                </div>
                <ul className="user-profile-sidebar-list">
                  <li>
                    <NavLink to="/dashboard" activeClassName="active">
                      <i className="fa fa-gauge-high"></i> Thống kê
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/profile" activeClassName="active">
                      <i className="fa fa-user"></i> Hồ sơ của tôi
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/messages" activeClassName="active">
                      <i className="fa-solid fa-message"></i> Tin nhắn{" "}
                      <span className="badge">05</span>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/bookings" activeClassName="active">
                      <i className="fa fa-shopping-bag"></i> Đặt bàn của tôi
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/booking-history" activeClassName="active">
                      <i className="fa fa-clipboard-list"></i> Lịch sử đặt
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/wishlist" activeClassName="active">
                      <i className="far fa-heart"></i> Danh sách yêu thích
                    </NavLink>
                  </li>

                  <li>
                    <NavLink to="/setting" activeClassName="active">
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
              <div className="user-profile-wrapper">{children}</div>
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
