const ProfileSettingPage = () => {
  return (
    <>
      <div className="col-lg-12 mb-4">
        <div className="user-profile-card">
          <h4 className="user-profile-card-title">Update Profile Info</h4>
          <div className="user-profile-form">
            <form action="#">
              <div className="row">
                <div className="col-md-6">
                  <div className="form-group">
                    <label>First Name</label>
                    <input
                      type="text"
                      className="form-control"
                      value="Antoni"
                      placeholder="First Name"
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label>Last Name</label>
                    <input
                      type="text"
                      className="form-control"
                      value="Jonson"
                      placeholder="Last Name"
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label>Email</label>
                    <input
                      type="text"
                      className="form-control"
                      value="jonson@example.com"
                      placeholder="Email"
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label>Phone</label>
                    <input
                      type="text"
                      className="form-control"
                      value="+2 134 562 458"
                      placeholder="Phone"
                    />
                  </div>
                </div>
                <div className="col-md-12">
                  <div className="form-group">
                    <label>Address</label>
                    <input
                      type="text"
                      className="form-control"
                      value="New York, USA"
                      placeholder="Address"
                    />
                  </div>
                </div>
              </div>
              <button type="button" className="theme-btn mt-4">
                Update Profile Info <i className="far fa-user"></i>
              </button>
            </form>
          </div>
        </div>
      </div>
      <div className="col-lg-12">
        <div className="user-profile-card">
          <h4 className="user-profile-card-title">Change Password</h4>
          <div className="col-lg-12">
            <div className="user-profile-form">
              <form action="#">
                <div className="form-group">
                  <label>Old Password</label>
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Old Password"
                  />
                </div>
                <div className="form-group">
                  <label>New Password</label>
                  <input
                    type="password"
                    className="form-control"
                    placeholder="New Password"
                  />
                </div>
                <div className="form-group">
                  <label>Re-Type Password</label>
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Re-Type Password"
                  />
                </div>
                <button type="button" className="theme-btn mt-4">
                  Change Password <i className="far fa-key"></i>
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfileSettingPage;
