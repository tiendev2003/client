import React, { useState } from 'react';

export const CreateBilliardTable = () => {
  const [formData, setFormData] = useState({
    TenBan: '',
    GiaBan: '',
    HangBan: '',
    id_DMBan: '',
    id_DichVu: '',
    TrangThai: '0',
    id_CuaHang: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log(formData);
  };

  return (
    <div className="user-profile-card add-listing">
      <h4 className="user-profile-card-title">Thêm bàn</h4>
      <div className="col-lg-12">
        <div className="add-listing-form">
          <h5 className="mb-4">Basic Information</h5>
          <form onSubmit={handleSubmit}>
            <div className="row align-items-center">
              <div className="col-lg-6">
                <div className="form-group">
                  <label>Table Name</label>
                  <input
                    type="text"
                    name="TenBan"
                    className="form-control"
                    placeholder="Enter table name"
                    value={formData.TenBan}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              <div className="col-lg-6">
                <div className="form-group">
                  <label>Table Price</label>
                  <input
                    type="number"
                    name="GiaBan"
                    className="form-control"
                    placeholder="Enter table price"
                    value={formData.GiaBan}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              <div className="col-lg-6">
                <div className="form-group">
                  <label>Table Brand</label>
                  <input
                    type="text"
                    name="HangBan"
                    className="form-control"
                    placeholder="Enter table brand"
                    value={formData.HangBan}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="col-lg-6">
                <div className="form-group">
                  <label>Table Category ID</label>
                  <input
                    type="number"
                    name="id_DMBan"
                    className="form-control"
                    placeholder="Enter table category ID"
                    value={formData.id_DMBan}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              <div className="col-lg-6">
                <div className="form-group">
                  <label>Service ID</label>
                  <input
                    type="number"
                    name="id_DichVu"
                    className="form-control"
                    placeholder="Enter service ID"
                    value={formData.id_DichVu}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              <div className="col-lg-6">
                <div className="form-group">
                  <label>Status</label>
                  <select
                    name="TrangThai"
                    className="form-control"
                    value={formData.TrangThai}
                    onChange={handleChange}
                  >
                    <option value="0">Inactive</option>
                    <option value="1">Active</option>
                  </select>
                </div>
              </div>
              <div className="col-lg-6">
                <div className="form-group">
                  <label>Store ID</label>
                  <input
                    type="number"
                    name="id_CuaHang"
                    className="form-control"
                    placeholder="Enter store ID"
                    value={formData.id_CuaHang}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="col-lg-12">
                <button type="submit" className="theme-btn">
                  Thêm bàn
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};