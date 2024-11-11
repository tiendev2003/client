import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { getDanhMucs } from "../../../features/danhmucsanpham/danhMucSanPhamSlice";
import { detailOrder, exportBill } from "../../../features/orders/orderSlice";
import { formatMoney } from "../../../utils/formatMoney";

const OrderDetails = () => {
  const dispatch = useDispatch();
  const navigation = useNavigate();
  const { id } = useParams();
  const { order, loading } = useSelector((state) => state.orders);
  const { danhMucs } = useSelector((state) => state.danhMucSanPham);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [currentCategory, setCurrentCategory] = useState(null);
  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(detailOrder(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (userInfo) {
      dispatch(getDanhMucs(userInfo.cuahang.id));
    }
  }, [dispatch, userInfo]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!order) {
    return <p>Không tìm thấy đơn đặt bàn</p>;
  }

  const handleProductSelect = (product) => {
    setSelectedProducts((prevSelectedProducts) => {
      const existingProduct = prevSelectedProducts.find(
        (p) => p.id === product.id
      );
      if (existingProduct) {
        return prevSelectedProducts.filter((p) => p.id !== product.id);
      } else {
        return [...prevSelectedProducts, { ...product, quantity: 1 }];
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
      await dispatch(
        exportBill({
          id,
          ...data,
        })
      ).unwrap();
      toast.success("Xác nhận đơn đặt bàn thành công");
      navigation("/store/order");
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
                <div className="form-check  ">
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
                    <div> Giá: {product.Gia}</div>
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
              {new Date(order?.booking?.ngay_dat).toLocaleString()}
            </p>

            <h5>Thông Tin Người Dùng</h5>

            <p>
              <h6>Tên:</h6> {order?.user_details?.ten_nguoi_dung}
            </p>

            <p>
              <h6>SĐT:</h6> {order?.user_details?.sdt}
            </p>

            <h5>Danh Sách Sản Phẩm Đã Chọn</h5>
            <div className="selected-products-list">
              {selectedProducts.length > 0 ? (
                selectedProducts.map((product) => (
                  <div key={product.id} className="selected-product">
                    <p>
                      <h6>Tên Sản Phẩm:</h6> {product.TenSanPham}
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
                              product.id,
                              product.quantity - 1
                            )
                          }
                          disabled={product.quantity <= 1}
                        >
                          <i className="fa fa-minus"></i>
                        </button>
                        <input
                          type="text"
                          name="quantity"
                          className="qty-amount passenger-room"
                          value={product.quantity}
                          readOnly
                        />
                        <button
                          type="button"
                          className="plus-btn"
                          onClick={() => {
                            if (product.quantity < product.SoLuong) {
                              handleQuantityChange(
                                product.id,
                                product.quantity + 1
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
                          onClick={() => handleRemoveProduct(product.id)}
                        >
                          <i className="far fa-trash-alt"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p>Chọn một sản phẩm để xem chi tiết</p>
              )}
            </div>
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
