import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axiosClient from "../../api/axiosClient";
import OverviewChart from "./OverviewChart";

const DashboardAdmin = () => {
  const [statisticsPerStore, setStatisticsPerStore] = useState([]);
  useEffect(() => {
    const fetchStatisticsPerStore = async () => {
      try {
        const response = await axiosClient.get(
          "/numberOfInvoice-admin/getAll",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("userToken")}`,
            },
          }
        );
        setStatisticsPerStore(response.data.data.statistics_per_store);
      } catch (error) {
        toast.error(error.message || "Đã xảy ra lỗi");
      }
    };
    fetchStatisticsPerStore();
  }, []);

  return (
    <div className="App">
      <h1>Tổng Quan Doanh Thu và Hóa Đơn của Cửa Hàng</h1>
      <OverviewChart statisticsPerStore={statisticsPerStore} />
    </div>
  );
};

export default DashboardAdmin;
