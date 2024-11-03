import { Link } from "react-router-dom";

const ManageBilliardTables = () => {
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
          <Link to="create" className="theme-btn">
            <span className="fa fa-plus-circle"></span>Thêm bàn
          </Link>
        </div>
      </div>
      <div className="col-lg-12">
        <div className="table-responsive">
          <table className="table text-nowrap">
            <thead>
              <tr>
                <th>Table Name</th>
                <th>Price</th>
                <th>Brand</th>
                <th>Category ID</th>
                <th>Service ID</th>
                <th>Store ID</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <div className="table-listing-info">
                    <div className=" ">
                      <h6>Roltek Hotel &amp; Resort</h6>
                    </div>
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
                  <h6>Sep 21, 2024</h6>
                </td>
                <td>
                  <h6>Sep 21, 2024</h6>
                </td>
                <td>
                  <span className="badge bg-success">Active</span>
                </td>
                <td>
                  <Link href="#" className="btn btn-info btn-sm mr-2">
                    <i className="far fa-eye"></i>
                  </Link>

                  <Link
                    to={`/edit-table/${2}`}
                    className="btn btn-primary btn-sm mr-2"
                  >
                    <i className="fa fa-pen"></i>
                  </Link>

                  <a href="#" className="btn btn-danger btn-sm">
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

export default ManageBilliardTables;
