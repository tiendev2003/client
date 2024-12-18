import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Slider from "react-slick";
import { toast } from "react-toastify";
import { Breadcrumb } from "../../components";
import StarRating from "../../components/StarRating";
import { bookTable } from "../../features/book/bookSlice";
import {
  createDanhgia,
  updateDanhGia,
} from "../../features/danhgia/danhgiaSlice";
import { fetchCuahangDetail } from "../../features/shop/shopSlice";
import { formatMoney } from "../../utils/formatMoney";
const BilliardDetailPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { cuahangDetail } = useSelector((state) => state.shop);
  const { userInfo } = useSelector((state) => state.auth);
  var settings = {
    infinite: true,
    speed: 500,

    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: false,
    draggable: true,
    nextArrow: (
      <div className="slick-next">
        <i className="fa fa-long-arrow-right"></i>
      </div>
    ),
    prevArrow: (
      <div className="slick-prev">
        <i className="fa fa-long-arrow-left"></i>
      </div>
    ),
  };
  const [selectedTable, setSelectedTable] = useState(null);
  const [totalPrice, setTotalPrice] = useState(0);
  const [rating, setRating] = useState(0);
  const [image, setImage] = useState(null);
  const [reviewContent, setReviewContent] = useState("");
  const [onChange, setOnChange] = useState(false);
  const [editingReviewId, setEditingReviewId] = useState(null);

  useEffect(() => {
    dispatch(fetchCuahangDetail(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (onChange) {
      dispatch(fetchCuahangDetail(id));
      setOnChange(!onChange);
    }
  }, [onChange, dispatch, id]);

  useEffect(() => {
    if (selectedTable) {
      setTotalPrice(selectedTable.GiaBan);
    }
  }, [selectedTable]);

  const handleTableSelect = (table) => {
    setSelectedTable(table);
  };

  const handleRatingChange = (e) => {
    setRating(e.target.value);
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleReviewContentChange = (e) => {
    setReviewContent(e.target.value);
  };
  const handleEditClick = (reviewId, currentRating, currentContent) => {
    setEditingReviewId(reviewId);
    setRating(currentRating);
    setReviewContent(currentContent);
  };
  const handleSubmit = async (e) => {
    if (!selectedTable) {
      toast.error("Vui lòng chọn bàn trước khi đặt");
      return;
    }
    const id_Ban = selectedTable.id;
    e.preventDefault();
    const userInfo = localStorage.getItem("userToken");
    if (!userInfo) {
      toast.error("Vui lòng đăng nhập trước khi đặt bàn");
      return;
    }
    try {
      await dispatch(bookTable({ id_Cuahang: id, id_Ban })).unwrap();
      toast.success("Đặt bàn thành công.Quý khách vui lòng đến trong 15 phút, quá 15’ huỷ đặt bàn");
    } catch (error) {
      console.log(error);
      toast.error("Đặt bàn thất bại");
    }
  };
  const groupedData = cuahangDetail?.ban?.reduce((result, ban) => {
    const { id, TenDMBan } = ban.dmban;

    if (!result[id]) {
      result[id] = {
        TenDMBan,
        bans: [],
      };
    }

    result[id].bans.push(ban);
    return result;
  }, {});
  const handleRating = async (e) => {
    e.preventDefault();
    //  formData
    const formData = new FormData();
    formData.append("DG_Diem", rating);
    formData.append("DG_NoiDung", reviewContent);
    formData.append("id", id);
    formData.append("HinhAnh", image);

    try {
      if (editingReviewId) {
        formData.append("id", editingReviewId);
        await dispatch(updateDanhGia(formData)).unwrap();
        setEditingReviewId(null);
        setOnChange(!onChange);
        toast.success("Sửa đánh giá thành công");
        return;
      }
      await dispatch(createDanhgia(formData)).unwrap();
      setOnChange(!onChange);
      toast.success("Đánh giá thành công");
    } catch (error) {
      console.log(error);
      toast.error("Đánh giá thất bại");
    }
  };
  return (
    <>
      <Breadcrumb title="Billiard" items="Billiard" />

      <div className="hotel-single py-120">
        <div className="container">
          <div className="billard-detail-wrapper">
            <div className="row">
              <div className="col-lg-12">
                <Slider {...settings} className="billard-detail-slider">
                  {cuahangDetail?.hinhanh?.map((hinh, index) => (
                    <div key={index} className="billard-detail-slider-item">
                      <img src={hinh?.HinhAnh_URL} alt="billard" />
                    </div>
                  ))}
                </Slider>
              </div>
              <div className="col-lg-8">
                <div className="billard-detail-content">
                  <div className="billard-detail-header">
                    <div className="billard-detail-header-info">
                      <h4 className="billard-detail-title">
                        {cuahangDetail?.TenCuaHang}
                      </h4>
                      <p className="billard-detail-location">
                        <i className="fa fa-location-dot"></i>{" "}
                        {cuahangDetail?.DiaChi}
                      </p>
                    </div>
                    <div className="billard-detail-rate">
                      <span className="badge">
                        <i className="fa fa-star"></i>{" "}
                        {cuahangDetail?.DanhGiaTong}
                      </span>
                    </div>
                  </div>
                  <div className="billard-detail-item">
                    <div className="row">
                      <div className="col-md-6 col-lg-3">
                        <div className="billard-detail-feature">
                          <div className="billard-detail-feature-icon">
                            <i className="fa fa-shop"></i>
                          </div>
                          <div className="billard-detail-feature-content">
                            <h6>Billard Club</h6>
                            <span>5 sao</span>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6 col-lg-3">
                        <div className="billard-detail-feature">
                          <div className="billard-detail-feature-icon">
                            <i className="fa fa-globe"></i>
                          </div>
                          <div className="billard-detail-feature-content">
                            <h6>khu vực</h6>
                            <span>{cuahangDetail?.phuong_xa}</span>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6 col-lg-3">
                        <div className="billard-detail-feature">
                          <div className="billard-detail-feature-icon">
                            <i className="fa fa-map"></i>
                          </div>
                          <div className="billard-detail-feature-content">
                            <h6>Địa điểm</h6>
                            <span>{cuahangDetail?.tinh_thanhpho}</span>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6 col-lg-3">
                        <div className="billard-detail-feature">
                          <div className="billard-detail-feature-icon">
                            <i className="fa fa-money-bill"></i>
                          </div>
                          <div className="billard-detail-feature-content">
                            <h6>Giá thành</h6>
                            <span>60 - 200 Vnđ</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {groupedData &&
                    Object.values(groupedData)?.map((danhMuc, index) => (
                      <div key={index} className="listing-item">
                        <h2 className="mb-3">{danhMuc.TenDMBan}</h2>
                        <div className="listing-amenity">
                          <div className="row">
                            {danhMuc.bans.map((ban, idx) => (
                              <div className="col-lg-4 mt-3" key={idx}>
                                <div
                                  className={`listing-amenity-item1 ${
                                    selectedTable?.id === ban.id ? "selected" : ""
                                  }`}
                                  onClick={() => handleTableSelect(ban)}
                                  style={{
                                    cursor: "pointer",
                                    
                                  }}
                                >
                                  <img
                                    src={"/img/ban.png"}  
                                    alt={ban.TenBan}
                                    style={{ width: "100%", height: "auto" }}
                                  />
                                  <div className="table-info-overlay1">
                                    <p>{ban?.TenBan} - {formatMoney(ban?.GiaBan)}</p>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    ))}

                  <div className="billard-detail-item">
                    <h4 className="mb-3"> Mô tả </h4>
                    <p>
                      {" "}
                      Câu lạc bộ billiard của chúng tôi cung cấp không gian lý
                      tưởng với các bàn chơi chất lượng cao và dịch vụ tận tâm.
                      Bạn có thể thỏa sức giao lưu, tổ chức tiệc tùng hay tham
                      gia các giải đấu hấp dẫn trong một bầu không khí thân
                      thiện.{" "}
                    </p>
                    <p className="mt-3">
                      Chúng tôi không chỉ có billiard mà còn mang đến những trải
                      nghiệm giải trí đa dạng trong không gian sang trọng. Với
                      các trò chơi khác và khu vực thư giãn, đây là địa điểm
                      hoàn hảo để bạn thư giãn và tận hưởng thời gian bên bạn
                      bè.{" "}
                    </p>
                  </div>
                  <div className="billard-detail-item">
                    {cuahangDetail?.dmsp?.map((item, index) => (
                      <React.Fragment key={index}>
                        <h4 className="my-2">{item.TenDMSP}</h4>
                        <div className="billard-detail-amenity">
                          <div className="row">
                            {item?.sanpham?.map((sp, index) => (
                              <React.Fragment key={index}>
                                <div className="col-lg-3">
                                  <div className="billard-detail-amenity-item">
                                    <h6>
                                      <i className="fa fa-wifi"></i>{" "}
                                      {sp?.TenSanPham}
                                    </h6>
                                    <p>{formatMoney(sp?.Gia)}</p>
                                  </div>
                                </div>
                              </React.Fragment>
                            ))}
                          </div>
                        </div>
                      </React.Fragment>
                    ))}
                  </div>
                  <div className="billard-detail-item">
                    <h4 className="mb-4">Vị trí bản đồ</h4>
                    <div className="contact-map">
                      <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.411885563475!2d106.6173706143371!3d10.853426162511526!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3175295b2c8e9a15%3A0xbddc87c74006ae8d!2zR8O0bmcgVmFwcGhhLCBUUEguIE4uIEdvw6AgVmlldA!5e0!3m2!1sen!2s!4v1636509037831!5m2!1sen!2s"
                        style={{ border: 0 }}
                        allowFullScreen
                        loading="lazy"
                      ></iframe>
                    </div>
                  </div>
                  <div className="billard-detail-item faq-area">
                    <h4 className="mb-4">Câu hỏi thường gặp</h4>
                    <div className="accordion" id="accordionExample">
                      <div className="accordion-item">
                        <h2 className="accordion-header" id="heading1">
                          <button
                            className="accordion-button"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#collapse1"
                            aria-expanded="true"
                            aria-controls="collapse1"
                          >
                            <span>
                              <i className="far fa-question"></i>
                            </span>{" "}
                            Phí dịch vụ là gì?
                          </button>
                        </h2>
                        <div
                          id="collapse1"
                          className="accordion-collapse collapse show"
                          aria-labelledby="heading1"
                          data-bs-parent="#accordionExample"
                        >
                          <div className="accordion-body">
                            Phí dịch vụ là khoản tiền được tính thêm khi khách
                            hàng sử dụng một dịch vụ nhất định, như đặt phòng
                            khách sạn, ăn uống tại nhà hàng hoặc tham gia các
                            hoạt động giải trí. Khoản phí này thường nhằm mục
                            đích bù đắp cho chi phí vận hành, nhân viên và các
                            dịch vụ hỗ trợ khác. Phí dịch vụ có thể là một khoản
                            cố định hoặc tính theo tỷ lệ phần trăm trên tổng hóa
                            đơn.
                          </div>
                        </div>
                      </div>
                      <div className="accordion-item">
                        <h2 className="accordion-header" id="heading2">
                          <button
                            className="accordion-button collapsed"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#collapse2"
                            aria-expanded="false"
                            aria-controls="collapse2"
                          >
                            <span>
                              <i className="far fa-question"></i>
                            </span>{" "}
                            Làm thế nào tôi có thể trở thành Thành viên ?
                          </button>
                        </h2>
                        <div
                          id="collapse2"
                          className="accordion-collapse collapse"
                          aria-labelledby="heading2"
                          data-bs-parent="#accordionExample"
                        >
                          <div className="accordion-body">
                            Đăng Ký: Truy cập trang đăng ký trên website của
                            chúng tôi và điền đầy đủ thông tin cá nhân như họ
                            tên, địa chỉ email và số điện thoại.
                          </div>
                        </div>
                      </div>
                      <div className="accordion-item">
                        <h2 className="accordion-header" id="heading3">
                          <button
                            className="accordion-button collapsed"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#collapse3"
                            aria-expanded="false"
                            aria-controls="collapse3"
                          >
                            <span>
                              <i className="far fa-question"></i>
                            </span>
                            Làm thế nào tôi có thể đăng ký dịch vụ cửa hàng ?
                          </button>
                        </h2>
                        <div
                          id="collapse3"
                          className="accordion-collapse collapse"
                          aria-labelledby="heading3"
                          data-bs-parent="#accordionExample"
                        >
                          <div className="accordion-body">
                            Đăng Ký: Truy cập trang đăng ký dành cho doanh
                            nghiệp nhập thông tin và đợi phản hồi.
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="billard-detail-item">
                    <h4 className="mb-3">Đánh giá</h4>
                    <div className="billard-detail-rating-box">
                      <div className="billard-detail-review-rating">
                        <div className="billard-detail-rating-count">
                          <h2> {cuahangDetail?.DanhGiaTong}</h2>
                          <div className="billard-detail-rating-star">
                            <i className="fas fa-star"></i>
                            <i className="fas fa-star"></i>
                            <i className="fas fa-star"></i>
                            <i className="fas fa-star"></i>
                            <i className="far fa-star"></i>
                          </div>
                          <p>
                            Dựa trên {cuahangDetail?.danhgia?.length} Đánh giá
                          </p>
                        </div>
                        <div className="billard-detail-rating-range">
                          <div className="billard-detail-rating-range-item">
                            <div className="billard-detail-rating-range-star">
                              <i className="fas fa-star"></i>
                              <i className="fas fa-star"></i>
                              <i className="fas fa-star"></i>
                              <i className="fas fa-star"></i>
                              <i className="fas fa-star"></i>
                            </div>
                            <div className="billard-detail-rating-range-bar">
                              <div className="billard-detail-progress">
                                <div
                                  className="billard-detail-progress-width"
                                  style={{ width: "90%" }}
                                ></div>
                              </div>
                            </div>
                            <div className="billard-detail-rating-range-percentage">
                              <span>90%</span>
                            </div>
                          </div>
                          <div className="billard-detail-rating-range-item">
                            <div className="billard-detail-rating-range-star">
                              <i className="fas fa-star"></i>
                              <i className="fas fa-star"></i>
                              <i className="fas fa-star"></i>
                              <i className="fas fa-star"></i>
                              <i className="far fa-star"></i>
                            </div>
                            <div className="billard-detail-rating-range-bar">
                              <div className="billard-detail-progress">
                                <div
                                  className="billard-detail-progress-width"
                                  style={{ width: "80%" }}
                                ></div>
                              </div>
                            </div>
                            <div className="billard-detail-rating-range-percentage">
                              <span>80%</span>
                            </div>
                          </div>
                          <div className="billard-detail-rating-range-item">
                            <div className="billard-detail-rating-range-star">
                              <i className="fas fa-star"></i>
                              <i className="fas fa-star"></i>
                              <i className="fas fa-star"></i>
                              <i className="far fa-star"></i>
                              <i className="far fa-star"></i>
                            </div>
                            <div className="billard-detail-rating-range-bar">
                              <div className="billard-detail-progress">
                                <div
                                  className="billard-detail-progress-width"
                                  style={{ width: "59%" }}
                                ></div>
                              </div>
                            </div>
                            <div className="billard-detail-rating-range-percentage">
                              <span>59%</span>
                            </div>
                          </div>
                          <div className="billard-detail-rating-range-item">
                            <div className="billard-detail-rating-range-star">
                              <i className="fas fa-star"></i>
                              <i className="fas fa-star"></i>
                              <i className="far fa-star"></i>
                              <i className="far fa-star"></i>
                              <i className="far fa-star"></i>
                            </div>
                            <div className="billard-detail-rating-range-bar">
                              <div className="billard-detail-progress">
                                <div
                                  className="billard-detail-progress-width"
                                  style={{ width: "70%" }}
                                ></div>
                              </div>
                            </div>
                            <div className="billard-detail-rating-range-percentage">
                              <span>70%</span>
                            </div>
                          </div>
                          <div className="billard-detail-rating-range-item">
                            <div className="billard-detail-rating-range-star">
                              <i className="fas fa-star"></i>
                              <i className="far fa-star"></i>
                              <i className="far fa-star"></i>
                              <i className="far fa-star"></i>
                              <i className="far fa-star"></i>
                            </div>
                            <div className="billard-detail-rating-range-bar">
                              <div className="billard-detail-progress">
                                <div
                                  className="billard-detail-progress-width"
                                  style={{ width: "49%" }}
                                ></div>
                              </div>
                            </div>
                            <div className="billard-detail-rating-range-percentage">
                              <span>49%</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="billard-detail-review">
                        <h5>
                          Hiển thị {cuahangDetail?.danhgia?.length} Đánh giá
                        </h5>
                        {cuahangDetail?.danhgia?.map((item, index) => (
                          <React.Fragment key={index}>
                            <div
                              className="billard-detail-review-item "
                              style={{
                                cursor:
                                  userInfo && userInfo.id === item.id_TaiKhoan
                                    ? "pointer"
                                    : "default",
                              }}
                              onClick={() => {
                                if (userInfo) {
                                  if (userInfo.id === item.id_TaiKhoan) {
                                    handleEditClick(
                                      item.id,
                                      item.DG_Diem,
                                      item.DG_NoiDung
                                    );
                                  }
                                }
                              }}
                            >
                              <div className="billard-detail-review-author">
                                <img
                                  src={item.taikhoan.AnhDaiDien_NguoiDung}
                                  alt="author"
                                />
                                <div className="billard-detail-review-author-info">
                                  <div>
                                    <h6>{item.taikhoan.TenNguoiDung}</h6>
                                    <span>
                                      <i className="far fa-clock"></i>{" "}
                                      {item.DG_ThoiGian}
                                    </span>
                                  </div>
                                  <div className="billard-detail-review-author-rating">
                                    <StarRating rating={item.DG_Diem} />
                                  </div>
                                </div>
                              </div>
                              <p>{item.DG_NoiDung}</p>
                            </div>
                          </React.Fragment>
                        ))}
                      </div>
                      <div className="billard-detail-review-form">
                        <h4>
                          {editingReviewId ? "Sửa đánh giá" : "Để lại đánh giá"}
                        </h4>
                        <form onSubmit={handleRating}>
                          <div className="col-lg-12">
                            <div className="form-group mb-3">
                              <label className="star-label">Chất lượng</label>
                              <div className="billard-detail-review-form-star">
                                <div className="star-rating-wrapper">
                                  <div className="star-rating-box">
                                    <input
                                      type="radio"
                                      name="rating"
                                      value="5"
                                      id="star-5"
                                      onChange={handleRatingChange}
                                    />
                                    <label htmlFor="star-5">&#9733;</label>
                                    <input
                                      type="radio"
                                      name="rating"
                                      value="4"
                                      id="star-4"
                                      onChange={handleRatingChange}
                                    />
                                    <label htmlFor="star-4">&#9733;</label>
                                    <input
                                      type="radio"
                                      name="rating"
                                      value="3"
                                      id="star-3"
                                      onChange={handleRatingChange}
                                    />
                                    <label htmlFor="star-3">&#9733;</label>
                                    <input
                                      type="radio"
                                      name="rating"
                                      value="2"
                                      id="star-2"
                                      onChange={handleRatingChange}
                                    />
                                    <label htmlFor="star-2">&#9733;</label>
                                    <input
                                      type="radio"
                                      name="rating"
                                      value="1"
                                      id="star-1"
                                      onChange={handleRatingChange}
                                    />
                                    <label htmlFor="star-1">&#9733;</label>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="form-group">
                            <input
                              type="file"
                              className="form-control"
                              placeholder="Hình ảnh"
                              name="image"
                              onChange={handleImageChange}
                            />
                          </div>

                          <div className="form-group">
                            <textarea
                              className="form-control"
                              cols="30"
                              rows="5"
                              name="DG_NoiDung"
                              value={reviewContent}
                              onChange={handleReviewContentChange}
                              placeholder="Nhận xét*"
                            ></textarea>
                          </div>
                          <button className="theme-btn" type="submit">
                            {editingReviewId ? "Lưu đánh giá" : "Gửi đánh giá"}
                          </button>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div
                className="col-lg-4"
                style={{
                  position: "sticky",
                }}
              >
                <div className="booking-sidebar billard-detail-side-content mb-4">
                  <h4 className="booking-title">Bàn đã chọn</h4>
                  {selectedTable ? (
                    <div className="selected-table-info">
                      <p>Tên bàn: {selectedTable.TenBan}</p>
                      <p>Giá: {formatMoney(selectedTable.GiaBan)}</p>
                      {/* loại bàn */}
                      <p>Loại bàn: {selectedTable.dmban.TenDMBan}</p>
                    </div>
                  ) : (
                    <p>Chưa chọn bàn nào</p>
                  )}
                </div>
                <div className="booking-sidebar billard-detail-side-content">
                  <div className="booking-item">
                    <div className="search-form">
                      <div className="tour-search-wrapper">
                        <div className="row">
                          <div className="col-lg-12">
                            <div className="form-group passenger-box">
                              <div className="passenger-class">
                                <h4>Tổng tiền: </h4>
                                <div className="form-group-icon">
                                  <div className="passenger-total">
                                    <div className="passenger-item">
                                      Tiền bàn : {formatMoney(totalPrice)}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="billard-detail-side-btn">
                          <button
                            type="button"
                            className="theme-btn"
                            onClick={handleSubmit}
                          >
                            <span className="fa fa-shopping-bag"></span>Đặt ngay
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="billard-detail-side-share">
                      <a href="#">
                        <i className="fa fa-share-nodes"></i> Chia sẻ
                      </a>
                    </div>
                  </div>
                </div>
                <div className="booking-sidebar billard-detail-side-content mt-4">
                  <h4 className="booking-title">
                    Tại sao nên đặt bàn với chúng tôi?
                  </h4>
                  <ul className="billard-detail-side-list">
                    <li>
                      <i className="fa fa-dollar-sign"></i>Đảm Bảo Giá Tốt Nhất
                    </li>
                    <li>
                      <i className="fa fa-headset"></i>Chăm sóc khách hàng 24/7
                    </li>
                    <li>
                      <i className="fa fa-globe"></i>Các Billard Club được lựa
                      chọn kỹ lưỡng
                    </li>
                    <li>
                      <i className="fa-solid fa-ticket"></i>Ưu đãi đặc biệt
                    </li>
                  </ul>
                </div>
                <div className="booking-sidebar billard-detail-side-content mt-4">
                  <h4 className="booking-title">Bạn có câu hỏi ?</h4>
                  <p>Liên hệ qua thông tin để được hỗ trợ</p>
                  <ul className="billard-detail-side-list">
                    <li>
                      <i className="fa fa-phone"></i>
                      <a href="#">+1900 246 357</a>
                    </li>
                    <li>
                      <i className="fa fa-envelope"></i>
                      <a href="/cdn-cgi/l/email-protection#d1b8bfb7be91b4a9b0bca1bdb4ffb2bebc">
                        <span className="__cf_email__">
                          billardbooking@gmail.com
                        </span>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BilliardDetailPage;

