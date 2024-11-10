import   { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { createDMA } from '../../../features/danhmucanh/dmaSlice';

const CreateDMA = () => {
    const [formData, setFormData] = useState({
        TenDM: "",
        TrangThai: 1,
      });
    
      const dispatch = useDispatch();
      const { loading } = useSelector((state) => state.danhMucAnh);
    
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
          await dispatch(createDMA(formData)).unwrap();
          toast.success("Danh mục đã được thêm thành công");
        } catch (err) {
          toast.error(err.message || "Thêm danh mục thất bại");
        }
      };
  return (
    <div className="user-profile-card add-listing">
    <div className="user-profile-card-header">
      <h4 className="user-profile-card-title">Thêm danh mục</h4>
      <div className="user-profile-card-header-right">
        <ul className="breadcrumb-menu d-flex gap-3">
          <li>
            <Link to="/admin/management-role">Danh sách</Link>
          </li>
          /<li className="active">Thêm danh mục</li>
        </ul>
      </div>
    </div>
    <div className="col-lg-12">
      <div className="add-listing-form">
        <form onSubmit={handleSubmit}>
          <div className="row align-items-center">
            <div className="col-lg-6">
              <div className="form-group">
                <label>Tên danh mục</label>
                <input
                  type="text"
                  name="TenDM"
                  className="form-control"
                  placeholder="Tên Danh mục"
                  value={formData.TenDM}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="col-lg-6">
              <div className="form-group">
                <label>Trạng thái</label>
                <select
                  name="TrangThai"
                  className="form-control"
                  value={formData.TrangThai}
                  onChange={handleChange}
                >
                  <option value={1}>Hoạt động</option>
                  <option value={0}>Không hoạt động</option>
                </select>
              </div>
            </div>
            <div className="col-lg-12">
              <button type="submit" className="theme-btn" disabled={loading}>
                {loading ? "Đang thêm..." : "Thêm danh mục"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
  )
}

export default CreateDMA