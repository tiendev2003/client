import jsPDF from "jspdf";
import "jspdf-autotable";
import { useEffect, useState } from "react";
import "react-calendar/dist/Calendar.css";
import "react-clock/dist/Clock.css";
import DateTimePicker from "react-datetime-picker";
import "react-datetime-picker/dist/DateTimePicker.css";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { getCTKMs } from "../../../features/ctkm/ctkmSlice";
import { getDanhMucs } from "../../../features/danhmucsanpham/danhMucSanPhamSlice";
import {
  addSanPhamToOrder,
  deleteSanPhamFromOrder,
  detailOrder,
  exportBill,
  updateSanPhamInOrder,
} from "../../../features/orders/orderSlice";
import { fetchProducts } from "../../../features/sanpham/sanphamSlice";
import { formatMoney } from "../../../utils/formatMoney";

const OrderDetails = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { order, loading } = useSelector((state) => state.orders);
  const { danhMucs } = useSelector((state) => state.danhMucSanPham);
  const { ctkms } = useSelector((state) => state.ctkm);

  const [selectedProducts, setSelectedProducts] = useState([]);
  const [currentCategory, setCurrentCategory] = useState(null);
  const { userInfo } = useSelector((state) => state.auth);
  const [startDate, setStartDate] = useState(new Date());
  const { products } = useSelector((state) => state.products);
  const [discount, setDiscount] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [finalPrice, setFinalPrice] = useState(0);
  const [selectedCTKM, setSelectedCTKM] = useState(null);
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
    if (order) {
      setStartDate(order?.thoi_gian_bat_dau);
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
    const total = selectedProducts.reduce(
      (sum, product) => sum + product.Gia * product.quantity,
      0
    );
    setTotalPrice(total);
    setFinalPrice(total - discount);
  }, [selectedProducts, discount]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!order) {
    return <p>Không tìm thấy đơn đặt bàn</p>;
  }

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
    try {
      const result = await dispatch(
        exportBill({
          id: order?.chi_tiet_ban[0]?.id_ban,
          id_PGG: selectedCTKM ?? "",
        })
      ).unwrap();
      console.log(result);
      toast.success("Xuất hóa đơn thành công");
      exportToPDF(result.hoaDon);
    } catch (error) {
      console.log(error);
      toast.error("Xuất hóa đơn thất bại");
    }
  };

  const exportToPDF = (hoaDon) => {
    console.log(hoaDon);
    const doc = new jsPDF();
    doc.addFileToVFS('./times new roman.ttf', 'base64-encoded-font-data');
    doc.addFont('./times new roman.ttf', 'Roboto', 'normal');
    doc.setFont('Roboto');

    doc.text("Hóa Đơn", 20, 10);
    doc.text(`Cửa Hàng: ${hoaDon.cuahang.TenCuaHang}`, 20, 20);
    doc.text(`Địa Chỉ: ${hoaDon.cuahang.DiaChi}`, 20, 30);
    doc.text(`SĐT: ${hoaDon.cuahang.SDT}`, 20, 40);
    doc.text(`Tên Khách Hàng: ${hoaDon.taikhoan.TenTaiKhoan}`, 20, 50);
    doc.text(`SĐT Khách Hàng: ${hoaDon.taikhoan.SDT}`, 20, 60);
    doc.text(`Thời Gian Xuất HĐ: ${new Date(hoaDon.ThoiGianXuatHD).toLocaleString()}`, 20, 70);

    const tableColumn = ["Tên Sản Phẩm/Bàn", "Số Lượng", "Giá", "Tổng"];
    const tableRows = [];

    hoaDon.hoadonct.forEach(item => {
      const productData = [
        item.sanpham ? item.sanpham.TenSanPham : item.ban.TenBan,
        item.SoLuong,
        formatMoney(item.sanpham ? item.sanpham.Gia : item.ban.GiaBan),
        formatMoney(item.Tong)
      ];
      tableRows.push(productData);
    });

    doc.autoTable(tableColumn, tableRows, { startY: 80 });
    doc.text(`Tổng Hóa Đơn: ${formatMoney(hoaDon.TongHD)}`, 20, doc.autoTable.previous.finalY + 10);
    doc.text(`Tổng Sau Giảm Giá: ${formatMoney(hoaDon.TongHD_after_discount)}`, 20, doc.autoTable.previous.finalY + 20);

    doc.save(`HoaDon_${hoaDon.id}.pdf`);
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

  return (
    <div className="user-profile-card user-profile-listing mt-4 min-vh-100">
      <div className="row">
        <div className="col-md-8">
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
        <div className="col-md-4 search-form">
          <h4>Chi tiết đơn đặt bàn</h4>
          <div className="order-details-content">
            <p>
              <strong>Ngày Đặt:</strong>{" "}
              <DateTimePicker
                onChange={setStartDate}
                value={startDate}
                className="form-control  "
              />
            </p>
            <div className="form-group-icon"></div>

            <h5>Thông Tin Người Dùng</h5>
            <div className="d-flex    ">
              <h6 className="mt-1">Tên: </h6>{" "}
              {order?.user_details?.ten_nguoi_dung}
            </div>

            <div className="d-flex    ">
              <h6 className="mt-1">SĐT:</h6> {order?.user_details?.sdt}
            </div>
            {/* Tên bàn đã đặt */}
            <div className="d-flex    ">
              <h6 className="mt-1 mr-1">Tên Bàn:</h6>{" "}
            </div>

            <h5>Danh Sách Sản Phẩm Đã Chọn</h5>
            <div className="selected-products-list mt-2">
              {selectedProducts.length > 0 ? (
                selectedProducts.map((selectedProduct) => {
                  const product =
                    products?.find((p) => p.id === selectedProduct.id) || {};
                  return (
                    <div key={selectedProduct.id} className="selected-product">
                      <p>
                        <h6>Tên Sản Phẩm:</h6> {selectedProduct.TenSanPham}
                      </p>
                      <p>
                        <h6>Giá:</h6> {formatMoney(product.Gia)}
                      </p>
                      <div className="passenger-item">
                        <div className="passenger-info">
                          <h6>Số Lượng</h6>
                        </div>
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
                              if (selectedProduct.quantity < product.SoLuong) {
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
                          <button
                            type="button"
                            className="remove-btn"
                            onClick={() =>
                              handleRemoveProduct(selectedProduct.idHoaDon)
                            }
                          >
                            <i className="far fa-trash-alt"></i>
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })
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
              <button className="btn btn-primary">Xuất hóa đơn</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
