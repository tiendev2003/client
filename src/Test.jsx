import 'chart.js/auto';
import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';

// ...existing code...

const Test = () => {
    const [data, setData] = useState([
        { TGianXuatHoaDon: '2022-01-01', TongHD: 100 },
        { TGianXuatHoaDon: '2022-01-02', TongHD: 200 },
        { TGianXuatHoaDon: '2022-01-03', TongHD: 300 },
        { TGianXuatHoaDon: '2022-01-04', TongHD: 400 },
        { TGianXuatHoaDon: '2022-01-05', TongHD: 500 },
    ]);
    const [filteredData, setFilteredData] = useState([]);
    const [filter, setFilter] = useState({ day: '', month: '', year: '' });

    useEffect(() => {
        // Fetch data from API or use the provided data
        const fetchData = async () => {
            const response = await fetch('/path/to/api'); // Replace with actual API endpoint
            const result = await response.json();
            setData(result);
        };
        fetchData();
    }, []);

    useEffect(() => {
        // Filter data based on selected day, month, and year
        const filtered = data.filter(item => {
            const date = new Date(item.TGianXuatHoaDon);
            return (
                (filter.day ? date.getDate() === parseInt(filter.day) : true) &&
                (filter.month ? date.getMonth() + 1 === parseInt(filter.month) : true) &&
                (filter.year ? date.getFullYear() === parseInt(filter.year) : true)
            );
        });
        setFilteredData(filtered);
    }, [filter, data]);

    const handleFilterChange = (e) => {
        setFilter({ ...filter, [e.target.name]: e.target.value });
    };

    const chartData = {
        labels: filteredData.map(item => new Date(item.TGianXuatHoaDon).toLocaleDateString()),
        datasets: [
            {
                label: 'Revenue',
                data: filteredData.map(item => item.TongHD),
                backgroundColor: 'rgba(75, 192, 192, 0.6)',
            },
        ],
    };

    return (
        <div>
            <div>
                <label>
                    Day:
                    <input type="number" name="day" value={filter.day} onChange={handleFilterChange} />
                </label>
                <label>
                    Month:
                    <input type="number" name="month" value={filter.month} onChange={handleFilterChange} />
                </label>
                <label>
                    Year:
                    <input type="number" name="year" value={filter.year} onChange={handleFilterChange} />
                </label>
            </div>
            <Bar data={chartData} />
        </div>
    );
};

export default Test;
