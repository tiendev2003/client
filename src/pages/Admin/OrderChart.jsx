import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Title,
  Tooltip,
} from "chart.js";
import React, { useState } from "react";
import { Bar } from "react-chartjs-2";

// Đăng ký các component của Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

// Lấy danh sách cửa hàng từ các khóa trong đối tượng invoices

const StoreSelector = ({ stores, onSelectStore }) => {
  return (
    <select
      onChange={(e) => onSelectStore(e.target.value)}
      className="form-control"
    >
      <option value="">Chọn cửa hàng</option>
      {stores.map((store) => (
        <option key={store} value={store}>
          {store}
        </option>
      ))}
    </select>
  );
};

const calculateHoursPlayed = (invoices) => {
  return invoices.map((invoice) => {
    const timePlayed = invoice.HoaDonCT[0].SoGioChoi;
    const hours = parseInt(timePlayed.split(" ")[0]);
    const minutes = parseInt(timePlayed.split(" ")[2]);
    return hours + minutes / 60;
  });
};

const RevenueChart = ({ invoices }) => {
  const labels = invoices.map((invoice) => invoice.HoaDonCT[0].TenBan);
  const data = invoices.map((invoice) => invoice.TongHD);

  const chartData = {
    labels,
    datasets: [
      {
        label: "Doanh thu theo bàn",
        data,
        backgroundColor: "rgba(75, 192, 192, 0.6)", // Màu nền của các cột
        borderColor: "rgba(75, 192, 192, 1)", // Màu viền của các cột
        borderWidth: 1,
      },
    ],
  };

  return (
    <Bar
      data={chartData}
      options={{
        responsive: true,
        plugins: {
          legend: { position: "top" },
          title: { display: true, text: "Doanh thu theo bàn" },
        },
      }}
    />
  );
};

const HourChart = ({ invoices }) => {
  const labels = invoices.map((invoice) => invoice.HoaDonCT[0].TenBan);
  const hours = calculateHoursPlayed(invoices);

  const chartData = {
    labels,
    datasets: [
      {
        label: "Số giờ chơi theo bàn",
        data: hours,
        backgroundColor: "rgba(153, 102, 255, 0.6)", // Màu nền của các cột
        borderColor: "rgba(153, 102, 255, 1)", // Màu viền của các cột
        borderWidth: 1,
      },
    ],
  };

  return (
    <Bar
      data={chartData}
      options={{
        responsive: true,
        plugins: {
          legend: { position: "top" },
          title: { display: true, text: "Số giờ chơi theo bàn" },
        },
      }}
    />
  );
};

const OrderChart = ({ invoices }) => {
  console.log(invoices);
  const [selectedStore, setSelectedStore] = useState("");
  const [filteredInvoices, setFilteredInvoices] = useState([]);
  const stores = Object.keys(invoices ?? {});

  const handleStoreSelect = (store) => {
    setSelectedStore(store);
    if (store) {
      setFilteredInvoices(invoices[store]);
    } else {
      setFilteredInvoices([]);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <div className="d-flex gap-3  ">
        <h3
          style={{
            minWidth: "200px",
          }}
        >
          Thống kê theo{" "}
        </h3>
        <StoreSelector stores={stores} onSelectStore={handleStoreSelect} />
      </div>

      {selectedStore && (
        <>
          <div className="row">
            <div className="col-md-6">
              <RevenueChart invoices={filteredInvoices} />
            </div>
            <div className="col-md-6">
              <HourChart invoices={filteredInvoices} />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default OrderChart;
