import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

const CreateBanner = () => {
  const [formData, setFormData] = useState({
    TenHinhAnh: "",
    HinhAnh_URL: "",
    id_DMHinhAnh: 1,

  });
  const fileInputRef = useRef(null);

  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.banner);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  };
  const handleImageUploadClick = () => {
    fileInputRef.current.click();
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
        <h4 className="user-profile-card-title">Thêm ảnh</h4>
        <div className="user-profile-card-header-right">
          <ul className="breadcrumb-menu d-flex gap-3">
            <li>
              <Link to="/admin/banner">Danh sách</Link>
            </li>
            /<li className="active">Thêm ảnh</li>
          </ul>
        </div>
      </div>
      <div className="col-lg-12">
        <div className="add-listing-form">
          <form onSubmit={handleSubmit}>
            <div className="row align-items-center">
              <div className="col-lg-6">
                <div className="form-group">
                  <label>Tên Ảnh</label>
                  <input
                    type="text"
                    name="TenQ"
                    className="form-control"
                    placeholder="Tên quyền"
                    value={formData.TenQ}
                    onChange={handleChange}
                    required
                  />
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
              <div className="col-lg-12">
                <button type="submit" className="theme-btn" disabled={loading}>
                  {loading ? "Đang thêm..." : "Thêm quyền"}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateBanner;
