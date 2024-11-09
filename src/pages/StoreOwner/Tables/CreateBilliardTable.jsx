import   { useState } from "react";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getDichVu } from "./../../../features/dichvu/dichvuSlice";
import { getDanhMucs } from "./../../../features/danhMucBan/danhMucBanSlice";
import { toast } from "react-toastify";
import { createBanForStore } from "./../../../features/banforstore/banForStoreSlice";
import { Link } from "react-router-dom";
export const CreateBilliardTable = () => {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    TenBan: "",
    GiaBan: "",
    HangBan: "",
    id_DMBan: "",
    id_DichVu: "",
    
  });
  const { loading } = useSelector((state) => state.banforstore);
  const { dichvus } = useSelector((state) => state.dichvu);
  const { danhMucs } = useSelector((state) => state.danhMucBan);
  useEffect(() => {
    dispatch(getDichVu(12));
  }, [dispatch]);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  useEffect(() => {
    dispatch(getDanhMucs());
  }, [dispatch]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(createBanForStore(formData)).unwrap();
      toast.success("Danh mục bàn đã được thêm thành công");
    } catch (err) {
      toast.error(err.message || "Thêm danh mục bàn thất bại");
    }
  };

  return (
    <div className="user-profile-card add-listing">
      <div className="user-profile-card-header">
        <h4 className="user-profile-card-title">Thêm bàn</h4>
        <div className="user-profile-card-header-right">
          <ul className="breadcrumb-menu d-flex gap-3">
            <li>
              <Link to="/store/manage-tables">Danh sách </Link>
            </li>
            /<li className="active">Thêm bàn</li>
          </ul>
        </div>
      </div>
      <div className="col-lg-12">
        <div className="add-listing-form">
          <form onSubmit={handleSubmit}>
            <div className="row align-items-center">
              <div className="col-lg-6">
                <div className="form-group">
                  <label>Tên bàn</label>
                  <input
                    type="text"
                    name="TenBan"
                    className="form-control"
                    placeholder="Bàn ..."
                    value={formData.TenBan}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              <div className="col-lg-6">
                <div className="form-group">
                  <label>Giá bàn / Giờ</label>
                  <input
                    type="number"
                    name="GiaBan"
                    className="form-control"
                    placeholder="222222"
                    value={formData.GiaBan}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              <div className="col-lg-6">
                <div className="form-group">
                  <label>Hãng bàn</label>
                  <input
                    type="text"
                    name="HangBan"
                    className="form-control"
                    placeholder="Enter table brand"
                    value={formData.HangBan}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="col-lg-6">
                <div className="form-group">
                  <label>Danh mục bàn</label>
                  <select
                    name="id_DMBan"
                    type="number"
                    className="form-control"
                    value={formData.id_DMBan}
                    onChange={handleChange}
                    required
                  >
                    <option value="" disabled>
                      Chọn danh mục
                    </option>
                    {danhMucs.map((danhMuc) => (
                      <option key={danhMuc.id} value={danhMuc.id}>
                        {danhMuc.TenDMBan}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="col-lg-6">
                <div className="form-group">
                  <label>Dịch vụ</label>
                  <select
                    name="id_DichVu"
                    type="number"
                    className="form-control"
                    value={formData.id_DichVu}
                    onChange={handleChange}
                    required
                  >
                    <option value="" disabled>
                      Chọn danh mục
                    </option>
                    {dichvus.map((dichvu) => (
                      <option key={dichvu.id} value={dichvu.id}>
                        {dichvu.Ten_DV}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="col-lg-12">
                <button type="submit" className="theme-btn" disabled={loading}>
                  {loading ? "Đang thêm..." : "Thêm bàn"}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
