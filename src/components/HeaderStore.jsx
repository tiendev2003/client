import PropTypes from "prop-types";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import image from "../assets/img/logo/logo-dark.png";
import { useGetUserDetailsQuery } from "../features/auth/authServices";
import { setCredentials } from "../features/auth/authSlice";

export const HeaderStore = ({ toggleSidebar }) => {
  const { userInfo } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const { data, isFetching } = useGetUserDetailsQuery("userDetails", {
    pollingInterval: 900000, // 15mins
  });

  useEffect(() => {
    if (data) dispatch(setCredentials(data));
  }, [data, dispatch]);
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

HeaderStore.propTypes = {
  toggleSidebar: PropTypes.func,
};
