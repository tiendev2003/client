import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Breadcrumb } from "../../components";
import { fetchCuahangs, searchStore } from "../../features/shop/shopSlice";
import { formatMoney } from "../../utils/formatMoney";

const BilliardPage = () => {
  const dispatch = useDispatch();
  const { cuahangs, loading, error, searchResult } = useSelector(
    (state) => state.shop
  );
  const navigate = useNavigate();
  const location = useLocation();

  const itemsPerPage = 9;
  const query = new URLSearchParams(location.search);
  const pageQuery = parseInt(query.get("page")) || 1;
  const badgeQuery = query.get("badge") || "";
  const priceQuery = query.get("price") || "";
  const ratingQuery = parseInt(query.get("rating")) || 0;
  const [sortOption, setSortOption] = useState("1");

  const [currentPage, setCurrentPage] = useState(pageQuery);
  const [selectedBadge, setSelectedBadge] = useState(badgeQuery);
  const [selectedRating, setSelectedRating] = useState(ratingQuery);
  const [selectedPrice, setSelectedPrice] = useState(priceQuery);
  const [filterCuahangs, setFilterCuahangs] = useState([]);
  const [province, setProvince] = useState([]);
  const [selectedProvince, setSelectedProvince] = useState("");

  useEffect(() => {
    dispatch(fetchCuahangs());
  }, [dispatch]);

  useEffect(() => {
    setCurrentPage(pageQuery);
  }, [pageQuery]);

  useEffect(() => {
    setSelectedBadge(badgeQuery);
  }, [badgeQuery]);

  useEffect(() => {
    setSelectedRating(ratingQuery);
  }, [ratingQuery]);

  useEffect(() => {
    setSelectedPrice(priceQuery);
  }, [priceQuery]);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const province = params.get("province");
    const district = params.get("district");
    const ward = params.get("ward");
    if (
      province ||
      district ||
      (ward && searchResult && searchResult.length > 0)
    ) {
      setFilterCuahangs(searchResult);
    }
  }, [location.search, searchResult]);

  useEffect(() => {
    const fetchProvince = async () => {
      const res = await fetch(
        "https://provinces.open-api.vn/api/?depth=1"
      ).then((res) => res.json());
      setProvince(res);
    };
    fetchProvince();
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    let province = params.get("province");
    let district = params.get("district");
    let ward = params.get("ward");

    if (province || district || ward) {
      
      
      dispatch(
        searchStore({
          tinh_thanhpho: province == undefined ? "" : province.replace(/^(Tỉnh|Thành phố)\s*/, "").trim(),
          quan_huyen: district == undefined ? "" : district.replace(/^(Huyện|Quận)\s*/, "").trim(),
          phuong_xa: ward == undefined ? "" : ward,
        })
      );
    } else {
      setFilterCuahangs(cuahangs);
    }
  }, [location.search, dispatch, cuahangs]);

  // Calculate the number of stores for each rating
  const ratingCounts = cuahangs.reduce((acc, cuahang) => {
    const rating = Math.floor(cuahang.DanhGiaTong);
    acc[rating] = (acc[rating] || 0) + 1;
    return acc;
  }, {});

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    navigate(
      `?page=${pageNumber}${selectedBadge ? `&badge=${selectedBadge}` : ""}${
        selectedRating ? `&rating=${selectedRating}` : ""
      }`
    );
  };

  const handleRatingChange = (rating) => {
    setSelectedRating(rating);
    navigate(
      `?rating=${rating}${selectedBadge ? `&badge=${selectedBadge}` : ""}`
    );
  };
  const handleReset = () => {
    setSelectedBadge("");
    setSelectedRating("");
    navigate("/billiard");
  };
  const handleSortChange = (e) => {
    setSortOption(e.target.value);
  };

  // handle filter by price
  const handlePriceChange = (price) => {
    console.log(price);
    setSelectedPrice(price);
    navigate(
      `?price=${price}${selectedBadge ? `&badge=${selectedBadge}` : ""}${
        selectedRating ? `&rating=${selectedRating}` : ""
      }`
    );
  };

  const sortedCuahangs = [...filterCuahangs].sort((a, b) => {
    if (sortOption === "2") {
      return b.DanhGiaTong - a.DanhGiaTong;
    }
    if (sortOption === "3") {
      return a.minGiaBan - b.minGiaBan;
    }
    if (sortOption === "4") {
      return b.minGiaBan - a.minGiaBan;
    }
    return 0;
  });

  let filteredCuahangs = sortedCuahangs.filter((cuahang) => {
    const ratingMatch =
      selectedRating === 5
        ? cuahang.DanhGiaTong === 5
        : cuahang.DanhGiaTong >= selectedRating &&
          cuahang.DanhGiaTong < selectedRating + 1;

    return (
      (selectedBadge ? cuahang.badge === selectedBadge : true) &&
      (selectedRating ? ratingMatch : true)
    );
  });

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredCuahangs.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const totalPages = Math.ceil(filteredCuahangs.length / itemsPerPage);

  return (
    <>
      <Breadcrumb title="Billard Club" items="Billard Club" />

      <div className="billard-grid py-120">
        <div className="container">
          <div className="row">
            <div className="col-lg-4 col-xl-3 mb-4  ">
              <div className="booking-sidebar">
                <div className="booking-item w-100">
                  <button
                    type="button"
                    className="theme-btn w-100"
                    onClick={handleReset}
                  >
                    Reset
                  </button>
                </div>
                <div className="booking-item">
                  <h4 className="booking-title">Vị trí</h4>
                  <div className="facility">
                    {/* select  */}
                    <div className="form-group">
                      <label>Tỉnh/Thành phố</label>
                      <div className="form-group-icon mt-2">
                        <select
                          className="form-control"
                          name="province"
                          onChange={(e) => {
                            navigate(`?province=${e.target.value}`);
                          }}
                        >
                          <option value="">Chọn tỉnh/thành phố</option>
                          {province.map((item) => (
                            <option key={item.code} value={item.name}>
                              {item.name}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
                {/*  lọc theo mức giá ở đây */}
                <div className="booking-item">
                  <h4 className="booking-title">Mức giá VNĐ</h4>
                  <div className="billard-star">
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        name="billard-price"
                        type="radio"
                        value="1"
                        onChange={() => handlePriceChange(100000)}
                        id="billard-price1"
                      />
                      <label
                        className="form-check-label"
                        htmlFor="billard-price1"
                      >
                        Dưới {formatMoney(100000)}
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        name="billard-price"
                        type="radio"
                        value="2"
                        onChange={() => handlePriceChange(200000)}
                        id="billard-price2"
                      />
                      <label
                        className="form-check-label"
                        htmlFor="billard-price2"
                      >
                        {formatMoney(100000)} - {formatMoney(200000)}
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        name="billard-price"
                        type="radio"
                        value="3"
                        onChange={() => handlePriceChange(300000)}
                        id="billard-price3"
                      />
                      <label
                        className="form-check-label"
                        htmlFor="billard-price3"
                      >
                        {formatMoney(200000)} - {formatMoney(300000)}
                      </label>
                    </div>
                  </div>
                </div>
                <div className="booking-item">
                  <h4 className="booking-title">Đánh giá</h4>
                  <div className="billard-star">
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        name="billard-star"
                        type="checkbox"
                        value="1"
                        id="billard-star1"
                        onChange={() => handleRatingChange(5)}
                        checked={selectedRating === 5}
                      />
                      <label
                        className="form-check-label"
                        htmlFor="billard-star1"
                      >
                        5 sao <span>({ratingCounts[5] || 0})</span>
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        name="billard-star"
                        type="checkbox"
                        value="2"
                        id="billard-star2"
                        onChange={() => handleRatingChange(4)}
                        checked={selectedRating === 4}
                      />
                      <label
                        className="form-check-label"
                        htmlFor="billard-star2"
                      >
                        4 sao <span>({ratingCounts[4] || 0})</span>
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        name="billard-star"
                        type="checkbox"
                        value="3"
                        id="billard-star3"
                        onChange={() => handleRatingChange(3)}
                        checked={selectedRating === 3}
                      />
                      <label
                        className="form-check-label"
                        htmlFor="billard-star3"
                      >
                        3 sao <span>({ratingCounts[3] || 0})</span>
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        name="billard-star"
                        type="checkbox"
                        value="4"
                        id="billard-star4"
                        onChange={() => handleRatingChange(2)}
                        checked={selectedRating === 2}
                      />
                      <label
                        className="form-check-label"
                        htmlFor="billard-star4"
                      >
                        2 sao <span>({ratingCounts[2] || 0})</span>
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        name="billard-star"
                        type="checkbox"
                        value="5"
                        id="billard-star5"
                        onChange={() => handleRatingChange(1)}
                        checked={selectedRating === 1}
                      />
                      <label
                        className="form-check-label"
                        htmlFor="billard-star5"
                      >
                        1 sao <span>({ratingCounts[1] || 0})</span>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-8 col-xl-9">
              <div className="col-md-12">
                <div className="booking-sort">
                  <h5>{currentItems.length} Kết quả tìm thấy</h5>
                  <div className="col-md-3 booking-sort-box">
                    <select className="select" onChange={handleSortChange}>
                      <option value="1">Sắp xếp theo mặc định</option>
                      <option value="2">Sắp xếp theo Phổ biến</option>
                      <option value="3">Sắp xếp theo Giá thấp</option>
                      <option value="4">Sắp xếp theo Giá cao</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="row">
                {loading && <p>Loading...</p>}
                {error && <p>Error: {error}</p>}
                {currentItems.map((cuahang) => (
                  <div key={cuahang.id} className="col-md-6 col-lg-4">
                    <div className="billard-item">
                      <div className="billard-img">
                        <span className="badge badge-discount">
                          {cuahang.badge}
                        </span>
                        <img
                          src={cuahang.AnhDaiDien_CuaHang}
                          alt={cuahang.TenCuaHang}
                        />
                      </div>

                      <div className="billard-content">
                        <h4 className="billard-title">
                          <a href="#">{cuahang.TenCuaHang}</a>
                        </h4>
                        <p>
                          <i className="fa-solid fa-location-crosshairs" />{" "}
                          {cuahang.DiaChi}
                        </p>
                        <div className="billard-rate">
                          <span className="badge">
                            <i className="fa fa-star" /> {cuahang.DanhGiaTong}
                          </span>
                        </div>
                        <div className="billard-bottom">
                          <div className="billard-price">
                            <span className="billard-price-amount">
                              {/* Assuming price is a property */}
                              {formatMoney(cuahang.minGiaBan)}{" "}
                              <span className="billard-price-type">/Giờ</span>
                            </span>
                          </div>
                          <div className="billard-text-btn">
                            <Link to={`/billiard/${cuahang.id}`}>
                              Chi tiết <i className="fas fa-arrow-right" />
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

                <div className="pagination-area">
                  <div aria-label="Page navigation example">
                    <ul className="pagination">
                      <li
                        className={`page-item ${
                          currentPage === 1 ? "disabled" : ""
                        }`}
                      >
                        <a
                          className="page-link"
                          href="#"
                          aria-label="Previous"
                          onClick={() => handlePageChange(currentPage - 1)}
                        >
                          <span aria-hidden="true">
                            <i className="fa fa-angle-double-left"></i>
                          </span>
                        </a>
                      </li>
                      {[...Array(totalPages)].map((_, index) => (
                        <li
                          key={index}
                          className={`page-item ${
                            currentPage === index + 1 ? "active" : ""
                          }`}
                        >
                          <a
                            className="page-link"
                            href="#"
                            onClick={() => handlePageChange(index + 1)}
                          >
                            {index + 1}
                          </a>
                        </li>
                      ))}
                      <li
                        className={`page-item ${
                          currentPage === totalPages ? "disabled" : ""
                        }`}
                      >
                        <a
                          className="page-link"
                          href="#"
                          aria-label="Next"
                          onClick={() => handlePageChange(currentPage + 1)}
                        >
                          <span aria-hidden="true">
                            <i className="fa fa-angle-double-right"></i>
                          </span>
                        </a>
                      </li>
                    </ul>
                  </div>
                  <div className="pagination-showing">
                    <p>
                      Hiển thị {indexOfFirstItem + 1} -{" "}
                      {Math.min(indexOfLastItem, cuahangs.length)} of{" "}
                      {cuahangs.length} Billard Club
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default BilliardPage;
