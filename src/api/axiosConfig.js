import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:8000/api",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Thêm interceptor cho request
axiosInstance.interceptors.request.use(
  (config) => {
    // Kiểm tra xem request có flag `noAuth` không
    if (!config.noAuth) {
       const token = localStorage.getItem("userToken");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      window.location.href = "/dang-nhap";
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
