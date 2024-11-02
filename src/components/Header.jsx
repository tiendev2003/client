import { Link } from "react-router-dom";
import Navigation from "./Navigation";

const Header = () => {
  return (
    <header className="header">
      <div className="header-top">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-7">
              <div className="header-top-left">
                <div className="top-social">
                  <a href="#">
                    <i className="fa-brands fa-facebook" />
                  </a>
                  <a href="#">
                    <i className="fa-brands fa-instagram" />
                  </a>
                  <a href="#">
                    <i className="fa-brands fa-google" />
                  </a>
                </div>
                <div className="top-contact-info">
                  <ul>
                    <li>
                      <a href="tel:+21234567897">
                        <i className="fa-solid fa-phone-volume" />
                        +1900 246 357
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <i className="fa-solid fa-envelope" />
                        <span className="__cf_email__">
                          billardbooking@gmail.com
                        </span>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-md-5">
              <div className="header-top-right">
                <div className="lang">
                  <select name="lang" className="select">
                    <option data-display="VN">VN</option>
                    <option value={2}>ENG</option>
                  </select>
                </div>
                <div className="account">
                  <Link to="/dang-nhap">
                    <i className="fa-solid fa-arrow-right-to-bracket" /> Đăng
                    nhập
                  </Link>
                  <Link to="/dang-ky">
                    <i className="fa-solid fa-user-tie" /> Đăng ký
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Navigation />
    </header>
  );
};

export default Header;
