import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchBookingDetails } from "../../features/book/bookSlice";
const ProfileBookingDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { bookingDetails, loading, error } = useSelector(
    (state) => state.booking
  );

  useEffect(() => {
    dispatch(fetchBookingDetails(id));
  }, [dispatch, id]);

  if (loading) {
    return <div>Loading...</div>;
  }
  if (!bookingDetails) {
    return <div>No booking details found</div>;
  }
  const { booking_details, user_details, cuahang_data } = bookingDetails;

  return (
    <div className="user-profile-card">
      <h4 className="user-profile-card-title">Booking Details</h4>
     
      <h5 className="mt-2">Booking Information</h5>

      <div className="row align-items-center">
        <div className="col-lg-6">
          <div className="form-group">
            <label>Booking ID</label>
            <input
              type="text"
              className="form-control"
              value={booking_details?.id_DonDB}
              disabled
            />
          </div>
        </div>
        <div className="col-lg-6">
          <div className="form-group">
            <label>Booking Date</label>
            <input
              type="text"
              className="form-control"
              value={new Date(booking_details?.ngay_dat).toLocaleDateString()}
              disabled
            />
          </div>
        </div>
      </div>
      <h5 className="mt-2">User Information</h5>

      <div className="row align-items-center">
        <div className="col-lg-4">
          <div className="form-group">
            <label>Name</label>
            <input
              type="text"
              className="form-control"
              value={user_details?.ten_nguoi_dung}
              disabled
            />
          </div>
        </div>
        <div className="col-lg-4">
          <div className="form-group">
            <label>Email</label>
            <input
              type="text"
              className="form-control"
              value={user_details?.email}
              disabled
            />
          </div>
        </div>
        <div className="col-lg-4">
          <div className="form-group">
            <label>Phone</label>
            <input
              type="text"
              className="form-control"
              value={user_details?.sdt}
              disabled
            />
          </div>
        </div>
      </div>
      <h5 className="mt-2">Store Information</h5>

      <div className="row align-items-center">
        <div className="col-lg-6">
          <div className="form-group">
            <label>Store Name</label>
            <input
              type="text"
              className="form-control"
              value={cuahang_data?.TenCuaHang}
              disabled
            />
          </div>
        </div>
        <div className="col-lg-6">
          <div className="form-group">
            <label>Phone</label>
            <input
              type="text"
              className="form-control"
              value={cuahang_data?.SDT}
              disabled
            />
          </div>
        </div>
        <div className="col-lg-6">
          <div className="form-group">
            <label>Email</label>
            <input
              type="text"
              className="form-control"
              value={cuahang_data?.Email}
              disabled
            />
          </div>
        </div>
        <div className="col-lg-6">
          <div className="form-group">
            <label>Địa chỉ</label>
            <input
              type="text"
              className="form-control"
              value={cuahang_data?.DiaChi}
              disabled
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileBookingDetail;
