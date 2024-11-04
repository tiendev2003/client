import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import {
  addProduct,
  uploadImage,
} from "../../../features/sanpham/sanphamSlice";

export const CreateSanPham = () => {
  const [formData, setFormData] = useState({
    TenSanPham: "",
    Gia: 0,
    SoLuong: 0,
    HinhAnh: null,
    id_DMSP: 1,
    id_DichVu: 3,
    cuahangid: 1,
  });
  const fileInputRef = useRef(null);
  const { loading } = useSelector((state) => state.products);
  const { userInfo } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      HinhAnh: e.target.files[0],
    }));
  };
  const handleImageUploadClick = () => {
    fileInputRef.current.click();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const imageUrl = await dispatch(uploadImage(formData.HinhAnh)).unwrap();
      console.log(imageUrl);
      const productData = {
        ...formData,
        HinhAnh: imageUrl,
        cuahangid: userInfo.cuahang.id,
      };
      await dispatch(addProduct(productData)).unwrap();
      toast.success("Product added successfully");
    } catch (err) {
      toast.error(err.message || "Failed to add product");
    }
  };
  return (
    <div className="user-profile-card add-listing">
      <div className="user-profile-card-header">
        <h4 className="user-profile-card-title">Thêm sản phẩm</h4>
        <div className="user-profile-card-header-right">
          <ul className="breadcrumb-menu d-flex gap-3">
            <li>
              <Link to="/store/manage-sanpham">Danh sách sản phẩm</Link>
            </li>
            /<li className="active">Thêm sản phẩm</li>
          </ul>
        </div>
      </div>

      <div className="col-lg-12">
        <div className="add-listing-form">
          <form onSubmit={handleSubmit}>
            <div className="row align-items-center">
              <div className="col-lg-6">
                <div className="form-group">
                  <label>Tên sản phẩm</label>
                  <input
                    type="text"
                    name="TenSanPham"
                    className="form-control"
                    placeholder="Sting"
                    required
                    value={formData.TenSanPham}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="col-lg-6">
                <div className="form-group">
                  <label>Giá</label>
                  <input
                    type="number"
                    name="Gia"
                    className="form-control"
                    placeholder="11"
                    value={formData.Gia}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              <div className="col-lg-6">
                <div className="form-group">
                  <label>Số lượng</label>
                  <input
                    type="number"
                    name="SoLuong"
                    className="form-control"
                    placeholder="222 "
                    value={formData.SoLuong}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              <div className="col-lg-6">
                <div className="form-group">
                  <div className="listing-upload-wrapper">
                    <div
                      className="listing-img-upload"
                      onClick={handleImageUploadClick}
                    >
                      <span>
                        {formData.HinhAnh ? (
                          <div className="image-preview">
                            <img
                              src={URL.createObjectURL(formData.HinhAnh)}
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
                      name="HinhAnh"
                      onChange={handleFileChange}
                      multiple
                    />
                  </div>
                </div>
              </div>

              <div className="col-lg-12">
                <button type="submit" className="theme-btn" disabled={loading}>
                  {loading ? "Loading..." : "Thêm sản phẩm"}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};