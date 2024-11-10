import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  fetchOrders,
  updateStatusOrder,
} from "../../../features/orders/orderSlice";

const ViewOrder = () => {
  const dispatch = useDispatch();
  const { orders, order } = useSelector((state) => state.orders);
  const [searchQuery, setSearchQuery] = useState("");

  const { userInfo } = useSelector((state) => state.auth);
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
        <h4 className="user-profile-card-title">Danh mục đơn đặt bàn</h4>
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
      </div>
      <div className="table-overview">
        {orders.length > 0 ? (
          orders.map((order) => (
            <div key={order.id} className={`table-item ${order.status}`}>
              <img
                src={
                  order.status === "occupied"
                    ? "/public/img/logo/favicon-dark.png"
                    : "/public/img/logo/favicon-dark.png"
                }
                alt={order.status}
                className="table-icon"
              />
              <span className="table-name">{order.name}</span>
            </div>
          ))
        ) : (
          <div className="no-data">
            <p>Không có dữ liệu</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ViewOrder;
