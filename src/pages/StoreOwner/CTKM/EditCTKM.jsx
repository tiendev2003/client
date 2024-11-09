import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useParams, useNavigate } from "react-router-dom";
import { getCTKMById, updateCTKM } from "../../../features/ctkm/ctkmSlice";
import { getDanhMucKhuyenMai } from "../../../features/danhmuckm/danhMucKhuyenMaiSlice";
import { Link } from "react-router-dom";

export const EditCTKM = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { danhMucKhuyenMais } = useSelector((state) => state.danhMucKhuyenMai);
  const { ctkm, loading } = useSelector((state) => state.ctkm);
  const { userInfo } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    Ten_PGG: "",
    GiaTri_PGG: 0,
    KieuGiaTri: 0,
    id_DMCTKM: "",
  });

  useEffect(() => {
    dispatch(
      getCTKMById({
        id: userInfo.cuahang.id,
        idCTKM: id,
      })
    );
    dispatch(getDanhMucKhuyenMai(userInfo.cuahang.id));
  }, [dispatch, id, userInfo.cuahang.id]);

  useEffect(() => {
    if (ctkm) {
      setFormData({
        Ten_PGG: ctkm.Ten_PGG,
        GiaTri_PGG: ctkm.GiaTri_PGG,
        KieuGiaTri: ctkm.KieuGiaTri,
        id_DMCTKM: ctkm.id_DMCTKM,
      });
    }
  }, [ctkm]);

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
        updateCTKM({ idCtkm: id, id: userInfo.cuahang.id, ...formData })
      ).unwrap();
      toast.success("Chương trình khuyến mãi được cập nhật thành công");
      navigate("/store/manage-ctkm");
    } catch (err) {
      toast.error(err.message || "Cập nhật chương trình khuyến mãi thất bại");
    }
  };

  return (
    <div className="user-profile-card add-listing">
      <div className="user-profile-card-header">
        <h4 className="user-profile-card-title">Sửa chương trình khuyến mãi</h4>
        <div className="user-profile-card-header-right">
          <ul className="breadcrumb-menu d-flex gap-3">
            <li>
              <Link to="/store/manage-ctkm">Danh sách</Link>
            </li>
            /<li className="active">Sửa chương trình khuyến mãi</li>
          </ul>
        </div>
      </div>
      <div className="col-lg-12">
        <div className="add-listing-form">
          <form onSubmit={handleSubmit}>
            <div className="row align-items-center">
              <div className="col-lg-6">
                <div className="form-group">
                  <label>Tên chương trình khuyến mãi</label>
                  <input
                    type="text"
                    value={formData.Ten_PGG}
                    onChange={handleChange}
                    name="Ten_PGG"
                    className="form-control"
                    placeholder="Tên chương trình khuyến mãi"
                  />
                </div>
              </div>
              <div className="col-lg-6">
                <div className="form-group">
                  <label>Giá trị</label>
                  <input
                    type="number"
                    value={formData.GiaTri_PGG}
                    onChange={handleChange}
                    name="GiaTri_PGG"
                    className="form-control"
                    placeholder="Giá trị"
                  />
                </div>
              </div>
              <div className="col-lg-6">
                <div className="form-group">
                  <label>Kiểu giá trị</label>
                  <select
                    value={formData.KieuGiaTri}
                    onChange={handleChange}
                    name="KieuGiaTri"
                    className="form-control"
                  >
                    <option value={0}>Phần trăm</option>
                    <option value={1}>Số tiền</option>
                  </select>
                </div>
              </div>
              <div className="col-lg-6">
                <div className="form-group">
                  <label>Danh mục khuyến mãi</label>
                  <select
                    value={formData.id_DMCTKM}
                    onChange={handleChange}
                    name="id_DMCTKM"
                    className="form-control"
                  >
                    {danhMucKhuyenMais.map((dm) => (
                      <option key={dm.id} value={dm.id}>
                        {dm.TenDMCTKM}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="col-lg-12">
                <button type="submit" className="btn btn-primary">
                  Cập nhật
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
