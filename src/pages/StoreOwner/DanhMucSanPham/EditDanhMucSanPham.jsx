import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import {
  getDanhMucById,
  updateDanhMuc,
} from "./../../../features/danhmucsanpham/danhMucSanPhamSlice";

export const EditDanhMucSanPham = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    TenDMSP: "",
    TrangThai: 1,
  });

  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.dichvu);
  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getDanhMucById({
      id,
      idDanhMuc: userInfo.cuahang.id,
    }));
  }, [dispatch, id, userInfo.cuahang.id]);

  const { danhMuc } = useSelector((state) => state.danhMucSanPham);

  useEffect(() => {
    if (danhMuc) {
      setFormData({
        TenDMSP: danhMuc.TenDMSP,
        TrangThai: danhMuc.TrangThai
      });
    }
  }, [danhMuc]);

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
        updateDanhMuc({
          id: userInfo.cuahang.id,
          idDanhMuc: id,
          ...formData,
        })
      ).unwrap();
      toast.success("Sửa thành công");
      navigate("/store/manage-category-sanpham");
    } catch (err) {
      toast.error(err.message || "Sửa thất bại");
    }
  };
  return (
    <div className="user-profile-card add-listing">
      <div className="user-profile-card-header">
        <h4 className="user-profile-card-title">Sửa danh mục sản phẩm</h4>
        <div className="user-profile-card-header-right">
          <ul className="breadcrumb-menu d-flex gap-3">
            <li>
              <Link to="/store/manage-services">Danh sách</Link>
            </li>
            /<li className="active">Sửa danh mục sản phẩm</li>
          </ul>
        </div>
      </div>
      <div className="col-lg-12">
        <div className="add-listing-form">
          <form onSubmit={handleSubmit}>
            <div className="row align-items-center">
              <div className="col-lg-6">
                <div className="form-group">
                  <label>Tên danh mục sản phẩm</label>
                  <input
                    type="text"
                    value={formData.TenDMSP}
                    onChange={handleChange}
                    name="TenDMSP"
                    className="form-control"
                    placeholder="Thuê bàn bi-a"
                    required
                  />
                </div>
              </div>
              <div className="col-lg-6">
                <div className="form-group">
                  <label>Trạng thái</label>
                  <select
                    name="TrangThai"
                    value={formData.TrangThai}
                    onChange={handleChange}
                    className="form-control"
                  >
                    <option value={1}>Hoạt động</option>
                    <option value={0}>Không hoạt động</option>
                  </select>
                </div>
              </div>

              <div className="col-lg-12">
                <button type="submit" className="theme-btn" disabled={loading}>
                  {loading ? "Đang sửa..." : "Sửa danh mục sản phẩm"}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
