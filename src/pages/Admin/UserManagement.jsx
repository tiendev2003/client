import React from "react";

const UserManagement = () => {
  return (
    <div className="user-profile-card user-profile-listing">
      <div className="user-profile-card-header">
        <h4 className="user-profile-card-title">My Listing</h4>
        <div className="user-profile-card-header-right">
          <div className="user-profile-search">
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                placeholder="Search..."
              />
              <i className="fa fa-search"></i>
            </div>
          </div>
          <a href="#" className="theme-btn">
            <span className="fa fa-plus-circle"></span>Add Listing
          </a>
        </div>
      </div>
      <div className="col-lg-12">
        <div className="table-responsive">
          <table className="table text-nowrap">
            <thead>
              <tr>
                <th>Listing Info</th>
                <th>Type</th>
                <th>Views</th>
                <th>Publish On</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <div className="table-listing-info">
                    <a href="#">
                      <img src="assets/img/listing/01.jpg" alt="" />
                      <div className="table-listing-content">
                        <h6>Roltek Hotel &amp; Resort</h6>
                        <p>
                          <i className="fa fa-location-dot"></i> 25/B Milford
                          Road, NY
                        </p>
                        <span>$11,245</span>
                      </div>
                    </a>
                  </div>
                </td>
                <td>
                  <h6>Hotel</h6>
                </td>
                <td>
                  <h6>45k</h6>
                </td>
                <td>
                  <h6>Sep 21, 2024</h6>
                </td>
                <td>
                  <span className="badge bg-success">Active</span>
                </td>
                <td>
                  <a href="#" className="btn btn-outline-secondary btn-sm">
                    <i className="far fa-eye"></i>
                  </a>
                  <a href="#" className="btn btn-outline-secondary btn-sm">
                    <i className="fa fa-pen"></i>
                  </a>
                  <a href="#" className="btn btn-outline-secondary btn-sm">
                    <i className="far fa-trash-can"></i>
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
    </div>
  );
};

export default UserManagement;
