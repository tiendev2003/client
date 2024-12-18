import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { uploadImage } from "../../features/sanpham/sanphamSlice";
import { updateStore } from "../../features/shop/shopSlice";

export const SettingStore = () => {
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.auth);
  const [province, setProvince] = useState([]);
  const [district, setDistrict] = useState([]);
  const [ward, setWard] = useState([]);
  const [onChangeImage, setOnChangeImage] = useState(false);
  const [onChangeImageGPKD, setOnChangeImageGPKD] = useState(false);
  const [selectedImages, setSelectedImages] = useState([]);

  const [selectedProvince, setSelectedProvince] = useState();
  const [selectedDistrict, setSelectedDistrict] = useState();
  const [selectedWard, setSelectedWard] = useState();
  const [loading, setLoading] = useState(false);

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
    if (userInfo.cuahang) {
      setFormData({
        TenCuaHang: userInfo.cuahang.TenCuaHang,
        SDT: userInfo.cuahang.SDT,
        MaSoThue: userInfo.cuahang.MaSoThue,
        Email: userInfo.cuahang.Email,
        DiaChi: userInfo.cuahang.DiaChi,
        AnhDaiDien_CuaHang: userInfo.cuahang.AnhDaiDien_CuaHang,
        AnhGPKD: userInfo.cuahang.AnhGPKD,
        TrangThai: userInfo.cuahang.TrangThai,
        tinh_thanhpho: userInfo.cuahang.tinh_thanhpho,
        quan_huyen: userInfo.cuahang.quan_huyen,
        phuong_xa: userInfo.cuahang.phuong_xa,
      });
    }
  }, [userInfo.cuahang]);
  useEffect(() => {
    if (userInfo.cuahang && province.length > 0) {
      setSelectedProvince(
        province.find(
          (item) => item.name.toString() === userInfo.cuahang.tinh_thanhpho
        )?.code
      );
    }
    if (userInfo.cuahang && district.length > 0) {
      setSelectedDistrict(
        district.find(
          (item) => item.name.toString() === userInfo.cuahang.quan_huyen
        )?.code
      );
    }

    if (userInfo.cuahang && ward.length > 0) {
      setSelectedWard(
        ward.find((item) => item.name.toString() === userInfo.cuahang.phuong_xa)
          ?.code
      );
    }
  }, [province, district, ward, userInfo.cuahang]);

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
    if (userInfo.cuahang && province.length > 0) {
      setSelectedProvince(
        province.find(
          (item) => item.name.toString() === userInfo.cuahang.tinh_thanhpho
        )?.code 
      );
    }
    if (userInfo.cuahang && district.length > 0) {
      setSelectedDistrict(
        district.find(
          (item) => item.name.toString() === userInfo.cuahang.quan_huyen
        )?.code
      );
    }

    if (userInfo.cuahang && ward.length > 0) {
      setSelectedWard(
        ward.find((item) => item.name.toString() === userInfo.cuahang.phuong_xa)
          ?.code
      );
    }
  }, [province, district, ward, userInfo.cuahang]);

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

  const handleMultipleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setSelectedImages((prevImages) => [...prevImages, ...files]);
  };

  const handleRemoveImage = (index) => {
    setSelectedImages((prevImages) => prevImages.filter((_, i) => i !== index));
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
        updateStore({ id: userInfo.cuahang.id, ...updatedFormData })
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
                <div className="form-group">
                  <label>Hình ảnh chi tiết của quán</label>
                  <div className="listing-upload-wrapper">
                    <div className="listing-img-upload" onClick={() => fileInputRef.current.click()}>
                      <span>
                        <i className="far fa-images"></i> Upload listing Images
                      </span>
                    </div>
                    <input
                      type="file"
                      className="listing-img-file"
                      id="gallery-photo-add"
                      ref={fileInputRef}
                      name="AnhChiTiet"
                      onChange={handleMultipleFileChange}
                      multiple
                    />
                  </div>
                  <div className="image-preview-list" style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginTop: '10px' }}>
                    {selectedImages.map((image, index) => (
                      <div key={index} className="image-preview-item" style={{ position: 'relative' }}>
                        <img
                          src={URL.createObjectURL(image)}
                          alt={`Preview ${index}`}
                          style={{ width: '100px', height: '100px', objectFit: 'cover' }}
                        />
                        <button
                          type="button"
                          onClick={() => handleRemoveImage(index)}
                          style={{
                            position: 'absolute',
                            top: '5px',
                            right: '5px',
                            background: 'transparent',
                            border: 'none',
                            cursor: 'pointer',
                          }}
                        >
                          <i className="fas fa-trash" style={{ color: 'red' }}></i>
                        </button>
                      </div>
                    ))}
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
