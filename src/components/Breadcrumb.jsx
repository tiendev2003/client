import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const Breadcrumb = ({ title, items }) => {
  return (
    <div
      className="site-breadcrumb"
      style={{ backgroundImage: "url(assets/images/breadcrumb-bg.jpg)" }}
    >
      <div className="container">
        <h2 className="breadcrumb-title">{title}</h2>
        <ul className="breadcrumb-menu">
          <li>
            <Link to={`/`}>Trang chủ</Link>
          </li>
          <li className="active">{items}</li>
        </ul>
      </div>
    </div>
  );
};
Breadcrumb.propTypes = {
  title: PropTypes.string.isRequired,
  items: PropTypes.string.isRequired,
};

export default Breadcrumb;
