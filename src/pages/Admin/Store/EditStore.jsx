import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { uploadImage } from "../../../features/sanpham/sanphamSlice";
import {
  fetchCuahangDetail,
  updateStore,
} from "../../../features/shop/shopSlice";

const EditStore = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const [province, setProvince] = useState([]);
  const [district, setDistrict] = useState([]);
  const [ward, setWard] = useState([]);
  const [onChangeImage, setOnChangeImage] = useState(false);
  const [onChangeImageGPKD, setOnChangeImageGPKD] = useState(false);

  const [selectedProvince, setSelectedProvince] = useState();
  const [selectedDistrict, setSelectedDistrict] = useState();
  const [selectedWard, setSelectedWard] = useState();
  const [loading, setLoading] = useState(false);
  const { cuahangDetail } = useSelector((state) => state.shop);

  const [formData, setFormData] = useState({
    TenCuaHang: "",
    SDT: "",
    MaSoThue: "",
    Email: "",
    DiaChi: "",
    AnhDaiDien_CuaHang: "",
    AnhGPKD: "",
    TrangThai: 0,
    tinh_thanhpho: "",
    quan_huyen: "",
    phuong_xa: "",
  });

  const fileInputRef = useRef(null);
  const fileInputRefGPKD = useRef(null);

  useEffect(() => {
    dispatch(fetchCuahangDetail(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (cuahangDetail) {
      console.log(cuahangDetail);
      setFormData({
        TenCuaHang: cuahangDetail.TenCuaHang,
        SDT: cuahangDetail.SDT,
        MaSoThue: cuahangDetail.MaSoThue,
        Email: cuahangDetail.Email,
        DiaChi: cuahangDetail.DiaChi,
        AnhDaiDien_CuaHang: cuahangDetail.AnhDaiDien_CuaHang,
        AnhGPKD: cuahangDetail.AnhGPKD,
        TrangThai: cuahangDetail.TrangThai,
        tinh_thanhpho: cuahangDetail.tinh_thanhpho,
        quan_huyen: cuahangDetail.quan_huyen,
        phuong_xa: cuahangDetail.phuong_xa,
      });
    }
  }, [cuahangDetail]);

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

  useEffect(() => {
    if (cuahangDetail && province.length > 0) {
      setSelectedProvince(
        province.find(
          (item) => item.name.toString() === cuahangDetail.tinh_thanhpho
        ).code
      );
    }
    if (cuahangDetail && district.length > 0) {
      setSelectedDistrict(
        district.find(
          (item) => item.name.toString() === cuahangDetail.quan_huyen
        ).code
      );
    }

    if (cuahangDetail && ward.length > 0) {
      setSelectedWard(
        ward.find((item) => item.name.toString() === cuahangDetail.phuong_xa)
          .code
      );
    }
  }, [province, district, ward, cuahangDetail]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleImageUploadClick = () => {
    fileInputRef.current.click();
    setOnChangeImage(true);
  };

  const handleImageUploadClickGPKD = () => {
    fileInputRefGPKD.current.click();
    setOnChangeImageGPKD(true);
  };

  const handleFileChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.files[0],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      selectedProvince === "" ||
      selectedDistrict === "" ||
      selectedWard === ""
    ) {
      return toast.error("Vui lòng chọn đầy đủ thông tin địa chỉ");
    }
    setLoading(true);
    let updatedFormData = { ...formData };

    try {
      if (onChangeImage) {
        const image = await dispatch(
          uploadImage(formData.AnhDaiDien_CuaHang)
        ).unwrap();

        updatedFormData = {
          ...updatedFormData,
          AnhDaiDien_CuaHang: image,
        };
      }
      if (onChangeImageGPKD) {
        const AnhGPKD = await dispatch(uploadImage(formData.AnhGPKD)).unwrap();
        updatedFormData = {
          ...updatedFormData,
          AnhGPKD: AnhGPKD,
        };
      }
      setFormData(updatedFormData);
      await dispatch(
        updateStore({ id: cuahangDetail.id, ...updatedFormData })
      ).unwrap();
      toast.success("Thông tin cửa hàng đã được cập nhật thành công");
    } catch (err) {
      toast.error(err.message || "Cập nhật thông tin cửa hàng thất bại");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="user-profile-card add-listing">
      <div className="user-profile-card-header">
        <h4 className="user-profile-card-title">Cập nhật thông tin cửa hàng</h4>
        <div className="user-profile-card-header-right">
          <ul className="breadcrumb-menu d-flex gap-3">
            <li>
              <Link to="/admin/management-store">Danh sách</Link>
            </li>
            /<li className="active">Cập nhật cửa hàng</li>
          </ul>
        </div>
      </div>
      <div className="col-lg-12">
        <div className="add-listing-form">
          <form onSubmit={handleSubmit}>
            <div className="row align-items-center">
              <div className="col-lg-6">
                <div className="form-group">
                  <label>Tên Cửa Hàng</label>
                  <input
                    type="text"
                    name="TenCuaHang"
                    className="form-control"
                    value={formData.TenCuaHang}
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
                    value={formData.SDT}
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
                    value={formData.MaSoThue}
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
                    value={formData.Email}
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
                    value={formData.DiaChi}
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
                    value={selectedProvince}
                    onChange={(e) => {
                      e.preventDefault();
                      setSelectedProvince(e.target.value);
                      setFormData((prevData) => ({
                        ...prevData,
                        tinh_thanhpho: province.find(
                          (item) => item.code.toString() === e.target.value
                        ).name,
                      }));
                    }}
                    required
                  >
                    <option value="">Chọn tỉnh/thành phố</option>
                    {province &&
                      province.map((item) => (
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
                    value={selectedDistrict}
                    onChange={(e) => {
                      e.preventDefault();
                      setSelectedDistrict(e.target.value);
                      setFormData((prevData) => ({
                        ...prevData,
                        quan_huyen: district.find(
                          (item) => item.code.toString() === e.target.value
                        ).name,
                      }));
                    }}
                    required
                  >
                    <option value="">Chọn quận/huyện</option>
                    {district &&
                      district.map((item) => (
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
                    value={selectedWard}
                    onChange={(e) => {
                      e.preventDefault();
                      setSelectedWard(e.target.value);
                      setFormData((prevData) => ({
                        ...prevData,
                        phuong_xa: ward.find(
                          (item) => item.code.toString() === e.target.value
                        ).name,
                      }));
                    }}
                    required
                  >
                    <option value="">Chọn phường/xã</option>
                    {ward &&
                      ward.map((item) => (
                        <option key={item.code} value={item.code}>
                          {item.name}
                        </option>
                      ))}
                  </select>
                </div>
              </div>
              <div className="col-lg-6">
                <div className="form-group">
                  <label>Trạng Thái</label>
                  <select
                    name="TrangThai"
                    className="form-control"
                    value={formData.TrangThai}
                    onChange={handleChange}
                    required
                  >
                    <option value={1}>Hoạt động</option>
                    <option value={0}>Không hoạt động</option>
                  </select>
                </div>
              </div>
              <div className="col-lg-6">
                <div className="form-group">
                  <label>Ảnh đại diện của hàng</label>
                  <div className="listing-upload-wrapper">
                    <div
                      className="listing-img-upload"
                      onClick={handleImageUploadClick}
                    >
                      <span>
                        {formData.AnhDaiDien_CuaHang ? (
                          <div className="image-preview">
                            <img
                              src={formData.AnhDaiDien_CuaHang}
                              alt="Preview"
                              style={{
                                width: "100px",
                                height: "100px",
                                marginTop: "10px",
                              }}
                            />
                          </div>
                        ) : (
                          <>
                            <i className="far fa-images"></i> Upload listing
                            Images
                          </>
                        )}
                      </span>
                    </div>
                    <input
                      type="file"
                      className="listing-img-file"
                      id="gallery-photo-add"
                      ref={fileInputRef}
                      name="AnhDaiDien_CuaHang"
                      onChange={handleFileChange}
                      multiple
                    />
                  </div>
                </div>
              </div>
              <div className="col-lg-6">
                <div className="form-group">
                  <label>Ảnh giấy phép kinh doanh</label>
                  <div className="listing-upload-wrapper">
                    <div
                      className="listing-img-upload"
                      onClick={handleImageUploadClickGPKD}
                    >
                      <span>
                        {formData.AnhGPKD ? (
                          <div className="image-preview">
                            <img
                              src={formData.AnhGPKD}
                              alt="Preview"
                              style={{
                                width: "100px",
                                height: "100px",
                                marginTop: "10px",
                              }}
                            />
                          </div>
                        ) : (
                          <>
                            <i className="far fa-images"></i> Upload listing
                            Images
                          </>
                        )}
                      </span>
                    </div>
                    <input
                      type="file"
                      className="listing-img-file"
                      id="gallery-photo-add"
                      ref={fileInputRefGPKD}
                      name="AnhGPKD"
                      onChange={handleFileChange}
                      multiple
                    />
                  </div>
                </div>
              </div>

              <div className="col-lg-12">
                <button type="submit" className="theme-btn" disabled={loading}>
                  {loading ? "Đang cập nhật..." : "Cập nhật thông tin"}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditStore;
