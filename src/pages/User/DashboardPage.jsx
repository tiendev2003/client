const DashboardPage = () => {
  return (
    <>
      <div className="row">
        <div className="col-md-6 col-lg-4">
          <div className="dashboard-widget dashboard-widget-color-1">
            <div className="dashboard-widget-info">
              <h1>120</h1>
              <span>Total Booking</span>
            </div>
            <div className="dashboard-widget-icon">
              <i className="fa fa-shopping-bag"></i>
            </div>
          </div>
        </div>
        <div className="col-md-6 col-lg-4">
          <div className="dashboard-widget dashboard-widget-color-2">
            <div className="dashboard-widget-info">
              <h1>26</h1>
              <span>Pending Booking</span>
            </div>
            <div className="dashboard-widget-icon">
            <i className="fa-solid fa-spinner"></i>
            </div>
          </div>
        </div>
        <div className="col-md-6 col-lg-4">
          <div className="dashboard-widget dashboard-widget-color-3">
            <div className="dashboard-widget-info">
              <h1>$60,050</h1>
              <span>You Earned</span>
            </div>
            <div className="dashboard-widget-icon">
              <i className="fa fa-sack-dollar"></i>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-lg-12">
          <div className="user-profile-card profile-booking">
            <h4 className="user-profile-card-title">Recent Booking</h4>
            <div className="table-responsive">
              <table className="table text-nowrap">
                <thead>
                  <tr>
                    <th>No</th>
                    <th>Booking ID</th>
                    <th>Type</th>
                    <th>Date</th>
                    <th>Price</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>01.</td>
                    <td>
                      <b>#12453</b>
                    </td>
                    <td>Hotel</td>
                    <td>Oct 22, 2024</td>
                    <td>$11,569</td>
                    <td>
                      <span className="badge badge-success">Confirmed</span>
                    </td>
                    <td>
                      <a href="#" className="btn btn-outline-secondary btn-sm">
                        <i className="far fa-eye"></i>
                      </a>
                    </td>
                  </tr>
                  <tr>
                    <td>02.</td>
                    <td>
                      <b>#12453</b>
                    </td>
                    <td>Flight</td>
                    <td>Oct 22, 2024</td>
                    <td>$11,569</td>
                    <td>
                      <span className="badge badge-success">Confirmed</span>
                    </td>
                    <td>
                      <a href="#" className="btn btn-outline-secondary btn-sm">
                        <i className="far fa-eye"></i>
                      </a>
                    </td>
                  </tr>
                  <tr>
                    <td>03.</td>
                    <td>
                      <b>#12453</b>
                    </td>
                    <td>Activity</td>
                    <td>Oct 22, 2024</td>
                    <td>$11,569</td>
                    <td>
                      <span className="badge badge-warning">Pending</span>
                    </td>
                    <td>
                      <a href="#" className="btn btn-outline-secondary btn-sm">
                        <i className="far fa-eye"></i>
                      </a>
                    </td>
                  </tr>
                  <tr>
                    <td>04.</td>
                    <td>
                      <b>#12453</b>
                    </td>
                    <td>Car</td>
                    <td>Oct 22, 2024</td>
                    <td>$11,569</td>
                    <td>
                      <span className="badge badge-success">Confirmed</span>
                    </td>
                    <td>
                      <a href="#" className="btn btn-outline-secondary btn-sm">
                        <i className="far fa-eye"></i>
                      </a>
                    </td>
                  </tr>
                  <tr>
                    <td>05.</td>
                    <td>
                      <b>#12453</b>
                    </td>
                    <td>Cruise</td>
                    <td>Oct 22, 2024</td>
                    <td>$11,569</td>
                    <td>
                      <span className="badge badge-danger">Cancel</span>
                    </td>
                    <td>
                      <a href="#" className="btn btn-outline-secondary btn-sm">
                        <i className="far fa-eye"></i>
                      </a>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DashboardPage;
