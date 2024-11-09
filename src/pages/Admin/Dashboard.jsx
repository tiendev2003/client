import { useState } from "react";

const statisticsPerStore = [
  {
    CuahangID: 1,
    TenCuaHang: "Tên Cửa Hàng Mới",
    TotalInvoices: 2,
    TotalAmount: 126333.33333333
  },
  {
    CuahangID: 2,
    TenCuaHang: "Cửa Hàng Billiards Hà Nội",
    TotalInvoices: 1,
    TotalAmount: 600000
  },
  {
    CuahangID: 3,
    TenCuaHang: "Billiards Đà Nẵng",
    TotalInvoices: 1,
    TotalAmount: 193833.33333333
  }
];
const DashboardAdmin = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const itemsPerPage = 10;

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredStores = statisticsPerStore.filter((store) =>
    store.TenCuaHang.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.ceil(filteredStores.length / itemsPerPage);
  const currentStores = filteredStores.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div>
      <h1>Statistics Management</h1>
      <input
        type="text"
        placeholder="Search by store name"
        value={searchQuery}
        onChange={handleSearchChange}
      />
      <div>
        {currentStores.map((store) => (
          <div key={store.CuahangID}>
            <h2>{store.TenCuaHang}</h2>
            <p>Total Invoices: {store.TotalInvoices}</p>
            <p>Total Amount: {store.TotalAmount.toFixed(2)}</p>
          </div>
        ))}
      </div>
      <div>
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            onClick={() => handlePageChange(index + 1)}
            disabled={currentPage === index + 1}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default DashboardAdmin;
