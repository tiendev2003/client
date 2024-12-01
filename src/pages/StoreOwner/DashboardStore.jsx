import "chart.js/auto";
import { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useDispatch, useSelector } from "react-redux";
import axiosInstance from "../../api/axiosConfig";
import { getBanForStore } from "../../features/banforstore/banForStoreSlice";
import { formatMoney } from "../../utils/formatMoney";

export const DashboardStore = () => {
  const [revenue, setRevenue] = useState({});
  const { banforstores } = useSelector((state) => state.banforstore);
  const [invoices, setInvoices] = useState([]);
  const dispatch = useDispatch();
  const [filteredData, setFilteredData] = useState([]);
  const [filter, setFilter] = useState({ day: "", month: "", year: "" });
  const [filterOrder, setFilterOrder] = useState({
    day: "",
    month: "",
    year: "",
  });
  const [orderData, setOrderData] = useState([]);

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

  useEffect(() => {
    const fetchInvoices = async () => {
      try {
        const response = await axiosInstance.get(`/store/show-all-invoice`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("userToken")}`,
          },
        });
        setInvoices(response.data.invoices);
        return response.data;
      } catch (error) {
        console.log(error);
      }
    };
    fetchInvoices();
  }, []);

  useEffect(() => {
    const fetchOrderData = async () => {
      try {
        const response = await axiosInstance.get(`/store/show-all-order`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("userToken")}`,
          },
        });
        console.log(response.data.order);
        setOrderData(response.data.order);
        return response.data;
      } catch (error) {
        console.log(error);
      }
    };
    fetchOrderData();
  }, []);

  useEffect(() => {
    const filtered = invoices.filter((item) => {
      const date = new Date(item.TGianXuatHoaDon);
      return (
        (filter.day ? date.getDate() === parseInt(filter.day) : true) &&
        (filter.month
          ? date.getMonth() + 1 === parseInt(filter.month)
          : true) &&
        (filter.year ? date.getFullYear() === parseInt(filter.year) : true)
      );
    });

    const aggregatedData = filtered.reduce((acc, item) => {
      const year = new Date(item.TGianXuatHoaDon).getFullYear();
      if (!acc[year]) {
        acc[year] = 0;
      }
      acc[year] += item.TongHD;
      return acc;
    }, {});

    setFilteredData(
      Object.entries(aggregatedData).map(([year, total]) => ({ year, total }))
    );
  }, [filter, invoices]);

  const filteredOrderData = orderData.filter((item) => {
    const date = new Date(item.Created_at);
    return (
      (filterOrder.day ? date.getDate() === parseInt(filterOrder.day) : true) &&
      (filterOrder.month ? date.getMonth() + 1 === parseInt(filterOrder.month) : true) &&
      (filterOrder.year ? date.getFullYear() === parseInt(filterOrder.year) : true)
    );
  });

  const aggregatedOrderData = filteredOrderData.reduce((acc, item) => {
    const date = new Date(item.Created_at).toLocaleDateString();
    if (!acc[date]) {
      acc[date] = 0;
    }
    acc[date] += 1;
    return acc;
  }, {});

  const orderChartData = {
    labels: Object.keys(aggregatedOrderData),
    datasets: [
      {
        label: "Number of Orders",
        data: Object.values(aggregatedOrderData),
        backgroundColor: "rgba(153, 102, 255, 0.6)",
      },
    ],
  };

  const handleYearChange = (date) => {
    setFilter({
      ...filter,
      year: date.getFullYear().toString(),
      month: "",
      day: "",
    });
  };

  const handleMonthChange = (date) => {
    setFilter({ ...filter, month: (date.getMonth() + 1).toString(), day: "" });
  };

  const handleDayChange = (date) => {
    setFilter({ ...filter, day: date.getDate().toString() });
  };
  const handleYearChangeOrder = (date) => {
    setFilterOrder({
      ...filterOrder,
      year: date.getFullYear().toString(),
      month: "",
      day: "",
    });
  };

  const handleMonthChangeOrder = (date) => {
    setFilterOrder({
      ...filterOrder,
      month: (date.getMonth() + 1).toString(),
      day: "",
    });
  };

  const handleDayChangeOrder = (date) => {
    setFilterOrder({ ...filterOrder, day: date.getDate().toString() });
  };

  const chartData = {
    labels: filteredData.map((item) => item.year),
    datasets: [
      {
        label: "Revenue",
        data: filteredData.map((item) => item.total),
        backgroundColor: "rgba(75, 192, 192, 0.6)",
      },
    ],
  };

  return (
    <div className="user-profile-card add-listing">
      <div className="col-lg-12">
        <div className="add-listing-form">
          <div className="row align-items-center">
            <div className="form-group col-lg-4">
              <h3>Tổng doanh thu</h3>
              <p>{formatMoney(revenue.total_revenue)}</p>
            </div>
            <div className="form-group col-lg-4">
              <h3>Tổng hóa đơn</h3>
              <p>{revenue.total_invoices}</p>
            </div>
            <div className="form-group col-lg-4">
              <h3>Tổng số bàn</h3>
              <p>{banforstores.length}</p>
            </div>
          </div>
        </div>
        <div className="row mt-2">
          <div className="col-md-6">
            <h4>Revenue Chart</h4> {/* Added label for revenue chart */}
            <div className="form-group d-flex justify-content-between">
              <div className="me-2">
                <label className="form-label">
                  Year:
                  <DatePicker
                    selected={filter.year ? new Date(filter.year, 0) : null}
                    onChange={handleYearChange}
                    showYearPicker
                    dateFormat="yyyy"
                    placeholderText="Select a year"
                    className="form-control"
                  />
                </label>
              </div>
              <div className="me-2">
                <label className="form-label">
                  Month:
                  <DatePicker
                    selected={
                      filter.month
                        ? new Date(filter.year, filter.month - 1)
                        : null
                    }
                    onChange={handleMonthChange}
                    showMonthYearPicker
                    dateFormat="MM/yyyy"
                    placeholderText="Select a month"
                    className="form-control"
                    disabled={!filter.year}
                  />
                </label>
              </div>
              <div>
                <label className="form-label">
                  Day:
                  <DatePicker
                    selected={
                      filter.day
                        ? new Date(filter.year, filter.month - 1, filter.day)
                        : null
                    }
                    onChange={handleDayChange}
                    dateFormat="dd/MM/yyyy"
                    placeholderText="Select a day"
                    className="form-control"
                    disabled={!filter.month}
                  />
                </label>
              </div>
            </div>
            <Bar data={chartData} />
          </div>
          <div className="col-md-6">
            <h4>Order Chart</h4> {/* Added label for order chart */}
            <div className="form-group d-flex justify-content-between">
              <div className="me-2">
                <label className="form-label">
                  Year:
                  <DatePicker
                    selected={filterOrder.year ? new Date(filterOrder.year, 0) : null}
                    onChange={handleYearChangeOrder}
                    showYearPicker
                    dateFormat="yyyy"
                    placeholderText="Select a year"
                    className="form-control"
                  />
                </label>
              </div>
              <div className="me-2">
                <label className="form-label">
                  Month:
                  <DatePicker
                    selected={
                      filterOrder.month
                        ? new Date(filterOrder.year, filterOrder.month - 1)
                        : null
                    }
                    onChange={handleMonthChangeOrder}
                    showMonthYearPicker
                    dateFormat="MM/yyyy"
                    placeholderText="Select a month"
                    className="form-control"
                    disabled={!filterOrder.year}
                  />
                </label>
              </div>
              <div>
                <label className="form-label">
                  Day:
                  <DatePicker
                    selected={
                      filterOrder.day
                        ? new Date(filterOrder.year, filterOrder.month - 1, filterOrder.day)
                        : null
                    }
                    onChange={handleDayChangeOrder}
                    dateFormat="dd/MM/yyyy"
                    placeholderText="Select a day"
                    className="form-control"
                    disabled={!filterOrder.month}
                  />
                </label>
              </div>
            </div>
            <Bar data={orderChartData} />
          </div>
        </div>
      </div>
    </div>
  );
};
