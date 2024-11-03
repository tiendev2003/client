const ProfileBookingPage = () => {
  return (
    <div className="user-profile-card">
      <h4 className="user-profile-card-title">My Booking</h4>
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
              <td>08.</td>
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
                <a href="#" className="btn btn-outline-secondary btn-sm mr-2  ">
                  <i className="far fa-eye"></i>
                </a>
                <a href="#" className="btn btn-outline-danger btn-sm">
                  Cancel
                </a>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="pagination-area my-3">
        <div aria-label="Page navigation example">
          <ul className="pagination mt-0">
            <li className="page-item">
              <a className="page-link" href="#" aria-label="Previous">
                <span aria-hidden="true">
                  <i className="fa fa-angle-double-left"></i>
                </span>
              </a>
            </li>
            <li className="page-item active">
              <a className="page-link" href="#">
                1
              </a>
            </li>
            <li className="page-item">
              <a className="page-link" href="#">
                2
              </a>
            </li>
            <li className="page-item">
              <a className="page-link" href="#">
                3
              </a>
            </li>
            <li className="page-item">
              <a className="page-link" href="#" aria-label="Next">
                <span aria-hidden="true">
                  <i className="fa fa-angle-double-right"></i>
                </span>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ProfileBookingPage;
