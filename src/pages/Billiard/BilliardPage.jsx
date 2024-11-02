import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { Breadcrumb } from "../../components";
import { fetchCuahangs } from "../../features/shop/shopSlice";

const BilliardPage = () => {
  const dispatch = useDispatch();
  const { cuahangs, loading, error } = useSelector((state) => state.shop);
  const navigate = useNavigate();
  const location = useLocation();

  const query = new URLSearchParams(location.search);
  const pageQuery = parseInt(query.get("page")) || 1;
  const badgeQuery = query.get("badge") || "";
  const ratingQuery = parseInt(query.get("rating")) || 0;

  const [currentPage, setCurrentPage] = useState(pageQuery);
  const [selectedBadge, setSelectedBadge] = useState(badgeQuery);
  const [selectedRating, setSelectedRating] = useState(ratingQuery);
  const itemsPerPage = 9;

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

  // Calculate the number of stores for each rating
  const ratingCounts = cuahangs.reduce((acc, cuahang) => {
    const rating = Math.floor(cuahang.DanhGiaTong);
    acc[rating] = (acc[rating] || 0) + 1;
    return acc;
  }, {});

  // Filter items based on badge and rating
  const filteredCuahangs = cuahangs.filter((cuahang) => {
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

  // Calculate the current items to display
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredCuahangs.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  // Calculate total pages
  const totalPages = Math.ceil(filteredCuahangs.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    navigate(
      `?page=${pageNumber}${selectedBadge ? `&badge=${selectedBadge}` : ""}${
        selectedRating ? `&rating=${selectedRating}` : ""
      }`
    );
  };

  const handleBadgeChange = (badge) => {
    setSelectedBadge(badge);
    navigate(
      `?badge=${badge}${selectedRating ? `&rating=${selectedRating}` : ""}`
    );
  };

  const handleRatingChange = (rating) => {
    setSelectedRating(rating);
    navigate(
      `?rating=${rating}${selectedBadge ? `&badge=${selectedBadge}` : ""}`
    );
  };
  return (
    <>
      <Breadcrumb title="Billard Club" items="Billard Club" />

      <div className="billard-grid py-120">
        <div className="container">
          <div className="row">
            <div className="col-lg-4 col-xl-3 mb-4">
              <div className="booking-sidebar">
                <div className="booking-item">
                  <h4 className="booking-title">Vị trí</h4>
                  <div className="facility">
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        name="facility"
                        type="checkbox"
                        value="1"
                        id="facility1"
                      />
                      <label className="form-check-label" htmlFor="facility1">
                        TP.Hồ Chí Minh <span>(20)</span>
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        name="facility"
                        type="checkbox"
                        value="2"
                        id="facility2"
                      />
                      <label className="form-check-label" htmlFor="facility2">
                        Hà Nội <span>(15)</span>
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        name="facility"
                        type="checkbox"
                        value="3"
                        id="facility3"
                      />
                      <label className="form-check-label" htmlFor="facility3">
                        Cần Thơ <span>(18)</span>
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        name="facility"
                        type="checkbox"
                        value="4"
                        id="facility4"
                      />
                      <label className="form-check-label" htmlFor="facility4">
                        Bình Dương <span>(35)</span>
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        name="facility"
                        type="checkbox"
                        value="5"
                        id="facility5"
                      />
                      <label className="form-check-label" htmlFor="facility5">
                        Hải Phòng <span>(12)</span>
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        name="facility"
                        type="checkbox"
                        value="6"
                        id="facility6"
                      />
                      <label className="form-check-label" htmlFor="facility6">
                        Đà Nẵng <span>(18)</span>
                      </label>
                    </div>
                  </div>
                </div>
                <div className="booking-item">
                  <h4 className="booking-title">Mức giá VNĐ</h4>
                  <div className="billard-star">
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        name="billard-price"
                        type="checkbox"
                        value="1"
                        id="billard-price1"
                      />
                      <label
                        className="form-check-label"
                        htmlFor="billard-price11"
                      >
                        0 - 50 <span>(20)</span>
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        name="billard-price"
                        type="checkbox"
                        value="2"
                        id="billard-price2"
                      />
                      <label
                        className="form-check-label"
                        htmlFor="billard-price2"
                      >
                        50 - 100 <span>(15)</span>
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        name="billard-price"
                        type="checkbox"
                        value="3"
                        id="billard-price3"
                      />
                      <label
                        className="form-check-label"
                        htmlFor="billard-price3"
                      >
                        Trên 100 <span>(18)</span>
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
                  <h5>{filteredCuahangs.length} Kết quả tìm thấy</h5>
                  <div className="col-md-3 booking-sort-box">
                    <select
                      className="select"
                      value={selectedBadge}
                      onChange={(e) => handleBadgeChange(e.target.value)}
                    >
                      <option value="">Tất cả</option>
                      <option value="Đang khuyến mãi">Đang khuyến mãi</option>
                      <option value="Quán mới">Quán mới</option>
                      <option value="Nổi bật">Nổi bật</option>
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
                        <img
                          src={cuahang.AnhDaiDien_CuaHang}
                          alt={cuahang.TenCuaHang}
                        />
                        <a href="#" className="add-wishlist">
                          <i className="far fa-heart" />
                        </a>
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
                          <span className="billard-rate-review">
                            {cuahang.badge}
                          </span>
                        </div>
                        <div className="billard-bottom">
                          <div className="billard-price">
                            <span className="billard-price-amount">
                              {/* Assuming price is a property */}
                              {cuahang.price}{" "}
                              <span className="billard-price-type">/Giờ</span>
                            </span>
                          </div>
                          <div className="billard-text-btn">
                            <a href="#">
                              Chi tiết <i className="fas fa-arrow-right" />
                            </a>
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
