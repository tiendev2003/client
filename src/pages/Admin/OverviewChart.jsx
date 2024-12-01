import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Title,
  Tooltip,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const OverviewChart = ({ statisticsPerStore }) => {
  const labels = statisticsPerStore.map((store) => store.TenCuaHang);
  const totalInvoices = statisticsPerStore.map((store) => store.TotalInvoices);
  const totalAmounts = statisticsPerStore.map((store) => store.TotalAmount);

  const data = {
    labels: labels,
    datasets: [
      {
        label: "Tổng Số Hóa Đơn",
        data: totalInvoices,
        backgroundColor: "rgba(54, 162, 235, 0.6)",
        stack: "Stack 0",
      },
      {
        label: "Tổng Tiền Hóa Đơn (VND)",
        data: totalAmounts,
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        stack: "Stack 0",
      },
    ],
    
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: "top" },
      title: {
        display: true,
        text: "Tổng Quan Doanh Thu và Hóa Đơn của Cửa Hàng",
      },
    },
    scales: {
      y: { beginAtZero: true },
    },
  };

  return (
    <div  className="w-100">
      <Bar data={data} options={options} />
    </div>
  );
};

export default OverviewChart;
