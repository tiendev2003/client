import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { uploadImage } from "../../../features/sanpham/sanphamSlice";

const CreateStore = () => {
  const dispatch = useDispatch();
  const fileInputRef = useRef(null);
  const fileInputRefGPKD = useRef(null);
  const fileInputRefGallery = useRef(null);
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
  const [onChangeImage, setOnChangeImage] = useState(false);
  const [onChangeImageGPKD, setOnChangeImageGPKD] = useState(false);
  const [multipleImagePreview, setMultipleImagePreview] = useState([]);
  const [multipleImage, setMultipleImage] = useState([]);

  const [loading, setLoading] = useState(false);
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
    if (
      selectedProvince === "" ||
      selectedDistrict === "" ||
      selectedWard === ""
    ) {
      return toast.error("Vui lòng chọn đầy đủ thông tin địa chỉ");
    }
    let updatedFormData = { ...formData };
    setLoading(true);
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
      const gallery = [];
      for (let i = 0; i < multipleImage.length; i++) {
        const image = await dispatch(uploadImage(multipleImage[i])).unwrap();
        gallery.push(image);
      }
      updatedFormData = {
        ...updatedFormData,
        gallery,
      };
      console.log(updatedFormData);

      toast.success("Cửa hàng đã được tạo thành công");
    } catch (err) {
      toast.error(err.message || "Tạo cửa hàng thất bại");
    } finally {
      setLoading(false);
    }
  };
  const handleImageUploadClick = () => {
    fileInputRef.current.click();
    setOnChangeImage(true);
  };

  const handleImageUploadClickGPKD = () => {
    fileInputRefGPKD.current.click();
    setOnChangeImageGPKD(true);
  };
  const handleFileChangeGallery = (e) => {
    setMultipleImagePreview([]);
    setMultipleImage([]);
    console.log(e.target.files);
    for (let i = 0; i < e.target.files.length; i++) {
      setMultipleImage((prevData) => [...prevData, e.target.files[i]]);
      setMultipleImagePreview((prevData) => [
        ...prevData,
        URL.createObjectURL(e.target.files[i]),
      ]);
    }
  };

  const handleFileChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.files[0],
    }));
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
                  <label>Ảnh đại diện của hàng</label>
                  <div className="listing-upload-wrapper">
                    <div
                      className="listing-img-upload"
                      onClick={handleImageUploadClick}
                    >
                      <span>
                        {onChangeImage && (
                          <img
                            src={URL.createObjectURL(
                              formData.AnhDaiDien_CuaHang
                            )}
                            alt="Preview"
                            style={{
                              width: "100px",
                              height: "100px",
                              marginTop: "10px",
                            }}
                          />
                        )}
                        {formData.AnhDaiDien_CuaHang && !onChangeImage ? (
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
                        {onChangeImageGPKD && (
                          <img
                            src={URL.createObjectURL(formData.AnhGPKD)}
                            alt="Preview"
                            style={{
                              width: "100px",
                              height: "100px",
                              marginTop: "10px",
                            }}
                          />
                        )}
                        {formData.AnhGPKD && !onChangeImageGPKD ? (
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
                      id="gallery-photo-add1"
                      ref={fileInputRefGPKD}
                      name="AnhGPKD"
                      onChange={handleFileChange}
                      multiple
                    />
                  </div>
                </div>
              </div>
              {/*  mutiple image */}
              <div className="col-lg-12">
                <div className="form-group">
                  <label>Gallery</label>
                  <div className="listing-upload-wrapper">
                    <div
                      className="listing-img-upload"
                      onClick={() => fileInputRefGallery.current.click()}
                    >
                      <span>
                        {
                          <div className="image-preview mr-2">
                            {multipleImagePreview.map((img, index) => (
                              <img
                                key={index}
                                src={img}
                                alt="Preview"
                                className="mr-2"
                                style={{
                                  width: "100px",
                                  height: "100px",
                                  marginTop: "10px",
                                }}
                              />
                            ))}
                          </div>
                        }
                        {multipleImage.length === 0 && (
                          <React.Fragment>
                            <i className="far fa-images"></i> Upload listing
                            Images
                          </React.Fragment>
                        )}
                      </span>
                    </div>
                    <input
                      type="file"
                      className="listing-img-file"
                      id="gallery-photo-add2"
                      ref={fileInputRefGallery}
                      name="gallery"
                      onChange={handleFileChangeGallery}
                      multiple
                    />
                  </div>
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
