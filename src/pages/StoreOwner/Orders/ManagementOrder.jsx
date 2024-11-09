import { useState } from "react";
import { Link } from "react-router-dom";

const ManagementOrder = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div className="user-profile-card user-profile-listing">
      <div className="user-profile-card-header">
        <h4 className="user-profile-card-title">Danh mục sản phẩm</h4>
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
            <tbody></tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ManagementOrder;
