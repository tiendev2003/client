import { useSelector } from "react-redux";
import { formatDate } from "../../utils/dateHelpers";

const ProfilePage = () => {
  const { userInfo } = useSelector((state) => state.auth);
  return (
    <div className="user-profile-card">
      <h4 className="user-profile-card-title">Profile Info</h4>
      <div className="col-lg-6">
        <div className="profile-info-list">
          <ul>
            <li>
              Full Name: <span>{userInfo.TenNguoiDung}</span>
            </li>
            <li>
              Email: <span>{userInfo.Email}</span>
            </li>
            <li>
              Phone: <span>{userInfo.SDT}</span>
            </li>
         
            <li>
              Join Date: <span>{formatDate(userInfo.created_at)}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
