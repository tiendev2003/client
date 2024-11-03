import React from "react";

export const CreateService = () => {
  return (
    <div className="user-profile-card add-listing">
      <h4 className="user-profile-card-title">Thêm bàn</h4>
      <div className="col-lg-12">
        <div className="add-listing-form">
          <h5 className="mb-4">Basic Information</h5>
          <form>
            <div className="row align-items-center">
              <div className="col-lg-6">
                <div className="form-group">
                  <label>Service ID</label>
                  <input
                    type="text"
                    name="id_DichVu"
                    className="form-control"
                    placeholder="Enter service ID"
                    required
                  />
                </div>
              </div>
              <div className="col-lg-6">
                <div className="form-group">
                  <label>Status</label>
                  <select name="TrangThai" className="form-control">
                    <option value="0">Inactive</option>
                    <option value="1">Active</option>
                  </select>
                </div>
              </div>

              <div className="col-lg-12">
                <button type="submit" className="theme-btn">
                  Thêm dịch vụ
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
