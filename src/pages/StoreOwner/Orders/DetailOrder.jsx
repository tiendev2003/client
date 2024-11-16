import { useEffect, useState } from "react";
import "react-calendar/dist/Calendar.css";
import "react-clock/dist/Clock.css";
import DateTimePicker from "react-datetime-picker";
import "react-datetime-picker/dist/DateTimePicker.css";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { getDanhMucs } from "../../../features/danhmucsanpham/danhMucSanPhamSlice";
import {
  addSanPhamToOrder,
  detailOrder,
  exportBill,
} from "../../../features/orders/orderSlice";
import { fetchProducts } from "../../../features/sanpham/sanphamSlice";
import { formatMoney } from "../../../utils/formatMoney";

const OrderDetails = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { order, loading } = useSelector((state) => state.orders);
  const { danhMucs } = useSelector((state) => state.danhMucSanPham);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [currentCategory, setCurrentCategory] = useState(null);
  const { userInfo } = useSelector((state) => state.auth);
  const [startDate, setStartDate] = useState(new Date());
  const { products } = useSelector((state) => state.products);
  const [discountCode, setDiscountCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [finalPrice, setFinalPrice] = useState(0);

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
    const total = selectedProducts.reduce((sum, product) => sum + product.Gia * product.quantity, 0);
    setTotalPrice(total);
    setFinalPrice(total - discount);
  }, [selectedProducts, discount]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!order) {
    return <p>Không tìm thấy đơn đặt bàn</p>;
  }

  const handleProductSelect = (product) => {
    console.log(product);
    setSelectedProducts((prevSelectedProducts) => {
      const existingProduct = prevSelectedProducts.find(
        (p) => p.id === product.id
      );
      if (existingProduct) {
        return prevSelectedProducts.filter((p) => p.id !== product.id);
      } else {
        return [
          ...prevSelectedProducts,
          {
            id: product.id,
            quantity: 1,
            TenSanPham: product.TenSanPham,
            Gia: product.Gia,
          },
        ];
      }
    });
  };

  const handleSubmit = async () => {
    if (selectedProducts.length === 0) {
      toast.error("Chọn ít nhất một sản phẩm");
      return;
    }

    const products = selectedProducts.map((product) => ({
      id_SanPham: product.id,
      SoLuong: product.quantity,
    }));

    const data = {
      SanPhams: products,
     
    };

    try {
      console.log(order)
      await dispatch(
        addSanPhamToOrder({
          ...data,
          id: order?.chi_tiet_ban[0]?.id_ban,
        })  
      ).unwrap();
      await dispatch(
        exportBill({
          id: order?.chi_tiet_ban[0]?.id_ban,
        })
      ).unwrap();
      toast.success("Xác nhận đơn đặt bàn thành công");
    } catch (error) {
      console.log(error);
      toast.error("Xác nhận đơn đặt bàn thất bại");
    }
  };

  const handleQuantityChange = (productId, quantity) => {
    setSelectedProducts((prevSelectedProducts) =>
      prevSelectedProducts.map((product) =>
        product.id === productId
          ? { ...product, quantity: Math.max(1, quantity) }
          : product
      )
    );
  };

  const handleRemoveProduct = (productId) => {
    setSelectedProducts((prevSelectedProducts) =>
      prevSelectedProducts.filter((product) => product.id !== productId)
    );
  };

  const handleCategoryChange = (category) => {
    setCurrentCategory(category);
  };

  const handleApplyDiscount = () => {
    // Example discount logic
    if (discountCode === "DISCOUNT10") {
      setDiscount(totalPrice * 0.1);
      toast.success("Áp dụng mã giảm giá thành công");
    } else {
      setDiscount(0);
      toast.error("Mã giảm giá không hợp lệ");
    }
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
                                  selectedProduct.id,
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
                              handleRemoveProduct(selectedProduct.id)
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
              <label htmlFor="discountCode">Mã Giảm Giá:</label>
              <div className="input-group">
                <input
                  type="text"
                  id="discountCode"
                  className="form-control border px-3  "
                  value={discountCode}
                  onChange={(e) => setDiscountCode(e.target.value)}
                />
                <button className="btn btn-outline-secondary" onClick={handleApplyDiscount}>
                  Áp Dụng
                </button>
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
              <button className="btn btn-primary">Xác Nhận</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
