import React, { useEffect, useState } from "react";
import "react-modern-drawer/dist/index.css";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { bookTable } from "../../../features/book/bookSlice";
import {
  completeOrder,
  fetchbanForOrder,
} from "../../../features/orders/orderSlice";
import "./ViewOrder.css";

const tableStatus = {
  1: "Bàn Trống",
  2: "Bàn đã được đặt",
  3: "Bàn đang sử dụng",
  0: "Bàn đang sửa",
};

const ViewOrder = () => {
  const dispatch = useDispatch();
  const navigation = useNavigate();

  const { banForOrder } = useSelector((state) => state.orders);
  const { userInfo } = useSelector((state) => state.auth);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTable, setSelectedTable] = useState(null);
  const [playTime, setPlayTime] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [isOpenTableModal, setIsOpenTableModal] = useState(false);
  const [newTable, setNewTable] = useState(null);

  useEffect(() => {
    dispatch(fetchbanForOrder(userInfo.cuahang.id));
  }, [dispatch, userInfo.cuahang.id]);

  useEffect(() => {
    if (selectedTable) {
      // Update play time immediately
      setPlayTime(
        calculatePlayTime(selectedTable.dondatbanct[0].ThoiGianBatDau)
      );
      const interval = setInterval(() => {
        setPlayTime(
          calculatePlayTime(selectedTable.dondatbanct[0].ThoiGianBatDau)
        );
      }, 60000); // Update every minute
      return () => clearInterval(interval);
    }
  }, [selectedTable]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleStatusChange = (e) => {
    setFilterStatus(e.target.value);
  };

  const calculatePlayTime = (startTime) => {
    const start = new Date(startTime);
    const now = new Date();
    const diff = now - start;
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    return `${hours} giờ ${minutes} phút`;
  };

  const handleTableClick = (order) => {
    if (order.TrangThai === 1) {
      setNewTable(order);
      setIsOpenTableModal(true);
      return;
    }
    if (order.TrangThai !== 3) {
      return;
    }
    if (order.dondatbanct.length > 0) {
      setSelectedTable(order);
    } else {
      // navigation("/store/order/" + order?.hoadon?.id);
    }
  };

  const openTable = async () => {
    console.log(newTable);
    try {
      const detail = await dispatch(
        bookTable({ id_Cuahang: userInfo.cuahang.id, id_Ban: newTable.id })
      ).unwrap();

      await dispatch(completeOrder(detail.data[0].id)).unwrap();
      toast.success("Mở bàn thành công");
    } catch (error) {
      toast.error(error.message || "Có lỗi xảy ra, vui lòng thử lại sau");
      console.log(error);
    } finally {
      setNewTable(null);
      setIsOpenTableModal(false);
      dispatch(fetchbanForOrder(userInfo.cuahang.id));
    }
  };

  const closeOpenTableModal = () => {
    setNewTable(null);
    setIsOpenTableModal(false);
  };

  const closePopup = () => {
    setSelectedTable(null);
  };

  const viewDetails = () => {
    navigation("/store/order/" + selectedTable?.hoadonct?.id_HoaDon);
  };

  const filteredTables = banForOrder.filter((ban) => {
    const matchesSearchQuery = ban.TenBan.toLowerCase().includes(
      searchQuery.toLowerCase()
    );
    const matchesStatus = filterStatus
      ? ban.TrangThai === parseInt(filterStatus)
      : true;
    return matchesSearchQuery && matchesStatus;
  });

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
          <div className="form-group">
            <select
              className="form-control"
              value={filterStatus}
              onChange={handleStatusChange}
            >
              <option value="">Tất cả trạng thái</option>
              <option value="1">Bàn Trống</option>
              <option value="2">Bàn đã được đặt</option>
              <option value="3">Bàn đang sử dụng</option>
              <option value="0">Bàn đang sửa</option>
            </select>
          </div>
        </div>
      </div>
      <div className="table-container">
        {filteredTables.length > 0 ? (
          filteredTables.map((ban, index) => (
            <div
              key={index}
              className={`table-item ${ban.TrangThai}`}
              onClick={() => handleTableClick(ban)}
            >
              <img
                src={`/public/img/store.png`}
                alt={ban.TenBan}
                className="table-image"
              />
              <div className="table-info-overlay1">
                <h3>{ban.TenBan}</h3>
                <p>{tableStatus[ban.TrangThai]}</p>
              </div>
            </div>
          ))
        ) : (
          <p>Không có đơn đặt bàn nào</p>
        )}
      </div>
      {selectedTable && (
        <div className="popup-overlay" onClick={closePopup}>
          <div className="popup" onClick={(e) => e.stopPropagation()}>
            <div className="popup-header">
              <h3>{selectedTable.TenBan}</h3>
              <button onClick={closePopup}>
                <i className="fa fa-times"></i>
              </button>
            </div>
            <div className="popup-body">
              <div className="info-row">
                <div className="info-column">
                  <label>Giá bàn:</label>
                  <p>{selectedTable.GiaBan}</p>
                </div>
                <div className="info-column">
                  <label>Loại bàn:</label>
                  <p>{selectedTable.HangBan}</p>
                </div>
                <div className="info-column">
                  <label>Trạng thái:</label>
                  <p>{tableStatus[selectedTable.TrangThai]}</p>
                </div>
              </div>
              <h4>Thông tin khách hàng:</h4>
              <div className="info-row">
                <div className="info-column">
                  <label>Tên:</label>
                  <p>
                    {
                      selectedTable.dondatbanct[0].dondatban.taikhoan
                        .TenNguoiDung
                    }
                  </p>
                </div>
                <div className="info-column">
                  <label>Thời gian bắt đầu:</label>
                  <p>{selectedTable.dondatbanct[0].ThoiGianBatDau}</p>
                </div>
                <div className="info-column">
                  <label>Thời gian chơi:</label>
                  <p>{playTime}</p>
                </div>
              </div>
            </div>
            <div className="popup-footer">
              <button onClick={viewDetails}>Xem chi tiết</button>
            </div>
          </div>
        </div>
      )}
      {isOpenTableModal && (
        <div className="popup-overlay" onClick={closeOpenTableModal}>
          <div className="popup" onClick={(e) => e.stopPropagation()}>
            <div className="popup-header">
              <h3>{newTable.TenBan}</h3>
              <button onClick={closeOpenTableModal}>
                <i className="fa fa-times"></i>
              </button>
            </div>
            <div className="popup-body">
              <div className="info-row">
                <div className="info-column">
                  <label>Giá bàn:</label>
                  <p>{newTable.GiaBan}</p>
                </div>
                <div className="info-column">
                  <label>Loại bàn:</label>
                  <p>{newTable.HangBan}</p>
                </div>
                <div className="info-column">
                  <label>Trạng thái:</label>
                  <p>{tableStatus[newTable.TrangThai]}</p>
                </div>
              </div>
              <h4>Thông tin mở bàn:</h4>
              <div className="info-row">
                <div className="info-column">
                  <label>Tên khách hàng:</label>
                  <p>Khách lẻ</p>
                </div>
                <div className="info-column">
                  <label>Thời gian bắt đầu:</label>
                  <p>00:00:00</p>
                </div>
              </div>
            </div>
            <div className="popup-footer">
              <button onClick={openTable}>Mở bàn</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewOrder;
