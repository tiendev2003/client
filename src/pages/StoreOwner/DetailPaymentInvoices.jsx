import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchHoadonId } from "../../features/hoadon/hoadonSlice";

export const DetailPaymentInvoices = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const {hoadons} = useSelector((state) => state.hoadon);
  useEffect(() => {
    dispatch(fetchHoadonId({ id }));
  }, [dispatch, id]);
  return (
    <div className="user-profile-wrapper">
      <div className="user-profile-card add-listing">
        <div className="col-lg-12">
          <div className="add-listing-form">
            <div className="row align-items-center">
            {hoadons.map((invoice) => (
                <div key={invoice.id} className="invoice-item">
                  <h4>Hóa Đơn #{invoice.id}</h4>
                  <p><strong>Tổng Hóa Đơn:</strong> {invoice.TongHD}</p>
                  <p><strong>Thời Gian Xuất Hóa Đơn:</strong> {invoice.ThoiGianXuatHD}</p>
                  <p><strong>Trạng Thái:</strong> {invoice.TrangThai}</p>
                  <h5>Thông Tin Người Dùng</h5>
                  <div className="user-info">
                    <img src={invoice.taikhoan.AnhDaiDien_NguoiDung} alt="User Avatar" className="user-avatar" />
                    <div>
                      <p><strong>Tên Người Dùng:</strong> {invoice.taikhoan.TenNguoiDung}</p>
                      <p><strong>Email:</strong> {invoice.taikhoan.Email}</p>
                      <p><strong>SĐT:</strong> {invoice.taikhoan.SDT}</p>
                    </div>
                  </div>
                  <h5>Thông Tin Cửa Hàng</h5>
                  <div className="store-info">
                    <img src={invoice.cuahang.AnhDaiDien_CuaHang} alt="Store Avatar" className="store-avatar" />
                    <div>
                      <p><strong>Tên Cửa Hàng:</strong> {invoice.cuahang.TenCuaHang}</p>
                      <p><strong>Địa Chỉ:</strong> {invoice.cuahang.DiaChi}</p>
                      <p><strong>SĐT:</strong> {invoice.cuahang.SDT}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
