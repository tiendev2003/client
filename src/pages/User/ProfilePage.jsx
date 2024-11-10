import { useSelector } from "react-redux";
import { formatDate } from "../../utils/dateHelpers";

const ProfilePage = () => {
  const { userInfo } = useSelector((state) => state.auth);
  return (
    <div className="user-profile-card">
      <h4 className="user-profile-card-title">Thông tin</h4>
      <div className="col-lg-6">
        <div className="profile-info-list">
          <ul>
            <li>
              Tên đầy đủ: <span>{userInfo.TenNguoiDung}</span>
            </li>
            <li>
              Email: <span>{userInfo.Email}</span>
            </li>
            <li>
              Số điện thoại: <span>{userInfo.SDT}</span>
            </li>
         
            <li>
              Tham gia ngày: <span>{formatDate(userInfo.created_at)}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
