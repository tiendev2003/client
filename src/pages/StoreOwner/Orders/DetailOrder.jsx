import "jspdf-autotable";

import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import { useEffect, useState } from "react";
import "react-calendar/dist/Calendar.css";
import "react-clock/dist/Clock.css";
import "react-datetime-picker/dist/DateTimePicker.css";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { getCTKMs } from "../../../features/ctkm/ctkmSlice";
import { getDanhMucs } from "../../../features/danhmucsanpham/danhMucSanPhamSlice";
import { fetchHoadon } from "../../../features/hoadon/hoadonSlice";
import {
  addSanPhamToOrder,
  deleteSanPhamFromOrder,
  detailOrder,
  updateSanPhamInOrder
} from "../../../features/orders/orderSlice";
import { fetchProducts } from "../../../features/sanpham/sanphamSlice";
import { formatMoney } from "../../../utils/formatMoney";

// Thiết lập font mặc định cho pdfMake
if (pdfFonts && pdfFonts.pdfMake && pdfFonts.pdfMake.vfs) {
  pdfMake.vfs = pdfFonts.pdfMake.vfs;
} else {
  console.error(
    "Failed to load pdfFonts. Check the import paths or version compatibility."
  );
}
const OrderDetails = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const navigate = useNavigate();
  const { order, loading } = useSelector((state) => state.orders);
  const { danhMucs } = useSelector((state) => state.danhMucSanPham);
  const { ctkms } = useSelector((state) => state.ctkm);

  const [selectedProducts, setSelectedProducts] = useState([]);
  const [currentCategory, setCurrentCategory] = useState(null);
  const { userInfo } = useSelector((state) => state.auth);
  const { products } = useSelector((state) => state.products);
  const { hoadon } = useSelector((state) => state.hoadon);
  const [discount, setDiscount] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [finalPrice, setFinalPrice] = useState(0);
  const [selectedCTKM, setSelectedCTKM] = useState(null);
  const [playTime, setPlayTime] = useState("");

  useEffect(() => {
    dispatch(getCTKMs(userInfo.cuahang.id));
  }, [dispatch, userInfo.cuahang.id]);

  useEffect(() => {
    dispatch(fetchProducts(userInfo.cuahang.id));
  }, [dispatch, userInfo.cuahang]);
  useEffect(() => {
    dispatch(detailOrder(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (userInfo) {
      dispatch(getDanhMucs(userInfo.cuahang.id));
    }
  }, [dispatch, userInfo]);

  useEffect(() => {
    dispatch(fetchHoadon(12));
  }, [dispatch]);

  useEffect(() => {
    if (order) {
      if (order.chi_tiet_san_pham) {
        const initialSelectedProducts = Object.values(
          order.chi_tiet_san_pham
        ).map((product) => ({
          id: product.id_san_pham,
          idHoaDon: product.id,
          quantity: product.so_luong,
          TenSanPham: product.ten_san_pham,
          Gia: product.gia,
        }));
        setSelectedProducts(initialSelectedProducts);
      }
    }
  }, [order]);

  useEffect(() => {
    if (danhMucs.length > 0) {
      setCurrentCategory(danhMucs[0].id);
    }
  }, [danhMucs]);

  useEffect(() => {
    const totalProductPrice = selectedProducts.reduce(
      (sum, product) => sum + product.Gia * product.quantity,
      0
    );
    const tablePrice = order?.chi_tiet_ban?.[0]?.gia_ban || 0;
    const total = totalProductPrice + tablePrice;
    setTotalPrice(total);
    setFinalPrice(total - discount);
  }, [selectedProducts, discount, order]);

  useEffect(() => {
    if (order?.thoi_gian_bat_dau) {
      setPlayTime(calculatePlayTime(order.thoi_gian_bat_dau));
      const interval = setInterval(() => {
        setPlayTime(calculatePlayTime(order.thoi_gian_bat_dau));
      }, 60000); // Update every minute
      return () => clearInterval(interval);
    }
  }, [order]);

  const calculatePlayTime = (startTime) => {
    const start = new Date(startTime);
    const now = new Date();
    const diff = now - start;
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    return `${hours} giờ ${minutes} phút`;
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!order) {
    return <p>Không tìm thấy đơn đặt bàn</p>;
  }
  const inforUser =
    hoadon && hoadon.find((item) => item.id.toString() === id.toString());
  console.log("da", userInfo);

  const handleProductSelect = async (product) => {
    const existingProduct = selectedProducts.find((p) => p.id === product.id);
    if (!existingProduct) {
      try {
        await dispatch(
          addSanPhamToOrder({
            SanPhams: [{ id_SanPham: product.id, SoLuong: 1 }],
            id: order?.chi_tiet_ban[0]?.id_ban,
          })
        ).unwrap();
        toast.success("Thêm sản phẩm thành công");
        await dispatch(detailOrder(id)).unwrap();
      } catch (error) {
        console.log(error);
        toast.error("Thêm sản phẩm thất bại");
      }
    }
  };

  const handleSubmit = async () => {
    navigate(`/store/invoice/${id}`);
  };
 

  const handleQuantityChange = async (productId, quantity) => {
    await dispatch(
      updateSanPhamInOrder({ id: productId, SoLuong: quantity })
    ).unwrap();
    await dispatch(detailOrder(id)).unwrap();
  };

  const handleRemoveProduct = async (productId) => {
    await dispatch(deleteSanPhamFromOrder(productId)).unwrap();
    await dispatch(detailOrder(id)).unwrap();
  };

  const handleCategoryChange = (category) => {
    setCurrentCategory(category);
  };

  const filteredProducts = currentCategory
    ? danhMucs.find((danhMuc) => danhMuc.id === currentCategory)?.sanpham || []
    : [];
  console.log(order);
  return (
    <div className="user-profile-card user-profile-listing mt-4 min-vh-100">
      <div className="row">
        <div className="col-md-4">
          <div className="add-listing-form p-4 border rounded shadow-sm">
            <h4>Danh Sách Sản Phẩm</h4>
            <ul className="nav nav-tabs mt-4">
              {danhMucs.map((danhMuc) => (
                <li className="nav-item" key={danhMuc.id}>
                  <button
                    className={`nav-link ${
                      currentCategory === danhMuc.id ? "active" : ""
                    }`}
                    onClick={() => handleCategoryChange(danhMuc.id)}
                  >
                    {danhMuc.TenDMSP}
                  </button>
                </li>
              ))}
            </ul>
            <div className="list-group mt-3">
              {filteredProducts.map((product) => (
                <div key={product.id} className="list-group-item">
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      name="billard-star"
                      type="checkbox"
                      value="1"
                      id={`product-${product.id}`}
                      checked={selectedProducts.some((p) => p.id === product.id)}
                      onChange={() => handleProductSelect(product)}
                    />
                    <label
                      className="form-check-label d-flex justify-content-between align-items-center"
                      htmlFor={`product-${product.id}`}
                    >
                      {/* image */}{" "}
                      <div>
                        <img
                          src={product.HinhAnh}
                          alt={product.TenSanPham}
                          width="50"
                          height="50"
                        />

                        {product.TenSanPham}
                      </div>{" "}
                      <div> Giá: {formatMoney(product.Gia)}</div>
                    </label>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="col-md-8 search-form">
          <div className="add-listing-form p-4 border rounded shadow-sm">
            <h4>Chi tiết đơn đặt bàn</h4>
            <div className="order-details-content">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <div>
                  <strong>Tên Bàn:</strong>{" "}
                  {order?.chi_tiet_ban?.length > 0
                    ? order?.chi_tiet_ban[0]?.ten_ban
                    : ""}
                </div>
                <div>
                  <strong>Ngày Đặt:</strong>{" "}
                  {new Date(order?.thoi_gian_bat_dau).toLocaleString()}
                </div>
                <div>
                  <strong>Thời gian chơi:</strong> {playTime}
                </div>
                <div>
                  <strong>Tên Người Chơi:</strong>{" "}
                  {inforUser?.taikhoan?.TenTaiKhoan.toUpperCase() ==
                  userInfo?.TenTaiKhoan.toUpperCase()
                    ? "Khách lẻ"
                    : inforUser?.taikhoan?.TenTaiKhoan}
                </div>
              </div>
              <div className="selected-products-list mt-2">
                {selectedProducts.length > 0 ? (
                  <table className="table table-bordered table-responsive">
                    <thead>
                      <tr>
                        <th>Tên Sản Phẩm</th>
                        <th>Giá</th>
                        <th>Số Lượng</th>
                        <th>Thao Tác</th>
                      </tr>
                    </thead>
                    <tbody>
                      {
                        order.chi_tiet_ban && (
                          <tr>
                            <td>{order.chi_tiet_ban[0].ten_ban}</td>
                            <td>{formatMoney(order.chi_tiet_ban[0].gia_ban)}</td>
                            <td>1</td>
                            <td>
                             
                            </td>
                          </tr>
                        )
                      }
                      {selectedProducts.map((selectedProduct) => {
                        const product =
                          products?.find((p) => p.id === selectedProduct.id) ||
                          {};
                        return (
                          <tr key={selectedProduct.id}>
                            <td>{selectedProduct.TenSanPham}</td>
                            <td>{formatMoney(product.Gia)}</td>
                            <td>
                              <div className="passenger-qty">
                                <button
                                  type="button"
                                  className="minus-btn"
                                  onClick={() =>
                                    handleQuantityChange(
                                      selectedProduct.id,
                                      selectedProduct.quantity - 1
                                    )
                                  }
                                  disabled={selectedProduct.quantity <= 1}
                                >
                                  <i className="fa fa-minus"></i>
                                </button>
                                <input
                                  type="text"
                                  name="quantity"
                                  className="qty-amount passenger-room"
                                  value={selectedProduct.quantity}
                                  readOnly
                                />
                                <button
                                  type="button"
                                  className="plus-btn"
                                  onClick={() => {
                                    if (
                                      selectedProduct.quantity < product.SoLuong
                                    ) {
                                      handleQuantityChange(
                                        selectedProduct.idHoaDon,
                                        selectedProduct.quantity + 1
                                      );
                                    } else {
                                      alert("Số lượng vượt quá số lượng có sẵn");
                                    }
                                  }}
                                >
                                  <i className="far fa-plus"></i>
                                </button>
                              </div>
                            </td>
                            <td>
                              <button
                                type="button"
                                className="remove-btn"
                                onClick={() =>
                                  handleRemoveProduct(selectedProduct.idHoaDon)
                                }
                              >
                                <i className="far fa-trash-alt"></i>
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                ) : (
                  <p>Chọn một sản phẩm để xem chi tiết</p>
                )}
              </div>
              <div className="discount-code mt-3 mb-1">
                <label htmlFor="ctkmSelect">Chọn Mã Giảm Giá:</label>
                <div className="input-group">
                  <select
                    id="ctkmSelect"
                    className="form-control border px-3"
                    value={selectedCTKM}
                    onChange={(e) => setSelectedCTKM(e.target.value)}
                  >
                    <option value="">Chọn mã giảm giá</option>
                    {ctkms.map((ctkm) => (
                      <option key={ctkm.id} value={ctkm.id}>
                        {ctkm.Ten_PGG}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <p>
                <strong>Tổng Tiền:</strong> {formatMoney(totalPrice)}
              </p>
              <p>
                <strong>Giảm Giá:</strong> {formatMoney(discount)}
              </p>
              <p>
                <strong>Thành Tiền:</strong> {formatMoney(finalPrice)}
              </p>

              {/* button submit */}
              <div className="form-group" onClick={handleSubmit}>
                <button className="btn btn-primary">Xác nhận hóa đơn</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
