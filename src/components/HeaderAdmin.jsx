import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import image from "../assets/img/logo/logo-dark.png";
export const HeaderAdmin = ({ toggleSidebar }) => {
  return (
    <header className="header-admin fixed-top d-flex align-items-center    ">
      <Link to="/" className="logo-admin">
        <img src={image} alt="" />
      </Link>

      <i
        className="fa-solid fa-bars mt-2"
        style={{
          margin: "10px",
        }}
        onClick={toggleSidebar}
      ></i>
    </header>
  );
};

HeaderAdmin.propTypes = {
  toggleSidebar: PropTypes.func.isRequired,
};
