import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { createCTKM } from "../../../features/ctkm/ctkmSlice";
import { getDanhMucKhuyenMai } from "./../../../features/danhmuckm/danhMucKhuyenMaiSlice";
import { Link } from "react-router-dom";

export const CreateCTKM = () => {
  const [formData, setFormData] = useState({
    Ten_PGG: "",
    GiaTri_PGG: 0,
    KieuGiaTri: 0,
    id_DMCTKM: "",
  });
  const { userInfo } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const { danhMucKhuyenMais } = useSelector((state) => state.danhMucKhuyenMai);
  const { loading } = useSelector((state) => state.ctkm);

  useEffect(() => {
    dispatch(getDanhMucKhuyenMai(userInfo.cuahang.id));
  }, [dispatch, userInfo.cuahang.id]);

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
      await dispatch(
        createCTKM({
          id: userInfo.cuahang.id,
          ...formData,
        })
      ).unwrap();
      toast.success("Chương trình khuyến mãi đã được thêm thành công");
    } catch (err) {
      toast.error(err.message || "Thêm chương trình khuyến mãi thất bại");
    }
  };

  return (
    <div className="user-profile-card add-listing">
      <div className="user-profile-card-header">
        <h4 className="user-profile-card-title">Thêm chương trình khuyến mãi</h4>
        <div className="user-profile-card-header-right">
          <ul className="breadcrumb-menu d-flex gap-3">
            <li>
              <Link to="/store/manage-ctkm">Danh sách</Link>
            </li>
            /<li className="active">Thêm chương trình khuyến mãi</li>
          </ul>
        </div>
      </div>{" "}
      <div className="col-lg-12">
        <div className="add-listing-form">
          <form onSubmit={handleSubmit}>
            <div className="row align-items-center">
              <div className="col-lg-6">
                <div className="form-group">
                  <label>Tên chương trình</label>
                  <input
                    type="text"
                    name="Ten_PGG"
                    className="form-control"
                    placeholder="Tên chương trình"
                    value={formData.Ten_PGG}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              <div className="col-lg-6">
                <div className="form-group">
                  <label>Giá trị</label>
                  <input
                    type="number"
                    name="GiaTri_PGG"
                    className="form-control"
                    placeholder="Giá trị"
                    value={formData.GiaTri_PGG}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              <div className="col-lg-6">
                <div className="form-group">
                  <label>Kiểu giá trị</label>
                  <select
                    name="KieuGiaTri"
                    className="form-control"
                    value={formData.KieuGiaTri}
                    onChange={handleChange}
                  >
                    <option value={0}>Phần trăm</option>
                    <option value={1}>Số tiền</option>
                  </select>
                </div>
              </div>
              <div className="col-lg-6">
                <div className="form-group">
                  <label>Danh mục chương trình khuyến mãi</label>
                  <select
                    name="id_DMCTKM"
                    className="form-control"
                    value={formData.id_DMCTKM}
                    onChange={handleChange}
                    required
                  >
                    <option value="" disabled>
                      Chọn danh mục
                    </option>
                    {danhMucKhuyenMais &&
                      danhMucKhuyenMais.map((danhMuc) => (
                        <option key={danhMuc.id} value={danhMuc.id}>
                          {danhMuc.TenDMCTKM}
                        </option>
                      ))}
                  </select>
                </div>
              </div>
              <div className="col-lg-12">
                <button type="submit" className="theme-btn" disabled={loading}>
                  {loading ? "Đang thêm..." : "Thêm chương trình"}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
