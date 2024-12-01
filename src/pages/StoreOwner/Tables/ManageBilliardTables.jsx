import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import {
  deleteBanForStore,
  getBanForStore,
} from "./../../../features/banforstore/banForStoreSlice";
import { getDichVu } from "./../../../features/dichvu/dichvuSlice";

const ManageBilliardTables = () => {
  const dispatch = useDispatch();
  const { banforstores } = useSelector((state) => state.banforstore);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const { dichvus } = useSelector((state) => state.dichvu);

  const itemsPerPage = 10;
  useEffect(() => {
    dispatch(getDichVu(12));
  }, [dispatch]);
  useEffect(() => {
    dispatch(getBanForStore(1));
  }, [dispatch]);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa bàn này không?")) {
      try {
        await dispatch(deleteBanForStore(id)).unwrap();
        toast.success("Bàn đã được xóa thành công");
      } catch (err) {
        toast.error(err.message || "Xóa bàn thất bại");
      }
    }
  };

  const filteredBilliardTables = banforstores.filter((table) =>
    table.TenBan.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.ceil(filteredBilliardTables.length / itemsPerPage);
  const currentBilliardTables = filteredBilliardTables.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  return (
    <div className="user-profile-card user-profile-listing">
      <div className="user-profile-card-header">
        <h4 className="user-profile-card-title">Danh sách bàn</h4>
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
          <Link to="create" className="theme-btn">
            <span className="fa fa-plus-circle"></span>Thêm bàn
          </Link>
        </div>
      </div>
      <div className="col-lg-12">
        <div className="table-responsive">
          <table className="table text-nowrap">
            <thead>
              <tr>
                <th>ID</th>
                <th>Tên bàn</th>
                <th>Giá bàn</th>
                <th>Loại bàn</th>

                <th>Dịch vụ</th>
                <th>Trạng thái</th>
                <th>Hành động</th>
              </tr>
            </thead>
            <tbody>
              {currentBilliardTables.map((table) => (
                <tr key={table.id}>
                  <td>{table.id}</td>
                  <td>{table.TenBan}</td>
                  <td>{table.GiaBan}</td>
                  <td>{table.HangBan}</td>

                  <td>
                    {dichvus &&
                      dichvus.find((dichvu) => dichvu.id === table.id_DichVu)
                        ?.Ten_DV}
                  </td>
                  <td>
                    <span
                      className={`badge ${
                        table.TrangThai ? "bg-success" : "bg-danger"
                      }`}
                    >
                      {table.TrangThai ? "Active" : "Inactive"}
                    </span>
                  </td>
                  <td>
                    <Link
                      to={`edit/${table.id}`}
                      className="btn btn-primary btn-sm mr-2"
                    >
                      <i className="fa fa-pen"></i>
                    </Link>
                    <button
                      onClick={() => handleDelete(table.id)}
                      className="btn btn-danger btn-sm"
                    >
                      <i className="far fa-trash-can"></i>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filteredBilliardTables.length > 0 && (
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

export default ManageBilliardTables;
