import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import {
  getDichVuById,
  updateDichVu,
} from "./../../../features/dichvu/dichvuSlice";
import { toast } from "react-toastify";
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
export const EditService = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { dichvu, loading } = useSelector((state) => state.dichvu);

  const [formData, setFormData] = useState({
    Ten_DV: "",
    TrangThai: 1,
  });
  
  useEffect(() => {
    dispatch(getDichVuById(id));
  }, [dispatch, id]);

    useEffect(() => {
    if (dichvu) {
        setFormData({
            Ten_DV: dichvu.Ten_DV,
            TrangThai: dichvu.TrangThai,
        });
    }
    }, [dichvu]);

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
        console.log(formData)
      await dispatch(updateDichVu({ id, ...formData })).unwrap();
      toast.success("Dịch vụ được cập nhật thành công");
      navigate("/store/manage-services");
    } catch (err) {
      toast.error(err.message || "Cập nhật dịch vụ thất bại");
    }
  };

  return (
    <div className="user-profile-card add-listing">
      <h4 className="user-profile-card-title">Thêm dịch vụ</h4>
      <div className="col-lg-12">
        <div className="add-listing-form">
          <form onSubmit={handleSubmit}>
            <div className="row align-items-center">
              <div className="col-lg-6">
                <div className="form-group">
                  <label>Tên dịch vụ</label>
                  <input
                    type="text"
                    name="Ten_DV"
                    className="form-control"
                    placeholder="Thuê bàn bi-a"
                    value={formData.Ten_DV}
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
                    <option value={1}>Hiện</option>
                    <option value={0}>Ẩn </option>
                  </select>
                </div>
              </div>

              <div className="col-lg-12">
                <button type="submit" className="theme-btn" disabled={loading}>
                  {loading ? "Đang cập nhật..." : "Cập nhật dịch vụ"}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
