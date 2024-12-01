import { CategoryScale, Chart as ChartJS, Legend, LinearScale, LineElement, PointElement, Title, Tooltip } from 'chart.js';
import { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import axiosInstance from './api/axiosConfig';
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const NewTest = () => {
    const [data, setData] = useState([]);
    const [chartData, setChartData] = useState({});
    const [timeFrame, setTimeFrame] = useState('day'); // Chọn khung thời gian: 'day', 'month', 'year'
  
    // Lấy dữ liệu từ API
    useEffect(() => {
        
        const fetchData = async () => {
            const response = await axiosInstance.get('/store/show-all-order', {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("userToken")}`,
                },
            });

            const result =  response.data.order;
            setData(result);
        };
        fetchData();
    }, []);
  
    // Lọc dữ liệu và chuẩn bị dữ liệu cho biểu đồ
    useEffect(() => {
      const groupedData = groupDataByTimeFrame(data, timeFrame);
      const chartData = {
        labels: Object.keys(groupedData),
        datasets: [
          {
            label: `Số lượng đơn hàng theo ${timeFrame}`,
            data: Object.values(groupedData),
            fill: false,
            borderColor: 'rgba(75,192,192,1)',
            tension: 0.1,
          },
        ],
      };
      setChartData(chartData);
    }, [data, timeFrame]);
  
    // Hàm nhóm dữ liệu theo ngày, tháng hoặc năm
    const groupDataByTimeFrame = (data, timeFrame) => {
      const grouped = {};
  
      data.forEach(order => {
        const date = new Date(order.Created_at);
        let label;
  
        switch (timeFrame) {
          case 'month':
            label = `${date.getMonth() + 1}-${date.getFullYear()}`; // Tháng-Năm
            break;
          case 'year':
            label = `${date.getFullYear()}`; // Năm
            break;
          case 'day':
          default:
            label = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`; // Ngày-Tháng-Năm
            break;
        }
  
        if (grouped[label]) {
          grouped[label] += 1;
        } else {
          grouped[label] = 1;
        }
      });
  
      return grouped;
    };
  
    return (
      <div className="App">
        <h2>Thống kê số lượng đơn hàng</h2>
  
        <div>
          <label>Chọn khung thời gian: </label>
          <select onChange={(e) => setTimeFrame(e.target.value)} value={timeFrame}>
            <option value="day">Ngày</option>
            <option value="month">Tháng</option>
            <option value="year">Năm</option>
          </select>
        </div>
  
        <Line data={chartData} options={{ responsive: true }} />
      </div>
    );
  };

export default NewTest