import   { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import { createDanhMuc } from '../../../features/danhMucBan/danhMucBanSlice';

export const CreateDanhMucBan = () => {
  const [formData, setFormData] = useState({
    TenDMBan: "",
  });

  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.danhMucBan);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(createDanhMuc(formData)).unwrap();
      toast.success("Danh mục bàn đã được thêm thành công");
    } catch (err) {
      toast.error(err.message || "Thêm danh mục bàn thất bại");
    }
  };

  return (
    <div className="user-profile-card add-listing">
      <div className="user-profile-card-header">
        <h4 className="user-profile-card-title">Thêm danh mục bàn</h4>
        <div className="user-profile-card-header-right">
          <ul className="breadcrumb-menu d-flex gap-3">
            <li>
              <Link to="/store/manage-category-table">Danh sách</Link>
            </li>
            /<li className="active">Thêm danh mục bàn</li>
          </ul>
        </div>
      </div>
      <div className="col-lg-12">
        <div className="add-listing-form">
          <form onSubmit={handleSubmit}>
            <div className="row align-items-center">
              <div className="col-lg-12">
                <div className="form-group">
                  <label>Tên danh mục bàn</label>
                  <input
                    type="text"
                    name="TenDMBan"
                    className="form-control"
                    placeholder="Tên danh mục bàn"
                    value={formData.TenDMBan}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              <div className="col-lg-12">
                <button type="submit" className="theme-btn" disabled={loading}>
                  {loading ? "Đang thêm..." : "Thêm danh mục bàn"}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};