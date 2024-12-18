import { useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { createDichVu } from "./../../../features/dichvu/dichvuSlice";
import { Link } from 'react-router-dom';
export const CreateService = () => {
  const [formData, setFormData] = useState({
    Ten_DV: "",
    TrangThai: 1,
  });
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.dichvu);
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
      await dispatch(createDichVu(formData)).unwrap();
      toast.success("Dịch vụ được thêm thành công");
    } catch (err) {
      toast.error(err.message || "Thêm dịch vụ thất bại");
    }
  };
  return (
    <div className="user-profile-card add-listing">
      <div className="user-profile-card-header">
        <h4 className="user-profile-card-title">Thêm dịch vụ</h4>
        <div className="user-profile-card-header-right">
          <ul className="breadcrumb-menu d-flex gap-3">
            <li>
              <Link to="/store/manage-services">Danh sách dịch vụ</Link>
            </li>
            /<li className="active">Thêm dịch vụ</li>
          </ul>
        </div>
      </div>
      <div className="col-lg-12">
        <div className="add-listing-form">
          <form onSubmit={handleSubmit}>
            <div className="row align-items-center">
              <div className="col-lg-6">
                <div className="form-group">
                  <label>Tên dịch vụ</label>
                  <input
                    type="text"
                    value={formData.Ten_DV}
                    onChange={handleChange}
                    name="Ten_DV"
                    className="form-control"
                    placeholder="Thuê bàn bi-a"
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
                    <option value={1}>Hiện</option>
                    <option value={0}>Ẩn </option>
                  </select>
                </div>
              </div>

              <div className="col-lg-12">
                <button type="submit" className="theme-btn" disabled={loading}>
                  {loading ? "Đang thêm..." : "Thêm dịch vụ"}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
