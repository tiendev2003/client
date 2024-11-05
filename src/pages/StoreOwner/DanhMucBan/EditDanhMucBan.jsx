import   { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getDanhMucById, updateDanhMuc } from '../../../features/danhMucBan/danhMucBanSlice';
import { Link } from 'react-router-dom';
  
export const EditDanhMucBan = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { danhMuc, loading } = useSelector((state) => state.danhMucBan);

  const [formData, setFormData] = useState({
    TenDMBan: "",
  });

  useEffect(() => {
    dispatch(getDanhMucById(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (danhMuc) {
      setFormData((prevData) => ({
        ...prevData,
        TenDMBan: danhMuc.TenDMBan,
      }));
    }
  }, [danhMuc]);
  

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
      await dispatch(updateDanhMuc({ id, ...formData })).unwrap();
      toast.success("Danh mục bàn đã được cập nhật thành công");
      navigate("/store/manage-category-table");
    } catch (err) {
      toast.error(err.message || "Cập nhật danh mục bàn thất bại");
    }
  };

  return (
    <div className="user-profile-card add-listing">
      <div className="user-profile-card-header">
        <h4 className="user-profile-card-title">Sửa danh mục bàn</h4>
        <div className="user-profile-card-header-right">
          <ul className="breadcrumb-menu d-flex gap-3">
            <li>
              <Link to="/store/manage-category-table">Danh sách </Link>
            </li>
            /<li className="active">Sửa danh mục bàn</li>
          </ul>
        </div>
      </div>
      <div className="col-lg-12">
        <div className="add-listing-form">
          <form onSubmit={handleSubmit}>
            <div className="row align-items-center">
              <div className="col-lg-6">
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
                  {loading ? "Đang cập nhật..." : "Cập nhật danh mục bàn"}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};