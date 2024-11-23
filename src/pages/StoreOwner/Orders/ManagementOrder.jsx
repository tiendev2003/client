import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import {
  completeOrder,
  fetchOrders,
  updateStatusOrder,
} from "../../../features/orders/orderSlice";
import { formatDate } from "../../../utils/dateHelpers";
import { getBanForStore } from "./../../../features/banforstore/banForStoreSlice";
const ManagementOrder = () => {
  const dispatch = useDispatch();
  const { orders } = useSelector((state) => state.orders);
  const { userInfo } = useSelector((state) => state.auth);
  const [onChanging, setOnChanging] = useState(false);
  const [filterStatus, setFilterStatus] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  useEffect(() => {
    dispatch(fetchOrders(userInfo.cuahang.id));
  }, [dispatch, userInfo.cuahang.id]);
  useEffect(() => {
    dispatch(getBanForStore(1));
  }, [dispatch]);

  useEffect(() => {
    if (onChanging) {
      dispatch(fetchOrders(userInfo.cuahang.id));
    }
  }, [onChanging, dispatch, userInfo.cuahang.id]);

  const handleChangeStatus = async (orderId, newStatus) => {
    if (newStatus === "0") {
      console.log("Hủy");
    }
    if (newStatus === "2") {
      try {
        await dispatch(updateStatusOrder(orderId)).unwrap();
        toast.success("Cập nhật trạng thái thành công");
      } catch (error) {
        console.error("Update status failed:", error);
        toast.error("Cập nhật trạng thái thất bại");
      } finally {
        setOnChanging(!onChanging);
      }
    }
    if (newStatus === "3") {
      try {
        await dispatch(completeOrder(orderId)).unwrap();
        toast.success("Cập nhật trạng thái thành công");
        console.log("orderId", orderId);
      } catch (error) {
        console.error("Update status failed:", error);
        toast.error("Cập nhật trạng thái thất bại");
      } finally {
        await dispatch(fetchOrders(userInfo.cuahang.id)).unwrap();
        setOnChanging(true);
      }
    }
  };
  console.log("orders", orders);
  
  const filteredOrders = orders.filter(order => 
    filterStatus === "" || order.TrangThai.toString() === filterStatus
  );

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);
  const currentOrders = filteredOrders.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="user-profile-card user-profile-listing">
      <div className="user-profile-card-header">
        <h4 className="user-profile-card-title">Danh sách đơn đặt bàn</h4>
        <div className="user-profile-card-header-right">
          
        <select
          className="form-select"
          aria-label="Filter select example"
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
        >
          <option value="">Tất cả</option>
          <option value="0">Hủy</option>
          <option value="1">Chờ xác nhận</option>
          <option value="2">Đã xác nhận</option>
          <option value="3">Đã nhận bàn</option>
        </select>
     
        </div>
     
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
              {currentOrders &&
                currentOrders.map((order, index) => {
                  return (
                    <tr key={index}>
                      <td>{index}</td>
                      <td>{order.TenNguoiDung}</td>
                      <td>{formatDate(order.ThoiGianDatBan)}</td>
                      <td>
                        {/* select status */}
                        <select
                          className="form-select"
                          aria-label="Default select example"
                          value={order.TrangThai}
                          onChange={(e) =>
                            handleChangeStatus(
                              order.id_DonDatBan,
                              e.target.value
                            )
                          }
                        >
                          {/* (0 là Hủy, 1 là Chờ xác nhận, 2 là Đã xác nhận, 3 là Hoàn thành  */}
                          <option value="0">Hủy</option>
                          <option value="1">Chờ xác nhận</option>
                          <option value="2">Đã xác nhận</option>
                          <option value="3">Đã nhận bàn</option>
                        </select>
                      </td>
                      <td>
                         
                        {order.TrangThai === 3 && (
                          <Link
                            to={`/store/order/${order?.hoadon?.id}`}
                          >
                            <button className="badge bg-success btn">
                              <i className="fa-regular fa-eye"></i>
                            </button>
                          </Link>
                        )}
                      </td>
                    </tr>
                  );
                })}
              {currentOrders.length === 0 && (
                <tr className="text-center">
                  <td colSpan="5">Bạn không có đơn đặt bàn nào</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      {filteredOrders.length > 0 && (
        <div className="pagination-area my-3">
          <div aria-label="Page navigation example">
            <ul className="pagination mt-0">
              <li
                className={`page-item ${currentPage === 1 ? "disabled" : ""}`}
              >
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
      )}
    </div>
  );
};

export default ManagementOrder;
