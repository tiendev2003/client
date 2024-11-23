import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

import { createBanners } from "../../../features/banner/bannerSlice";
import { fetchDanhMucQCs } from "../../../features/danhmucaqc/danhmucaqcSlice";
import { uploadImage } from "../../../features/sanpham/sanphamSlice";

const CreateBanner = () => {
  const dispatch = useDispatch();
  const fileInputRef = useRef(null);
  const [formData, setFormData] = useState({
    dmanhqc_id: "",
    title: "",
    image_url: "",
    link_url: "",
    status: "1",
    start_date: "",
    end_date: "",
  });
  const { danhmucqcs } = useSelector((state) => state.danhmucaqc);
  const [categories, setCategories] = useState([]);
  const [onChangeImage, setOnChangeImage] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    dispatch(fetchDanhMucQCs());
  }, [dispatch]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.image_url =="" || formData.link_url=="") {
      toast.error("Vui lòng chọn ảnh banner");
      return;
    }
    let updatedFormData = { ...formData };
    setLoading(true);
    try {
      if (onChangeImage) {
        const image = await dispatch(uploadImage(formData.image_url)).unwrap();
        console.log(image);
        updatedFormData = {
          ...updatedFormData,
          image_url: image,
          link_url: image,
        };
      }
      await dispatch(createBanners(updatedFormData)).unwrap();
      toast.success("Banner đã được tạo thành công");
    } catch (err) {
      console.log(err);
      toast.error(err.message || "Tạo banner thất bại");
    } finally {
      setLoading(false);
      setOnChangeImage(false);
    }
  };

  const handleImageUploadClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.files[0],
    }));
    if (e.target.name === "image_url") {
      setOnChangeImage(true);
    }
  };

  return (
    <div className="user-profile-card add-listing">
      <div className="user-profile-card-header">
        <h4 className="user-profile-card-title">Tạo Banner</h4>
        <div className="user-profile-card-header-right">
          <ul className="breadcrumb-menu d-flex gap-3">
            <li>
              <Link to="/admin/management-banner">Danh sách</Link>
            </li>
            /<li className="active">Tạo Banner</li>
          </ul>
        </div>
      </div>
      <div className="col-lg-12">
        <div className="add-listing-form">
          <form onSubmit={handleSubmit}>
            <div className="row align-items-center">
            <div className="col-lg-6">
                <div className="form-group">
                  <label>Tiêu đề</label>
                  <input
                    type="text"
                    name="title"
                    className="form-control"
                    placeholder="Nhập tiêu đề"
                    value={formData.title}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              <div className="col-lg-6">
                <div className="form-group">
                  <label>Danh mục quảng cáo</label>
                  <select
                    className="form-control"
                    name="dmanhqc_id"
                    value={formData.dmanhqc_id}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Chọn danh mục</option>
                    {danhmucqcs.map((item) => (
                      <option key={item.id} value={item.id}>
                        {item.tenDanhMuc}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              
             
             
              <div className="col-lg-6">
                <div className="form-group">
                  <label>Ngày bắt đầu</label>
                  <input
                    type="date"
                    name="start_date"
                    className="form-control"
                    value={formData.start_date}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              <div className="col-lg-6">
                <div className="form-group">
                  <label>Ngày kết thúc</label>
                  <input
                    type="date"
                    name="end_date"
                    className="form-control"
                    value={formData.end_date}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              <div className="col-lg-6">
                <div className="form-group">
                  <label>Trạng thái</label>
                  <select
                    className="form-control"
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                    required
                  >
                    <option value="" disabled>
                      Chọn trạng thái
                    </option>
                    <option value="1">Hiện</option>
                    <option value="0">Ẩn</option>
                  </select>
                </div>
              </div>
              <div className="col-lg-6">
                <div className="form-group">
                  <label>Ảnh Banner</label>
                  <div className="listing-upload-wrapper">
                    <div
                      className="listing-img-upload"
                      onClick={handleImageUploadClick}
                    >
                      <span>
                        {onChangeImage && (
                          <img
                            src={URL.createObjectURL(formData.image_url)}
                            alt="Preview"
                            style={{
                              width: "100px",
                              height: "100px",
                              marginTop: "10px",
                            }}
                          />
                        )}
                        {formData.image_url && !onChangeImage ? (
                          <div className="image-preview">
                            <img
                              src={formData.image_url}
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
                            <i className="far fa-images"></i> Upload Banner
                            Image
                          </>
                        )}
                      </span>
                    </div>
                    <input
                      type="file"
                      className="listing-img-file"
                      id="banner-photo-add"
                      ref={fileInputRef}
                      name="image_url"
                      onChange={handleFileChange}
                      multiple
                    />
                  </div>
                </div>
              </div>
              <div className="col-lg-12">
                <button type="submit" className="theme-btn" disabled={loading}>
                  {loading ? "Đang thêm..." : "Thêm Banner"}
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
