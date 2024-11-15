import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { Pagination } from "../../components/Pagination";
import { getBanForStore } from "../../features/banforstore/banForStoreSlice";
import { bookTable } from "../../features/book/bookSlice";
import {
  addSanPhamToOrder,
  updateStatusOrder
} from "../../features/orders/orderSlice";
import { fetchProducts } from "../../features/sanpham/sanphamSlice";
import { formatMoney } from "../../utils/formatMoney";

const CurrentStore = () => {
  const dispatch = useDispatch();

  const { banforstores } = useSelector((state) => state.banforstore);
  const { userInfo } = useSelector((state) => state.auth);

  const { products } = useSelector((state) => state.products);
  const [selectedTable, setSelectedTable] = useState(null);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [searchTable, setSearchTable] = useState("");
  const [searchProduct, setSearchProduct] = useState("");
  const [currentTablePage, setCurrentTablePage] = useState(1);
  const [currentProductPage, setCurrentProductPage] = useState(1);
  const [itemsPerPage] = useState(8);
  const [discountCode, setDiscountCode] = useState("");
  const [discountAmount, setDiscountAmount] = useState(0);
  const [onChange, setOnChange] = useState(false);
  useEffect(() => {
    dispatch(getBanForStore(1));
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchProducts(userInfo.cuahang.id));
  }, [dispatch, userInfo.cuahang]);

  useEffect(() => {
    dispatch(fetchProducts(userInfo.cuahang.id));
  }, [dispatch, onChange, userInfo.cuahang]);

  const handleTableSelect = (table) => {
    setSelectedTable(table);
  };

  const handleProductSelect = (product) => {
    setSelectedProducts((prevSelectedProducts) => {
      const existingProduct = prevSelectedProducts.find(
        (p) => p.id === product.id
      );
      if (existingProduct) {
        return prevSelectedProducts.map((p) =>
          p.id === product.id ? { ...p, quantity: p.quantity + 1 } : p
        );
      } else {
        return [...prevSelectedProducts, { ...product, quantity: 1 }];
      }
    });
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

  const handleSearchTableChange = (e) => {
    setSearchTable(e.target.value);
    setCurrentTablePage(1);
  };

  const handleSearchProductChange = (e) => {
    setSearchProduct(e.target.value);
    setCurrentProductPage(1);
  };

  const handleDiscountCodeChange = (e) => {
    setDiscountCode(e.target.value);
    // Giả sử mã giảm giá là "DISCOUNT10" giảm 10%
    if (e.target.value === "DISCOUNT10") {
      setDiscountAmount(0.1);
    } else {
      setDiscountAmount(0);
    }
  };

  const handlePlaceOrder = async () => {
    console.log(selectedTable, selectedProducts);
    if (!selectedTable) {
      toast.error("Vui lòng chọn bàn trước khi đặt hàng");
      return;
    }

    try {
      const detail = await dispatch(
        bookTable({ id_Cuahang: userInfo.cuahang.id, id_Ban: selectedTable.id })
      ).unwrap();
      
      await dispatch(updateStatusOrder(detail.data[0].id)).unwrap();

      const data = {
        SanPhams: selectedProducts.map((product) => ({
          id_SanPham: product.id,
          SoLuong: product.quantity,
        })),
      };
      await dispatch(
        addSanPhamToOrder({
          id: detail.data[0].id,
          ...data,
        })
      ).unwrap();
      toast.success("Xác nhận đơn đặt bàn thành công");
    } catch (error) {
      console.error("Failed to place order", error);
    } finally {
      setSelectedTable(null);
      setSelectedProducts([]);
      setOnChange(!onChange);
    }
  };
  const filteredTables = banforstores.filter((table) =>
    table.TenBan.toLowerCase().includes(searchTable.toLowerCase())
  );

  const filteredProducts = products.filter((product) =>
    product.TenSanPham.toLowerCase().includes(searchProduct.toLowerCase())
  );

  const indexOfLastTable = currentTablePage * itemsPerPage;
  const indexOfFirstTable = indexOfLastTable - itemsPerPage;
  const currentTables = filteredTables.slice(
    indexOfFirstTable,
    indexOfLastTable
  );

  const indexOfLastProduct = currentProductPage * itemsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - itemsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const paginateTables = (pageNumber) => setCurrentTablePage(pageNumber);
  const paginateProducts = (pageNumber) => setCurrentProductPage(pageNumber);

  const totalAmount =
    selectedProducts.reduce(
      (total, product) => total + product.Gia * product.quantity,
      0
    ) + (selectedTable?.GiaBan || 0);
  const discountedAmount = totalAmount * (1 - discountAmount);

  return (
    <div className="  mt-4">
      <div className="row">
        <div className="col-lg-9">
          <div className="user-profile-card">
            <div className="user-profile-card-header">
              <h4>Chọn Bàn</h4>
              <input
                type="text"
                className="form-control"
                placeholder="Tìm kiếm bàn..."
                value={searchTable}
                onChange={handleSearchTableChange}
              />
            </div>
            <div className="user-profile-card-body">
              <div className="row">
                {currentTables.map((table, index) => (
                  <div key={index} className="col-lg-3 mb-3">
                    <button
                      className={`btn btn-block ${
                        selectedTable === table
                          ? "btn-primary"
                          : "btn-outline-primary"
                      }`}
                      onClick={() => handleTableSelect(table)}
                    >
                      {table?.TenBan} - {formatMoney(table?.GiaBan)}
                    </button>
                  </div>
                ))}
              </div>
              <Pagination
                itemsPerPage={itemsPerPage}
                totalItems={filteredTables.length}
                paginate={paginateTables}
                currentPage={currentTablePage}
              />
            </div>
          </div>
          <div className="user-profile-card mt-4  ">
            <div className="user-profile-card-header">
              <h4>Chọn Sản Phẩm</h4>
              <input
                type="text"
                className="form-control"
                placeholder="Tìm kiếm sản phẩm..."
                value={searchProduct}
                onChange={handleSearchProductChange}
              />
            </div>
            <div className="user-profile-card-body">
              <div className="row">
                {currentProducts.map((product) => (
                  <div key={product.id} className="col-lg-3 mb-3">
                    <button
                      className={`btn btn-block ${
                        selectedProducts.some((p) => p.id === product.id)
                          ? "btn-success"
                          : "btn-outline-success"
                      }`}
                      onClick={() => handleProductSelect(product)}
                    >
                      {product?.TenSanPham} - {formatMoney(product?.Gia)}
                    </button>
                  </div>
                ))}
              </div>
              <Pagination
                itemsPerPage={itemsPerPage}
                totalItems={filteredProducts.length}
                paginate={paginateProducts}
                currentPage={currentProductPage}
              />
            </div>
          </div>
        </div>
        <div className="col-lg-3">
          <div className="user-profile-sidebar">
            <div className="user-profile-sidebar-top text-start">
              <h4 className="mb-2">Thông Tin Đơn Hàng</h4>
              <p>
                <strong>Bàn:</strong> {selectedTable?.TenBan} -{" "}
                {formatMoney(selectedTable?.GiaBan || 0)}
              </p>
              <h5>Sản Phẩm Đã Chọn</h5>
              <div className="selected-products-list search-form">
                <ul>
                  {selectedProducts.map((product) => (
                    <Fragment key={product.id}>
                      <div className="selected-product mt-1">
                        <div className="passenger-info d-flex justify-content-between align-items-center mb-2">
                          <h6>{product.TenSanPham}</h6>
                          <h6>{formatMoney(product.Gia)}</h6>
                        </div>

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
                    </Fragment>
                  ))}
                </ul>
              </div>
              <div className="discount-code">
                <label htmlFor="discountCode">Mã Giảm Giá:</label>
                <input
                  type="text"
                  id="discountCode"
                  className="form-control"
                  value={discountCode}
                  onChange={handleDiscountCodeChange}
                />
              </div>
              <p>
                <strong>Tổng Tiền:</strong> {formatMoney(totalAmount)}
              </p>
              <p>
                <strong>Giảm Giá:</strong> {discountAmount * 100}%
              </p>
              <p>
                <strong>Thành Tiền:</strong> {formatMoney(discountedAmount)}
              </p>
              <button
                className="btn btn-primary btn-block"
                onClick={handlePlaceOrder}
              >
                Đặt Bàn
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CurrentStore;
