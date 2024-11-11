import   { useEffect, useState } from "react";
import "react-modern-drawer/dist/index.css";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, } from "react-router-dom";
import { fetchOrders } from "../../../features/orders/orderSlice";

const ViewOrder = () => {
  const dispatch = useDispatch();
  const navigation = useNavigate();

  const { orders } = useSelector((state) => state.orders);
  const { userInfo } = useSelector((state) => state.auth);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    dispatch(fetchOrders(userInfo.cuahang.id));
  }, [dispatch, userInfo.cuahang.id]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleTableClick = (order) => {
    navigation("/store/order/" + order.id_DonDatBan);
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
          orders.map((order, index) => (
            <div
              key={index}
              className={`table-item ${order.status}`}
              onClick={() => handleTableClick(order)}
            >
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
          <p>Không có đơn đặt bàn nào</p>
        )}
      </div>
    </div>
  );
};

export default ViewOrder;
