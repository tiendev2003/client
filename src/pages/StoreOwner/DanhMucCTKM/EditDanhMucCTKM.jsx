import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import {
  getDanhMucById,
  updateDanhMuc,
} from "./../../../features/danhmuckm/danhMucKhuyenMaiSlice";

export const EditDanhMucCTKM = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    TenDMCTKM: "",
  });
  const { userInfo } = useSelector((state) => state.auth);
  const { danhMucKhuyenMai, loading } = useSelector(
    (state) => state.danhMucKhuyenMai
  );
  useEffect(() => {
    dispatch(
      getDanhMucById({
        id,
        idDanhMuc: userInfo.cuahang.id,
      })
    );
  }, [dispatch, id, userInfo.cuahang.id]);
  useEffect(() => {
    if (danhMucKhuyenMai) {
      setFormData((prevData) => ({
        ...prevData,
        TenDMCTKM: danhMucKhuyenMai.TenDMCTKM,
      }));
    }
  }, [danhMucKhuyenMai]);

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
      await dispatch(updateDanhMuc(formData)).unwrap();
      toast.success("Sửa thành công");
      navigate("/store/manage-category-ctkm");
    } catch (err) {
      toast.error(err.message || "Sửa thất bại");
    }
  };

  return (
    <div className="user-profile-card add-listing">
      <div className="user-profile-card-header">
        <h4 className="user-profile-card-title">Sửa danh mục khuyến mãi</h4>
        <div className="user-profile-card-header-right">
          <ul className="breadcrumb-menu d-flex gap-3">
            <li>
              <Link to="/store/manage-services">Danh sách</Link>
            </li>
            /<li className="active">Sửa danh mục khuyến mãi</li>
          </ul>
        </div>
      </div>
      <div className="col-lg-12">
        <div className="add-listing-form">
          <form onSubmit={handleSubmit}>
            <div className="row align-items-center">
              <div className="col-lg-12">
                <div className="form-group">
                  <label>Tên danh mục khuyến mãi</label>
                  <input
                    type="text"
                    value={formData.TenDMCTKM}
                    onChange={handleChange}
                    name="TenDMCTKM"
                    className="form-control"
                    placeholder="Thuê bàn bi-a"
                    required
                  />
                </div>
              </div>

              <div className="col-lg-12">
                <button type="submit" className="theme-btn" disabled={loading}>
                  {loading ? "Đang sửa..." : "Sửa danh mục khuyến mãi"}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
