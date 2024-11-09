import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { fetchCuahangDetail } from "../../../features/shop/shopSlice";

const EditStore = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { cuahangDetail, loading } = useSelector((state) => state.shop);
  const [formData, setFormData] = useState({
    TenCuaHang: "",
    SDT: "",
    MaSoThue: "",
    Email: "",
    DiaChi: "",
    AnhDaiDien_CuaHang: "",
    AnhGPKD: "",
    TrangThai: 1,
  });

  useEffect(() => {
    dispatch(fetchCuahangDetail(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (cuahangDetail) {
      setFormData({
        TenCuaHang: cuahangDetail.TenCuaHang ?? "",
        SDT: cuahangDetail.SDT ?? "",
        MaSoThue: cuahangDetail.MaSoThue ?? "",
        Email: cuahangDetail.Email ?? "",
        DiaChi: cuahangDetail.DiaChi ?? "",
        AnhDaiDien_CuaHang: cuahangDetail.AnhDaiDien_CuaHang ?? "",
        AnhGPKD: cuahangDetail.AnhGPKD ?? "",
        TrangThai: cuahangDetail.TrangThai ?? 1,
      });
    }
  }, [cuahangDetail]);

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
      await dispatch(updateStore({ id, ...formData })).unwrap();
      toast.success("Cập nhật cửa hàng thành công");
      history.push("/admin/stores");
    } catch (err) {
      toast.error(err.message || "Cập nhật cửa hàng thất bại");
    }
  };

  const [province, setProvince] = useState([]);
  const [district, setDistrict] = useState([]);
  const [ward, setWard] = useState([]);

  const [selectedProvince, setSelectedProvince] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedWard, setSelectedWard] = useState("");

  useEffect(() => {
    const fetchProvince = async () => {
      const res = await fetch(
        "https://provinces.open-api.vn/api/?depth=2"
      ).then((res) => res.json());

      setProvince(res);
    };
    fetchProvince();
  }, []);

  useEffect(() => {
    if (selectedProvince) {
      const fetchDistrict = async () => {
        const res = await fetch(
          `https://provinces.open-api.vn/api/p/${selectedProvince}?depth=2`
        ).then((res) => res.json());

        setDistrict(res.districts);
      };
      fetchDistrict();
    }
  }, [selectedProvince]);

  return (
    <div className="user-profile-card add-listing">
      <div className="user-profile-card-header">
        <h4 className="user-profile-card-title">Tạo cửa hàng</h4>
        <div className="user-profile-card-header-right">
          <ul className="breadcrumb-menu d-flex gap-3">
            <li>
              <Link to="/store/manage-store">Danh sách</Link>
            </li>
            /<li className="active">Tạo cửa hàng</li>
          </ul>
        </div>
      </div>
      <div className="col-lg-12">
        <div className="add-listing-form">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="row align-items-center">
                <div className="col-lg-6">
                  <div className="form-group">
                    <label>Email cửa hàng</label>
                    <input
                      type="email"
                      name="Email"
                      className="form-control"
                      placeholder="tranvanb@example.com"
                      value={formData.Email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
               
                <div className="col-lg-6">
                  <div className="form-group">
                    <label>Số Điện Thoại</label>
                    <input
                      type="text"
                      name="SDT"
                      className="form-control"
                      placeholder="0912345678"
                      value={formData.SDT}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="form-group">
                    <label>Tên Cửa Hàng</label>
                    <input
                      type="text"
                      name="TenCuaHang"
                      className="form-control"
                      placeholder="Billiards Bảo Bình"
                      value={formData.TenCuaHang}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
                <div className="col-lg-12">
                  <div className="form-group">
                    <label>Địa Chỉ</label>
                    <input
                      type="text"
                      name="DiaChi"
                      className="form-control"
                      placeholder="35 Phạm Ngọc Thạch, Phường 6, Quận 3"
                      value={formData.DiaChi}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className="col-lg-6">
                  <div className="form-group">
                    <label>Mã Số Thuế</label>
                    <input
                      type="text"
                      name="MaSoThue"
                      className="form-control"
                      placeholder="123456789"
                      value={formData.MaSoThue}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="form-group">
                    <label>Tỉnh/Thành phố</label>
                    <select
                      className="form-control"
                      name="tinh_thanhpho"
                      value={selectedProvince}
                      onChange={(e) => {
                        setSelectedProvince(e.target.value);
                        setFormData((prevData) => ({
                          ...prevData,
                          tinh_thanhpho: e.target.value,
                        }));
                      }}
                      required
                    >
                      <option value="">Chọn Tỉnh/Thành phố</option>
                      {province.map((item) => (
                        <option key={item.code} value={item.code}>
                          {item.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="form-group">
                    <label>Quận/Huyện</label>
                    <select
                      className="form-control"
                      name="quan_huyen"
                      value={selectedDistrict}
                      onChange={(e) => {
                        setSelectedDistrict(e.target.value);
                        setFormData((prevData) => ({
                          ...prevData,
                          quan_huyen: e.target.value,
                        }));
                      }}
                      required
                    >
                      <option value="">Chọn Quận/Huyện</option>
                      {district.map((item) => (
                        <option key={item.code} value={item.code}>
                          {item.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="form-group">
                    <label>Phường/Xã</label>
                    <select
                      className="form-control"
                      name="phuong_xa"
                      value={selectedWard}
                      onChange={(e) => {
                        setSelectedWard(e.target.value);
                        setFormData((prevData) => ({
                          ...prevData,
                          phuong_xa: e.target.value,
                        }));
                      }}
                      required
                    >
                      <option value="">Chọn Phường/Xã</option>
                      {ward.map((item) => (
                        <option key={item.code} value={item.code}>
                          {item.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="form-group">
                    <label>Ảnh Đại Diện Cửa Hàng</label>
                    <input
                      type="text"
                      name="AnhDaiDien_CuaHang"
                      className="form-control"
                      placeholder="https://example.com/anhdaidien.jpg"
                      value={formData.AnhDaiDien_CuaHang}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="form-group">
                    <label>Ảnh Giấy Phép Kinh Doanh</label>
                    <input
                      type="text"
                      name="AnhGPKD"
                      className="form-control"
                      placeholder="https://example.com/anhgpkd.jpg"
                      value={formData.AnhGPKD}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="col-lg-12">
                  <button
                    type="submit"
                    className="theme-btn"
                    disabled={loading}
                  >
                    {loading ? "Đang sửa..." : "Sửa cửa hàng"}
                  </button>
                </div>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default EditStore;
