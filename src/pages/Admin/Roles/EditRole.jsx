import  { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { Link, useParams, useNavigate } from "react-router-dom";
import { fetchRoleById, updateRole } from "../../../features/role/roleSlice";

const EditRole = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { role, loading } = useSelector((state) => state.role);

  const [formData, setFormData] = useState({
    TenQ: "",
    TrangThai: 1,
  });

  useEffect(() => {
    dispatch(fetchRoleById(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (role) {
      console.log(role.TenQ);
      setFormData({
        TenQ: role.TenQ,
        TrangThai: role.TrangThai,
      });
    }
  }, [role]);

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
      await dispatch(updateRole({ id, ...formData })).unwrap();
      toast.success("Quyền đã được cập nhật thành công");
      navigate("/admin/management-role");
    } catch (err) {
      toast.error(err.message || "Cập nhật quyền thất bại");
    }
  };

  return (
    <div className="user-profile-card add-listing">
      <div className="user-profile-card-header">
        <h4 className="user-profile-card-title">Sửa quyền</h4>
        <div className="user-profile-card-header-right">
          <ul className="breadcrumb-menu d-flex gap-3">
            <li>
              <Link to="/admin/management-role">Danh sách</Link>
            </li>
            /<li className="active">Sửa quyền</li>
          </ul>
        </div>
      </div>
      <div className="col-lg-12">
        <div className="add-listing-form">
          <form onSubmit={handleSubmit}>
            <div className="row align-items-center">
              <div className="col-lg-6">
                <div className="form-group">
                  <label>Tên quyền</label>
                  <input
                    type="text"
                    name="TenQ"
                    className="form-control"
                    placeholder="Tên quyền"
                    value={formData.TenQ}
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
                    <option value={1}>Kích hoạt</option>
                    <option value={0}>Khóa</option>
                  </select>
                </div>
              </div>
              <div className="col-lg-12">
                <button type="submit" className="theme-btn" disabled={loading}>
                  {loading ? "Đang cập nhật..." : "Cập nhật quyền"}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditRole;
