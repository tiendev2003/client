import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const OAuthRoute = () => {
  const [useSearchParams] = useSearchParams();
  const token = useSearchParams.get("token");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
      navigate("/");
    }
    setLoading(false);
  }, [token, navigate]);
  return <div>{loading && "Loading..."}</div>;
};

export default OAuthRoute;
