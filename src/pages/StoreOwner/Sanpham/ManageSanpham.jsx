import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  fetchProducts,
  deleteProduct,
} from "../../../features/sanpham/sanphamSlice";
import { toast } from "react-toastify";

export const ManageSanpham = () => {
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState("");
  const { userInfo } = useSelector((state) => state.auth);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const { products, loading, error } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchProducts(userInfo.cuahang));
  }, [dispatch, userInfo.cuahang]);
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };
  const filteredProducts =
    products.length == 0
      ? []
      : products.filter((product) =>
          product.TenSanPham.toLowerCase().includes(searchTerm.toLowerCase())
        );
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentProducts = filteredProducts.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }
  const handleDelete = (id) => {
    dispatch(deleteProduct(id))
      .unwrap()
      .then(() => {
        toast.success("Xóa sản phẩm thành công");
      })
      .catch((err) => {
        toast.error(err.message || "Xóa sản phẩm thất bại");
      });
  };
  return (
    <div className="user-profile-card user-profile-listing">
      <div className="user-profile-card-header">
        <h4 className="user-profile-card-title">Sản phẩm của cửa hàng</h4>
        <div className="user-profile-card-header-right">
          <div className="user-profile-search">
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                placeholder="Search..."
                value={searchTerm}
                onChange={handleSearchChange}
              />
              <i className="fa fa-search"></i>
            </div>
          </div>
          <Link to="create" className="theme-btn">
            <span className="fa fa-plus-circle"></span>Thêm sản phẩm
          </Link>
        </div>
      </div>
      <div className="col-lg-12">
        <div className="table-responsive">
          <table className="table text-nowrap">
            <thead>
              <tr>
                <th>Hình ảnh</th>
                <th>Tên sản phẩm</th>
                <th>Giá</th>
                <th>Số lượng</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {currentProducts.length > 0 &&
                currentProducts.map((product) => (
                  <tr key={product.id}>
                    <td>
                      <img
                        src={product.HinhAnh}
                        alt={product.TenSanPham}
                        style={{ width: "50px", height: "50px" }}
                      />
                    </td>
                    <td>{product.TenSanPham}</td>
                    <td>{product.Gia}</td>
                    <td>{product.SoLuong}</td>
                    <td>
                      <span className="badge bg-success">Active</span>
                    </td>
                    <td>
                      <Link href="#" className="btn btn-info btn-sm mr-2">
                        <i className="far fa-eye"></i>
                      </Link>
                      <Link
                        to={`edit/${product.id}`}
                        className="btn btn-primary btn-sm mr-2"
                      >
                        <i className="fa fa-pen"></i>
                      </Link>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => handleDelete(product.id)}
                      >
                        <i className="far fa-trash-can"></i>
                      </button>
                    </td>
                  </tr>
                ))}
              {currentProducts.length == 0 && (
                <tr>
                  <td colSpan="6">No products found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="pagination-area my-3">
          <div aria-label="Page navigation example">
            <ul className="pagination mt-0">
              <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
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
                  className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}
                >
                  <button className="page-link" onClick={() => handlePageChange(index + 1)}>
                    {index + 1}
                  </button>
                </li>
              ))}
              <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
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
      </div>
    </div>
  );
};
