import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axiosInstance from "../../api/axiosConfig";
import { getBanForStore } from "../../features/banforstore/banForStoreSlice";
import { formatMoney } from "../../utils/formatMoney";

export const DashboardStore = () => {
  const [revenue, setRevenue] = useState({});
  const { banforstores } = useSelector((state) => state.banforstore);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getBanForStore(1));
  }, [dispatch]);
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axiosInstance.get(`/getRevenue-cuahang`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("userToken")}`,
          },
        });
        setRevenue(response.data.data);
        return response.data;
      } catch (error) {
        console.log(error);
      }
    };
    fetchOrders();
  }, []);
  console.log(banforstores);
  return (
    <div className="user-profile-card add-listing">
      <div className="col-lg-12">
        <div className="add-listing-form  ">
          <div className="row align-items-center">
            <div className="form-group col-lg-4  ">
              <h3>Tổng doanh thu</h3>
              <p>{formatMoney(revenue.total_revenue)}</p>
            </div>
            <div className="form-group col-lg-4 ">
              <h3>Tổng hóa đơn</h3>
              <p>{revenue.total_invoices}</p>
            </div>
            <div className="form-group col-lg-4">
              <h3>Tổng số bàn</h3>
              <p>{banforstores.length}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
