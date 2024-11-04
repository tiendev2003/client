export const CreateService = () => {
  return (
    <div className="user-profile-card add-listing">
      <h4 className="user-profile-card-title">Thêm dịch vụ</h4>
      <div className="col-lg-12">
        <div className="add-listing-form">
          <form>
            <div className="row align-items-center">
              <div className="col-lg-6">
                <div className="form-group">
                  <label>Tên dịch vụ</label>
                  <input
                    type="text"
                    name="namedichvu"
                    className="form-control"
                    placeholder="Enter service ID"
                    required
                  />
                </div>
              </div>
              <div className="col-lg-6">
                <div className="form-group">
                  <label>Trạng thái</label>
                  <select name="TrangThai" className="form-control">
                    <option value="0">Ẩn </option>
                    <option value="1">Hiện</option>
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
