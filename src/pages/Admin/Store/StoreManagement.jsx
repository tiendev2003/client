import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import {
  activeStore,
  blockStore,
  fetchCuahangs,
} from "../../../features/shop/shopSlice";

const StoreManagement = () => {
  const dispatch = useDispatch();
  const { cuahangs } = useSelector((state) => state.shop);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const itemsPerPage = 10;
  const [onChange, setOnChange] = useState(false);
  useEffect(() => {
    dispatch(fetchCuahangs());
  }, [dispatch]);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };
  useEffect(() => {
    if (onChange) {
      dispatch(fetchCuahangs());
      setOnChange(false);
    }
  }, [onChange, dispatch]);

  const handleDelete = async (id) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa cửa hàng này không?")) {
      try {
        toast.success("Cửa hàng đã được xóa thành công");
      } catch (err) {
        toast.error(err.message || "Xóa cửa hàng thất bại");
      }
    }
  };

  const filteredStores = cuahangs.filter((store) =>
    store.TenCuaHang.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.ceil(filteredStores.length / itemsPerPage);
  const currentStores = filteredStores.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  const toggleStatus = async (id) => {
    try {
      const store = cuahangs.find((store) => store.id === id);
      if (store.TrangThai === 1) {
        await dispatch(blockStore(id)).unwrap();
        setOnChange(true);
        toast.success("Cửa hàng đã bị khóa");
        return;
      }
      await dispatch(activeStore(id)).unwrap();
      setOnChange(true);
      toast.success("Cửa hàng đã được kích hoạt");
    } catch (error) {
      toast.error(error.message || "Đã xảy ra lỗi");
    }
    // check if store is active or not
  };

  return (
    <div className="user-profile-card user-profile-listing">
      <div className="user-profile-card-header">
        <h4 className="user-profile-card-title">Danh sách cửa hàng</h4>
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
            <span className="fa fa-plus-circle"></span>Thêm cửa hàng
          </Link>
        </div>
      </div>
      <div className="col-lg-12">
        <div className="table-responsive">
          <table className="table text-nowrap">
            <thead>
              <tr>
                <th>ID</th>
                <th>Tên cửa hàng</th>
                <th>Số điện thoại</th>

                <th>Địa chỉ</th>
                <th>Trạng thái</th>
                <th>Hành động</th>
              </tr>
            </thead>
            <tbody>
              {currentStores.map((store) => (
                <tr key={store.id}>
                  <td>{store.id}</td>
                  <td>{store.TenCuaHang}</td>
                  <td>{store.SDT}</td>

                  <td>{store.DiaChi}</td>
                  <td>
                    <div className="checkbox-wrapper-35">
                      <input
                        value="private"
                        name="switch"
                        id={`switch-${store.id}`}
                        type="checkbox"
                        className="switch"
                        checked={store.TrangThai === 1}
                        onChange={() => toggleStatus(store.id)}
                      />
                      <label htmlFor={`switch-${store.id}`}></label>
                    </div>
                  </td>
                  <td>
                    <Link
                      to={`edit/${store.id}`}
                      className="btn btn-primary btn-sm mr-2"
                    >
                      <i className="fa fa-pen"></i>
                    </Link>
                    <button
                      onClick={() => handleDelete(store.id)}
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
        {filteredStores.length > 0 && (
          <div className="pagination-area my-3">
            <div aria-label="Page navigation example">
              <ul className="pagination mt-0">
                <li
                  className={`page-item ${currentPage === 1 ? "disabled" : ""}`}
                >
                  <button
                    className="page-link"
                    onClick={() => handlePageChange(currentPage - 1)}
                  >
                    <span aria-hidden="true">
                      <i className="fa fa-angle-double-left"></i>
                    </span>
                  </button>
                </li>
                {[...Array(totalPages)].map((_, index) => (
                  <li
                    key={index}
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

export default StoreManagement;
