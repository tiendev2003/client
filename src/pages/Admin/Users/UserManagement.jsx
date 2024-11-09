import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  activeUser,
  blockUser,
  fetchUsers,
} from "../../../features/user/userSlice";

const UserManagement = () => {
  const dispatch = useDispatch();
  const { users, loading } = useSelector((state) => state.user);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [onChange, setOnChange] = useState(false);
  const itemsPerPage = 10;

  useEffect(() => {
    dispatch(fetchUsers(12));
  }, [dispatch]);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  useEffect(() => {
    if (onChange) {
      dispatch(fetchUsers(12));
      setOnChange(false);
    }
  }, [onChange, dispatch]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredUsers = users.filter((user) =>
    user.TenNguoiDung.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  const currentUsers = filteredUsers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  const toggleStatus = async (id) => {
    // check if user is active or not
    const user = users.find((user) => user.id === id);
    if (user.TrangThai === 1) {
      // call API to block user
      await dispatch(blockUser(id)).unwrap();
      toast.success("Người dùng đã bị khóa");
      setOnChange(true);
      return;
    }
    // call API to update user status
    await dispatch(activeUser(id)).unwrap();
    setOnChange(true);
    toast.success("Người dùng đã được kích hoạt");
  };

  return (
    <div className="user-profile-card user-profile-listing">
      <div className="user-profile-card-header">
        <h4 className="user-profile-card-title">Danh sách người dùng</h4>
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
                <th>Tên người dùng</th>
                <th>Email</th>
                <th>Số điện thoại</th>
                <th>Trạng thái</th>
              </tr>
            </thead>
            <tbody>
              {currentUsers.map((user) => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.TenNguoiDung}</td>
                  <td>{user.Email}</td>
                  <td>{user.SDT}</td>
                  <td>
                    <div className="checkbox-wrapper-35">
                      <input
                        value="private"
                        name="switch"
                        id={`switch-${user.id}`}
                        type="checkbox"
                        className="switch"
                        checked={user.TrangThai === 1}
                        onChange={() => toggleStatus(user.id)}
                      />
                      <label htmlFor={`switch-${user.id}`}></label>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filteredUsers.length > 0 && (
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

export default UserManagement;
