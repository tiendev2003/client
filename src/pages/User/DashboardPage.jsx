import {
  ArcElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Title,
  Tooltip,
} from "chart.js";
import { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import { toast } from "react-toastify";
import axiosClient from "../../api/axiosClient";
import OrderChatForUser from "./OrderChartForUser";

// Đăng ký các thành phần của Chart.js
ChartJS.register(
  Title,
  Tooltip,
  Legend,
  ArcElement,
  CategoryScale,
  LinearScale
);
const data = {
  "Billiards Đà Nẵng": [{ TrangThai: 3 }, { TrangThai: 3 }],
  "Billiards Sài Gòn": [{ TrangThai: 1 }],
  "Billiards Hải Phòng": [{ TrangThai: 1 }],
};

const countOrdersPerStore = (data) => {
  const storeCounts = {};
  for (let store in data) {
    storeCounts[store] = data[store].length; // Đếm số lượng đơn đặt bàn cho mỗi quán
  }
  return storeCounts;
};
const DashboardPage = () => {
  const storeCounts = countOrdersPerStore(data);
  const [invoices, setInvoices] = useState([]);

  // Dữ liệu cho biểu đồ tròn
  const chartData = {
    labels: Object.keys(storeCounts), // Nhãn là tên các quán
    datasets: [
      {
        data: Object.values(storeCounts), // Giá trị là số lượng đơn đặt bàn cho mỗi quán
        backgroundColor: ["#FF5733", "#33FF57", "#FF33A1"], // Màu sắc cho các phần của biểu đồ
        hoverBackgroundColor: ["#FF5733", "#33FF57", "#FF33A1"],
      },
    ],
  };
  useEffect(() => {
    const fetchInvoices = async () => {
      try {
        const response = await axiosClient.get("/client/show-all-invoice", {
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
  const chartOptions = {
    responsive: true, // Đảm bảo biểu đồ co giãn khi thay đổi kích thước
    plugins: {
      tooltip: {
        enabled: true, // Kích hoạt tooltip khi hover
        backgroundColor: "#000", // Màu nền tooltip
        titleFont: {
          size: 16, // Kích thước font tiêu đề
        },
        bodyFont: {
          size: 14, // Kích thước font body
        },
        callbacks: {
          label: function (tooltipItem) {
            return `${tooltipItem.label}: ${tooltipItem.raw} đơn đặt bàn`;
          },
        },
      },
      legend: {
        position: "top", // Vị trí legend
        labels: {
          font: {
            size: 14, // Kích thước font của các nhãn
            family: "Arial", // Font chữ cho các nhãn
          },
        },
      },
    },
    cutout: "50%", // Làm rỗng phần trung tâm của biểu đồ (giống donut chart)
    animation: {
      animateRotate: true, // Thêm hiệu ứng quay khi vẽ biểu đồ
      animateScale: true, // Thêm hiệu ứng thay đổi kích thước
    },
  };
  return (
    <div className="user-profile-card">
      <div className="row">
        <h2>Biểu Đồ Tròn: Số Lượng Đơn Đặt Bàn Theo Tên Quán</h2>
        <div style={{ width: "300px", height: "300px" }}>
          <Pie data={chartData} options={chartOptions} />
        </div>
        <div className="col-md-12 my-3">
            <OrderChatForUser invoices={invoices} />
          </div>
      </div>
    </div>
  );
};
export default DashboardPage;
