import { useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { createDanhMuc } from "../../../features/danhmuckm/danhMucKhuyenMaiSlice";
export const CreateDanhMucCTKM = () => {
  const [formData, setFormData] = useState({
    id: "",
    TenDMCTKM: ""
  });
  const {userInfo} = useSelector((state) => state.auth);

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
      formData.id = userInfo.cuahang.id;
      await dispatch(createDanhMuc(formData)).unwrap();
      toast.success("Đã thêm thành công");
    } catch (err) {
      toast.error(err.message || "Thêm thất bại");
    }
  };

  return (
    <div className="user-profile-card add-listing">
      <div className="user-profile-card-header">
        <h4 className="user-profile-card-title">Thêm danh mục khuyến mãi</h4>
        <div className="user-profile-card-header-right">
          <ul className="breadcrumb-menu d-flex gap-3">
            <li>
              <Link to="/store/manage-category-ctkm">Danh sách</Link>
            </li>
            /<li className="active">Thêm danh mục khuyến mãi</li>
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
                  {loading ? "Đang thêm..." : "Thêm danh mục khuyến mãi"}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
