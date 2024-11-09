import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const CreateStore = () => {
  const [formData, setFormData] = useState({
    TenNguoiDung: "",
    TenTaiKhoan: "",
    Email: "",
    MatKhau: "",
    SDT: "",
    TenCuaHang: "",
    DiaChi: "",
    SDT_CuaHang: "",
    Email_CuaHang: "",
    MaSoThue: "",
    tinh_thanhpho: "",
    quan_huyen: "",
    phuong_xa: "",
    AnhDaiDien_CuaHang: "",
    AnhGPKD: "",
  });

  const [province, setProvince] = useState([]);
  const [district, setDistrict] = useState([]);
  const [ward, setWard] = useState([]);

  const [selectedProvince, setSelectedProvince] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedWard, setSelectedWard] = useState("");

  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.shop);
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
        console.log(selectedProvince);
        const res = await fetch(
          `https://provinces.open-api.vn/api/p/${selectedProvince}?depth=2`
        ).then((res) => res.json());

        setDistrict(res.districts);
      };
      fetchDistrict();
    }
  }, [selectedProvince]);

  useEffect(() => {
    if (selectedDistrict) {
      const fetchWard = async () => {
        const res = await fetch(
          `https://provinces.open-api.vn/api/d/${selectedDistrict}?depth=2`
        ).then((res) => res.json());

        setWard(res.wards);
      };
      fetchWard();
    }
  }, [selectedDistrict]);

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
      toast.success("Cửa hàng đã được tạo thành công");
    } catch (err) {
      toast.error(err.message || "Tạo cửa hàng thất bại");
    }
  };

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
          <form onSubmit={handleSubmit}>
            <div className="row align-items-center">
              <div className="col-lg-6">
                <div className="form-group">
                  <label>Tên Người Dùng</label>
                  <input
                    type="text"
                    name="TenNguoiDung"
                    className="form-control"
                    placeholder="Trần Văn B"
                    value={formData.TenNguoiDung}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              <div className="col-lg-6">
                <div className="form-group">
                  <label>Tên Tài Khoản</label>
                  <input
                    type="text"
                    name="TenTaiKhoan"
                    className="form-control"
                    placeholder="tranvanb"
                    value={formData.TenTaiKhoan}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              <div className="col-lg-6">
                <div className="form-group">
                  <label>Email</label>
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
                  <label>Mật Khẩu</label>
                  <input
                    type="password"
                    name="MatKhau"
                    className="form-control"
                    placeholder="matkhau123"
                    value={formData.MatKhau}
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
                  <label>Số Điện Thoại Cửa Hàng</label>
                  <input
                    type="text"
                    name="SDT_CuaHang"
                    className="form-control"
                    placeholder="0902345678"
                    value={formData.SDT_CuaHang}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              <div className="col-lg-6">
                <div className="form-group">
                  <label>Email Cửa Hàng</label>
                  <input
                    type="email"
                    name="Email_CuaHang"
                    className="form-control"
                    placeholder="baobinhbilliards@example.com"
                    value={formData.Email_CuaHang}
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
                <button type="submit" className="theme-btn" disabled={loading}>
                  {loading ? "Đang thêm..." : "Thêm cửa hàng"}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateStore;
