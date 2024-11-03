import PropTypes from "prop-types";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { LoadingSpinner } from "../components";
import { useGetUserDetailsQuery } from "../features/auth/authServices";
import { setCredentials } from "../features/auth/authSlice";

const ProtectedRoute = ({ allowedRoles }) => {
  const { userInfo } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  // automatically authenticate user if token is found
  const { data, isFetching } = useGetUserDetailsQuery("userDetails", {
    pollingInterval: 900000, // 15mins
  });

  useEffect(() => {
    if (data) dispatch(setCredentials(data));
  }, [data, dispatch]);

  if (isFetching) {
    return <LoadingSpinner />;
  }
  if (!userInfo) {
    return <Navigate to="/dang-nhap" />;
  }
  if (!allowedRoles.includes(userInfo.id_QuyenTK)) {
    return <Navigate to="/" />;
  }

  return <Outlet />;
};
ProtectedRoute.propTypes = {
  allowedRoles: PropTypes.arrayOf(PropTypes.number).isRequired,
};

export default ProtectedRoute;
