import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import {
  fetchOrders,
  updateStatusOrder,
} from "../../../features/orders/orderSlice";
import { formatDate } from "../../../utils/dateHelpers";

const ManagementOrder = () => {
  const dispatch = useDispatch();
  const [listdetail, setListDetail] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const { orders, order } = useSelector((state) => state.orders);
  const { userInfo } = useSelector((state) => state.auth);
  console.log(userInfo);
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };
  useEffect(() => {
    dispatch(fetchOrders(userInfo.cuahang.id));
  }, [dispatch, userInfo.cuahang.id]);
  const handleChangeStatus = async (orderId, newStatus) => {
    if (newStatus === "0") {
      console.log("Chờ xác nhận");
    }
    if (newStatus === "1") {
      try {
        await dispatch(updateStatusOrder(orderId)).unwrap();
        toast.success("Cập nhật trạng thái thành công");
      } catch (error) {
        console.error("Update status failed:", error);
        toast.error("Cập nhật trạng thái thất bại");
      }
    }
    if (newStatus === "2") {
      console.log("Đã hủy");
    }
  };

  return (
    <div className="user-profile-card user-profile-listing">
      <div className="user-profile-card-header">
        <h4 className="user-profile-card-title">Danh sách đơn đặt bàn</h4>
        <div className="user-profile-card-header-right">
          <div className="user-profile-search">
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                placeholder="Tìm kiếm ..."
                value={searchQuery}
                onChange={handleSearchChange}
              />
              <i className="fa fa-search"></i>
            </div>
          </div>
        </div>
        <Link to="view" className="theme-btn">
          <span className="fa fa-eye"></span>Xem tổng quan
        </Link>
      </div>
      <div className="col-lg-12">
        <div className="table-responsive">
          <table className="table text-nowrap">
            <thead>
              <tr>
                <th>ID</th>
                <th>Tên người đặt</th>
                <th>Ngày đặt</th>
                <th>Trạng thái</th>
                <th>Hành động</th>
              </tr>
            </thead>
            <tbody>
              {orders &&
                orders.map((order, index) => {
                  return (
                    <tr key={index}>
                      <td>{index}</td>
                      <td>{order.ThoiGianDatBan}</td>
                      <td>{formatDate(order.ThoiGianDatBan)}</td>
                      <td>
                        {/* select status */}
                        <select
                          className="form-select"
                          aria-label="Default select example"
                          onChange={(e) =>
                            handleChangeStatus(
                              order.id_DonDatBan,
                              e.target.value
                            )
                          }
                        >
                          <option value="0">Chờ xác nhận</option>
                          <option value="1">Đã xác nhận</option>
                          <option value="2">Đã hủy</option>
                        </select>
                      </td>
                      <td>
                        <button className="badge bg-success btn">
                          <i className="fa-regular fa-eye"></i>
                        </button>
                      </td>
                    </tr>
                  );
                })}
              {orders.length === 0 && (
                <tr className="text-center">
                  <td colSpan="5">Bạn không có đơn đặt bàn nào</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ManagementOrder;
