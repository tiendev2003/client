import { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";

import { useDispatch, useSelector } from "react-redux";
import { getDanhMucs } from "../../../features/danhmucsanpham/danhMucSanPhamSlice";
import { getDichVu } from "../../../features/dichvu/dichVuSlice";
import {
  fetchProductById,
  updateProduct,
} from "../../../features/sanpham/sanphamSlice";
export const EditSanpham = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { product, loading } = useSelector((state) => state.products);
  const { userInfo } = useSelector((state) => state.auth);
  const { danhMucs } = useSelector((state) => state.danhMucSanPham);
  const { dichvus } = useSelector((state) => state.dichvu);

  const [formData, setFormData] = useState({
    TenSanPham: "",
    Gia: "",
    SoLuong: "",
    HinhAnh: null,
    id_DMSP: "",
    id_DichVu: "",
  });
  const fileInputRef = useRef(null);
  useEffect(() => {
    if (product) {
      setFormData({
        TenSanPham: product.TenSanPham,
        Gia: product.Gia,
        SoLuong: product.SoLuong,
        HinhAnh: product.HinhAnh,
        id_DMSP: product.id_DMSP,
        id_DichVu: product.id_DichVu,
      });
    }
  }, [product]);
  
  useEffect(() => {
    dispatch(getDanhMucs(userInfo.cuahang.id));
    dispatch(getDichVu(userInfo.cuahang.id));
    dispatch(fetchProductById({
      id: id,
      cuahang: userInfo.cuahang.id
    }));
  }, [dispatch, userInfo.cuahang.id, id]);

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
      const updatedProductData = {
        ...formData,
        id,
      };
      await dispatch(updateProduct(updatedProductData)).unwrap();
      toast.success("Product updated successfully");
    } catch (err) {
      toast.error(err.message || "Failed to update product");
    }
  };
  return (
    <div className="user-profile-card add-listing">
      <div className="user-profile-card-header">
        <h4 className="user-profile-card-title">Sửa sản phẩm</h4>
        <div className="user-profile-card-header-right">
          <ul className="breadcrumb-menu d-flex gap-3">
            <li>
              <Link to="/store/manage-sanpham">Danh sách sản phẩm</Link>
            </li>
            /<li className="active">Sửa sản phẩm</li>
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
                              src={formData.HinhAnh}
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
              <div className="col-lg-6">
                <div className="form-group">
                  <label>Danh mục sản phẩm</label>
                  <select
                    name="id_DMSP"
                    className="form-control"
                    value={formData.id_DMSP}
                    onChange={handleChange}
                    required
                  >
                    <option value="" disabled >Chọn danh mục</option>
                    {danhMucs.map((danhMuc) => (
                      <option key={danhMuc.id} value={danhMuc.id}>
                        {danhMuc.TenDMSP}
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
                    className="form-control"
                    value={formData.id_DichVu}
                    onChange={handleChange}
                    required
                  >
                    <option value="" disabled  >
                      Chọn dịch vụ
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
                  {loading ? "Loading..." : "Cập nhật"}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
