import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { cancelBooking, historyBook } from "../../features/book/bookSlice";
import { formatMoney } from "../../utils/formatMoney";

const ProfileBookingPage = () => {
  const dispatch = useDispatch();
  const { bookings, loading } = useSelector((state) => state.booking);
  const [onChanging, setOnChanging] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  useEffect(() => {
    dispatch(historyBook());
  }, [dispatch]);

  useEffect(() => {
    if (onChanging) {
      dispatch(historyBook());
    }
  }, [onChanging, dispatch]);

  if (loading) {
    return <div>Loading...</div>;
  }

  const handleCancelBooking = (id) => async () => {
    try {
      await dispatch(cancelBooking(id)).unwrap();
      toast.success("Booking canceled successfully");
    } catch (error) {
      toast.error("Failed to cancel booking");
      console.error("Failed to cancel booking", error);
    }finally{
      setOnChanging(!onChanging);
    }
    
  };
  
  const tlength = (bookings && bookings.length) || 0;
  const totalPages = Math.ceil(tlength / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentBookings = !bookings
    ? []
    : bookings.slice(startIndex, startIndex + itemsPerPage);
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  return (
    <div className="user-profile-card">
      <h4 className="user-profile-card-title">My Booking</h4>
      <div className="table-responsive">
        <table className="table text-nowrap">
          <thead>
            <tr>
              <th>No</th>
              <th>Bàn id</th>
              <th>Cửa hàng</th>
              <th>Ngày đặt</th>
              <th>Email</th>
              <th>Giá</th>
              <th>Trạng thái</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {currentBookings &&
              currentBookings.map((booking, index) => (
                <tr key={booking.id_DonDatBan}>
                  <td>{index + 1}</td>
                  <td>{booking.ChiTietDatBan[0].id_Ban}</td>
                  <td>{booking.CuaHang.TenCuaHang || "N/A"}</td>
                  <td>{new Date(booking.ThoiGianTao).toLocaleDateString()}</td>
                  <td>{booking.CuaHang.Email}</td>
                  <td>
                    {formatMoney(booking.ChiTietDatBan[0].ThongTinBan.GiaBan)}
                  </td>
                  <td>
                    <span
                      className={`badge badge-${
                        booking.TrangThai === 1 ? "success" : "danger"
                      }`}
                    >
                      {booking.TrangThai === 1 ? "Xác nhận" : "Đã hủy"}
                    </span>
                  </td>
                  <td>
                    <Link
                      to={`/bookings/${booking.id_DonDatBan}`}
                      className="btn btn-outline-secondary btn-sm mr-2"
                    >
                      <i className="far fa-eye"></i>
                    </Link>
                    {booking.TrangThai === 1 && (
                      <button
                        onClick={handleCancelBooking(booking.id_DonDatBan)}
                        className="btn btn-outline-danger btn-sm mr-2"
                      >
                        <i className="far fa-trash-alt"></i>
                      </button>
                    )}
                    {/* xuất hóa đơn */}
                    
                  </td>
                </tr>
              ))}
            {!currentBookings && (
              <tr>
                <td colSpan="8">No bookings found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="pagination-area my-3">
        <div aria-label="Page navigation example">
          <ul className="pagination mt-0">
            <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
              <button
                className="page-link"
                onClick={() => handlePageChange(currentPage - 1)}
                aria-label="Previous"
              >
                <span aria-hidden="true">
                  <i className="fa fa-angle-double-left"></i>
                </span>
              </button>
            </li>
            {Array.from({ length: totalPages }, (_, index) => (
              <li
                key={index + 1}
                className={`page-item ${
                  currentPage === index + 1 ? "active" : ""
                }`}
              >
                <button
                  className="page-link"
                  onClick={() => handlePageChange(index + 1)}
                >
                  {index + 1}
                </button>
              </li>
            ))}
            <li
              className={`page-item ${
                currentPage === totalPages ? "disabled" : ""
              }`}
            >
              <button
                className="page-link"
                onClick={() => handlePageChange(currentPage + 1)}
                aria-label="Next"
              >
                <span aria-hidden="true">
                  <i className="fa fa-angle-double-right"></i>
                </span>
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ProfileBookingPage;
