import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axiosClient from "../../api/axiosClient";
import OrderChart from "./OrderChart";
import OverviewChart from "./OverviewChart";

const DashboardAdmin = () => {
  const [statisticsPerStore, setStatisticsPerStore] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const [invoices, setInvoices] = useState([]);
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
        console.log(response.data.data.statistics_per_store);
        setStatisticsPerStore(response.data.data.statistics_per_store);
      } catch (error) {
        toast.error(error.message || "Đã xảy ra lỗi");
      }
    };
    fetchStatisticsPerStore();
  }, []);
  useEffect(() => {
    const fetchAllUsers = async () => {
      try {
        const response = await axiosClient.get("/admin/show-all-user", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("userToken")}`,
          },
        });
        setAllUsers(response.data.UserActive);
      } catch (error) {
        toast.error(error.message || "Đã xảy ra lỗi");
      }
    };
    fetchAllUsers();
  }, []);
  useEffect(() => {
    const fetchInvoices = async () => {
      try {
        const response = await axiosClient.get("/admin/show-all-invoice", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("userToken")}`,
          },
        });
        console.log(response.data.invoices);
        setInvoices(response.data.invoices);
      } catch (error) {
        toast.error(error.message || "Đã xảy ra lỗi");
      }
    };
    fetchInvoices();
  }, []);

  const calculateTotalRevenue = (invoices) => {
    let totalRevenue = Object.keys(invoices).map((store) => {
      const revenue = invoices[store].reduce(
        (acc, invoice) => acc + invoice.TongHD,
        0
      );
      return { store, revenue };
    });
    totalRevenue = totalRevenue.reduce((sum, store) => sum + store.revenue, 0);

    return totalRevenue;
  };
  const calculateTotalOrders = (invoices) => {
    const totalInvoicesCount = Object.values(invoices).reduce(
      (count, storeInvoices) => {
        return count + storeInvoices.length; // Cộng dồn số lượng hóa đơn của mỗi cửa hàng
      },
      0
    );
    return totalInvoicesCount;
  };

  return (
    <div className="user-profile-card add-listing">
      <div className="col-lg-12">
        <div className="add-listing-form">
          <div className="row align-items-center">
            <div className="form-group col-lg-4">
              <div
                style={{
                  width: "100%",
                  height: "100px",
                  backgroundColor: "white",
                  margin: "20px 0",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  textAlign: "center",
                  boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
                }}
              >
                 <h3>Tổng hóa đơn</h3>
                <h3>{calculateTotalOrders(invoices) }</h3>
              </div>
            </div>
            <div className="form-group col-lg-4">
              <div
                style={{
                  width: "100%",
                  height: "100px",
                  backgroundColor: "white",
                  margin: "20px 0",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  textAlign: "center",
                  boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
                }}
              >
                {" "}
                <h3>Tổng doanh thu</h3>
                <h3>{calculateTotalRevenue(invoices)}</h3>
              </div>
            </div>
            <div className="form-group col-lg-4">
              <div
                style={{
                  width: "100%",
                  height: "100px",
                  backgroundColor: "white",
                  margin: "20px 0",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  textAlign: "center",
                  boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
                }}
              >
                {" "}
                <h3>Tổng số người dùng</h3>
                <h3>{allUsers.length} </h3>
              </div>
            </div>
          </div>
        </div>
        <div className="row mt-3">
          <div className="col-md-12" style={{
           
          }}>
            <OverviewChart statisticsPerStore={statisticsPerStore} />
          </div>
          <div className="col-md-12 my-3">
            <OrderChart invoices={invoices} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardAdmin;
