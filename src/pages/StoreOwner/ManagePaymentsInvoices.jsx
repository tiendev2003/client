import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchHoadon } from "../../features/hoadon/hoadonSlice";
import { formatDate } from "../../utils/dateHelpers";
import { Link } from "react-router-dom";
const ManagePaymentsInvoices = () => {
  const dispatch = useDispatch();
  const { hoadon } = useSelector((state) => state.hoadon);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const itemsPerPage = 10;

  useEffect(() => {
    dispatch(fetchHoadon(123));
  }, [dispatch]);
  const filteredDanhMucs = hoadon.filter((order) =>
    order?.taikhoan?.TenTaiKhoan.toLowerCase().includes(
      searchQuery.toLowerCase()
    )
  );

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const totalPages = Math.ceil(filteredDanhMucs.length / itemsPerPage);
  const currentHoadon = filteredDanhMucs.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
   return (
    <div className="user-profile-card user-profile-listing">
      <div className="user-profile-card-header">
        <h4 className="user-profile-card-title">Danh sách đơn đặt bàn</h4>
        <div className="user-profile-card-header-right">
          <div className="user-profile-search">
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                placeholder="Tìm kiếm ..."
                value={searchQuery}
                onChange={handleSearchChange}
              />
              <i className="fa fa-search"></i>
            </div>
          </div>
        </div>
      </div>
      <div className="col-lg-12">
        <div className="table-responsive">
          <table className="table text-nowrap">
            <thead>
              <tr>
                <th>ID</th>
                <th>Tên người đặt</th>
                <th>Bàn đặt</th>
                <th>Ngày đặt</th>
                <th>Hành động</th>
              </tr>
            </thead>
            <tbody>
              {currentHoadon &&
                currentHoadon.map((order, index) => {
                  return (
                    <tr key={index}>
                      <td>{index}</td>
                      <td>{order?.taikhoan?.TenTaiKhoan}</td>
                      <td>{order?.hoadonct[0]?.ban?.TenBan}</td>
                      <td>{formatDate(order?.ThoiGianXuatHD)}</td>

                      <td>
                        <Link to={`/store/invoice/${order.id}`}>
                          <button className="badge bg-success btn">
                            <i className="fa-regular fa-eye"></i>
                          </button>
                        </Link>
                      </td>
                    </tr>
                  );
                })}
              {currentHoadon.length === 0 && (
                <tr className="text-center">
                  <td colSpan="5">Bạn không có đơn đặt bàn nào</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        {filteredDanhMucs.length > 0 && (
          <div className="pagination-area my-3">
            <div aria-label="Page navigation example">
              <ul className="pagination mt-0">
                <li
                  className={`page-item ${currentPage === 1 ? "disabled" : ""}`}
                >
                  <button
                    className="page-link"
                    onClick={() => handlePageChange(currentPage - 1)}
                    aria-label="Previous"
                  >
                    <span aria-hidden="true">
                      <i className="fa fa-angle-double-left"></i>
                    </span>
                  </button>
                </li>
                {Array.from({ length: totalPages }, (_, index) => (
                  <li
                    key={index + 1}
                    className={`page-item ${
                      currentPage === index + 1 ? "active" : ""
                    }`}
                  >
                    <button
                      className="page-link"
                      onClick={() => handlePageChange(index + 1)}
                    >
                      {index + 1}
                    </button>
                  </li>
                ))}
                <li
                  className={`page-item ${
                    currentPage === totalPages ? "disabled" : ""
                  }`}
                >
                  <button
                    className="page-link"
                    onClick={() => handlePageChange(currentPage + 1)}
                    aria-label="Next"
                  >
                    <span aria-hidden="true">
                      <i className="fa fa-angle-double-right"></i>
                    </span>
                  </button>
                </li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ManagePaymentsInvoices;
