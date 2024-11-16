import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { deleteCTKM, getCTKMs } from './../../../features/ctkm/ctkmSlice';

export const ManageCTKM = () => {
  const dispatch = useDispatch();
  const { ctkms } = useSelector((state) => state.ctkm);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const {userInfo} = useSelector((state) => state.auth);

  const itemsPerPage = 10;

  useEffect(() => {
    dispatch(getCTKMs(userInfo.cuahang.id));
  }, [dispatch, userInfo.cuahang.id]);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa chương trình khuyến mãi này không?")) {
      try {
        await dispatch(deleteCTKM(id)).unwrap();
        toast.success("Chương trình khuyến mãi đã được xóa thành công");
      } catch (err) {
        toast.error(err.message || "Xóa chương trình khuyến mãi thất bại");
      }
    }
  };

  const filteredCTKMs = ctkms.filter((ctkm) =>
    ctkm.Ten_PGG.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.ceil(filteredCTKMs.length / itemsPerPage);
  const currentCTKMs = filteredCTKMs.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="user-profile-card user-profile-listing">
      <div className="user-profile-card-header">
        <h4 className="user-profile-card-title">Chương trình khuyến mãi</h4>
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
            <span className="fa fa-plus-circle"></span>Thêm chương trình
          </Link>
        </div>
      </div>
      <div className="col-lg-12">
        <div className="table-responsive">
          <table className="table text-nowrap">
            <thead>
              <tr>
                <th>ID</th>
                <th>Tên chương trình</th>
                <th>Giá trị</th>
                <th>Trạng thái</th>
                <th>Hành động</th>
              </tr>
            </thead>
            <tbody>
              {currentCTKMs.map((ctkm, index) => (
                <tr key={index}>
                  <td>{ctkm.id}</td>
                  <td>{ctkm.Ten_PGG}</td>
                  <td>{ctkm.GiaTri_PGG}</td>
                  <td>
                    <span className={`badge ${ctkm.TrangThai ? 'bg-success' : 'bg-danger'}`}>
                      {ctkm.TrangThai ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td>
                    <Link to={`edit/${ctkm.id}`} className="btn btn-primary btn-sm mr-2">
                      <i className="fa fa-pen"></i>
                    </Link>
                    <button
                      onClick={() => handleDelete(ctkm.id)}
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
        {filteredCTKMs.length > 0 && (
          <div className="pagination-area my-3">
            <div aria-label="Page navigation example">
              <ul className="pagination mt-0">
                <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                  <button className="page-link" onClick={() => handlePageChange(currentPage - 1)} aria-label="Previous">
                    <span aria-hidden="true">
                      <i className="fa fa-angle-double-left"></i>
                    </span>
                  </button>
                </li>
                {Array.from({ length: totalPages }, (_, index) => (
                  <li key={index + 1} className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}>
                    <button className="page-link" onClick={() => handlePageChange(index + 1)}>
                      {index + 1}
                    </button>
                  </li>
                ))}
                <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                  <button className="page-link" onClick={() => handlePageChange(currentPage + 1)} aria-label="Next">
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