import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import {
  getDanhMucKhuyenMai,
  deleteDanhMuc,
} from "./../../../features/danhmuckm/danhMucKhuyenMaiSlice";

export const ManageDanhMucCTKM = () => {
  const dispatch = useDispatch();
  const { danhMucKhuyenMais } = useSelector((state) => state.danhMucKhuyenMai);
  const { userInfo } = useSelector((state) => state.auth);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const itemsPerPage = 10;

  useEffect(() => {
    dispatch(getDanhMucKhuyenMai(userInfo.cuahang.id));
  }, [dispatch, userInfo.cuahang.id]);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa danh mục này không?")) {
      try {
        await dispatch(deleteDanhMuc(
          {
            id: userInfo.cuahang.id,
            idDanhMuc: id,
          }
        )).unwrap();
        toast.success("Danh mục đã được xóa thành công");
      } catch (err) {
        toast.error(err.message || "Xóa danh mục thất bại");
      }
    }
  };
  const filteredDanhMucs = danhMucKhuyenMais.filter((danhMuc) =>
    danhMuc.TenDMCTKM.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.ceil(filteredDanhMucs.length / itemsPerPage);
  const currentDanhMucs = filteredDanhMucs.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  console.log(filteredDanhMucs);

  return (
    <div className="user-profile-card user-profile-listing">
      <div className="user-profile-card-header">
        <h4 className="user-profile-card-title">
          Danh mục chương trình khuyến mãi
        </h4>
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
            <span className="fa fa-plus-circle"></span>Thêm danh mục
          </Link>
        </div>
      </div>
      <div className="col-lg-12">
        <div className="table-responsive">
          <table className="table text-nowrap">
            <thead>
              <tr>
                <th>ID</th>
                <th>Tên danh mục</th>
                <th>Trạng thái</th>
                <th>Hành động</th>
              </tr>
            </thead>
            <tbody>
              {currentDanhMucs.map((danhMuc, index) => (
                <tr key={danhMuc.id}>
                  <td>{danhMuc?.id}</td>
                  <td>{danhMuc?.TenDMCTKM}</td>
                  <td>
                    <span
                      className={`badge ${
                        danhMuc?.TrangThai ? "bg-success" : "bg-danger"
                      }`}
                    >
                      {danhMuc?.TrangThai ? "Active" : "Inactive"}
                    </span>
                  </td>
                  <td>
                    <Link
                      to={`edit/${danhMuc.id}`}
                      className="btn btn-primary btn-sm mr-2"
                    >
                      <i className="fa fa-pen"></i>
                    </Link>
                    <button
                      onClick={() => handleDelete(danhMuc.id)}
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
