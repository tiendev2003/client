import { Breadcrumb } from "../../components";

const BilliardDetailPage = () => {
  return (
    <>
      <Breadcrumb title="Billiard" items="Billiard" />

      <div className="hotel-single py-120">
        <div className="container">
          <div className="billard-detail-wrapper">
            <div className="row">
              <div className="col-lg-8">
                <div className="billard-detail-content">
                  <div className="billard-detail-slider owl-carousel owl-theme">
                    <img src="../assets/img/billard/01.jpeg" alt />
                    <img src="../assets/img/billard/01.jpeg" alt />
                    <img src="../assets/img/billard/01.jpeg" alt />
                  </div>
                  <div className="billard-detail-header">
                    <div className="billard-detail-header-info">
                      <h4 className="billard-detail-title">Billard Club</h4>
                      <p className="billard-detail-location">
                        <i className="fa fa-location-dot"></i> 256 Phan Huy Ích,
                        P.12, Q.Gò Vấp, TP.HCM
                      </p>
                    </div>
                    <div className="billard-detail-rate">
                      <span className="badge">
                        <i className="fa fa-star"></i> 5.0
                      </span>
                      <span className="billard-detail-rate-review">
                        (2.5k Lượt xem)
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
                            <span>Việt Nam</span>
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
                            <span>Hồ Chí Minh</span>
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
                    <h4 className="mb-3">Tiện nghi</h4>
                    <div className="billard-detail-amenity">
                      <div className="row">
                        <div className="col-lg-3">
                          <div className="billard-detail-amenity-item">
                            <h6>
                              <i className="fa fa-wifi"></i> Wifi
                            </h6>
                          </div>
                        </div>
                        <div className="col-lg-3">
                          <div className="billard-detail-amenity-item">
                            <h6>
                              <i className="fa-regular fa-snowflake"></i> Máy
                              lạnh
                            </h6>
                          </div>
                        </div>
                        <div className="col-lg-3">
                          <div className="billard-detail-amenity-item">
                            <h6>
                              <i className="fa-solid fa-utensils"></i> Đồ ăn
                            </h6>
                          </div>
                        </div>
                        <div className="col-lg-3">
                          <div className="billard-detail-amenity-item">
                            <h6>
                              <i className="fa-solid fa-wine-bottle"></i> Đồ
                              uống
                            </h6>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="billard-detail-item">
                    <h4 className="mb-4">Vị trí bản đồ</h4>
                    <div className="contact-map">
                      <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.411885563475!2d106.6173706143371!3d10.853426162511526!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3175295b2c8e9a15%3A0xbddc87c74006ae8d!2zR8O0bmcgVmFwcGhhLCBUUEguIE4uIEdvw6AgVmlldA!5e0!3m2!1sen!2s!4v1636509037831!5m2!1sen!2s"
                        style={{ border: 0 }}
                        allowFullscreen
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
                          <h2>4.5</h2>
                          <div className="billard-detail-rating-star">
                            <i className="fas fa-star"></i>
                            <i className="fas fa-star"></i>
                            <i className="fas fa-star"></i>
                            <i className="fas fa-star"></i>
                            <i className="far fa-star"></i>
                          </div>
                          <p>Dựa trên 100 Đánh giá</p>
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
                        <h5>Hiển thị 1,2k Đánh giá</h5>
                        <div className="billard-detail-review-item">
                          <div className="billard-detail-review-author">
                            <img src="../assets/img/testimonial/04.jpeg" alt />
                            <div className="billard-detail-review-author-info">
                              <div>
                                <h6>Huỳnh Gia Huy</h6>
                                <span>
                                  <i className="fa fa-clock"></i> 1 ngày trước
                                </span>
                              </div>
                              <div className="billard-detail-review-author-rating">
                                <i className="fas fa-star"></i>
                                <i className="fas fa-star"></i>
                                <i className="fas fa-star"></i>
                                <i className="fas fa-star"></i>
                                <i className="fas fa-star"></i>
                              </div>
                            </div>
                          </div>
                          <p>
                            Tôi đã có một trải nghiệm tuyệt vời khi đặt bàn bi-a
                            tại quán này. Nhân viên rất thân thiện và hỗ trợ
                            nhiệt tình trong suốt quá trình đặt bàn. Bàn bi-a ở
                            đây luôn trong tình trạng tốt và sạch sẽ, không gian
                            thoải mái để thư giãn cùng bạn bè. Tôi cũng rất
                            thích dịch vụ ăn uống đi kèm, đồ ăn ngon và hợp khẩu
                            vị. Chắc chắn tôi sẽ quay lại trong lần tới!
                          </p>
                          <div className="billard-detail-review-reply">
                            <a href="#" className="review-reply-btn">
                              <i className="fa fa-reply"></i>
                              Trả lời
                            </a>
                            <div className="review-reaction">
                              <a href="#" className="review-like active">
                                <i className="fa fa-thumbs-up"></i> 15
                              </a>
                              <a href="#" className="review-dislike">
                                <i className="fa fa-thumbs-down"></i> 05
                              </a>
                              <a href="#" className="review-love">
                                <i className="fa fa-heart"></i>
                                50
                              </a>
                            </div>
                          </div>
                        </div>
                        <div className="billard-detail-review-item review-reply-item">
                          <div className="billard-detail-review-author">
                            <img src="../assets/img/testimonial/04.jpeg" alt />
                            <div className="billard-detail-review-author-info">
                              <div>
                                <h6>Hiếu Lê</h6>
                                <span>
                                  <i className="fa fa-clock"></i> 1 ngày trước
                                </span>
                              </div>
                              <div className="billard-detail-review-author-rating">
                                <i className="fas fa-star"></i>
                                <i className="fas fa-star"></i>
                                <i className="fas fa-star"></i>
                                <i className="fas fa-star"></i>
                                <i className="fas fa-star"></i>
                              </div>
                            </div>
                          </div>
                          <p>Tôi sẽ đến trải nghiệm Billard Club này</p>
                          <div className="billard-detail-review-reply">
                            <a href="#" className="review-reply-btn">
                              <i className="fa fa-reply"></i>
                              Trả lời
                            </a>
                            <div className="review-reaction">
                              <a href="#" className="review-like">
                                <i className="fa fa-thumbs-up"></i>
                                15
                              </a>
                              <a href="#" className="review-dislike active">
                                <i className="fa fa-thumbs-down"></i> 05
                              </a>
                              <a href="#" className="review-love">
                                <i className="fa fa-heart"></i>
                                50
                              </a>
                            </div>
                          </div>
                        </div>
                        <div className="billard-detail-review-item">
                          <div className="billard-detail-review-author">
                            <img src="../assets/img/testimonial/04.jpeg" alt />
                            <div className="billard-detail-review-author-info">
                              <div>
                                <h6>BillardBooking</h6>
                                <span>
                                  <i className="far fa-clock"></i> 1 giờ trước
                                </span>
                              </div>
                              <div className="billard-detail-review-author-rating">
                                <i className="fas fa-star"></i>
                                <i className="fas fa-star"></i>
                                <i className="fas fa-star"></i>
                                <i className="fas fa-star"></i>
                                <i className="fas fa-star"></i>
                              </div>
                            </div>
                          </div>
                          <p>
                            Cảm ơn các bạn đã đánh giá tốt. Hãy đặt qua website
                            để nhận nhiều ưu đãi
                          </p>
                          <div className="billard-detail-review-reply">
                            <a href="#" className="review-reply-btn">
                              <i className="fa fa-reply"></i>
                              Trả lời
                            </a>
                            <div className="review-reaction">
                              <a href="#" className="review-like">
                                <i className="fa fa-thumbs-up"></i>
                                15
                              </a>
                              <a href="#" className="review-dislike">
                                <i className="fa fa-thumbs-down"></i> 05
                              </a>
                              <a href="#" className="review-love active">
                                <i className="fa fa-heart"></i> 50
                              </a>
                            </div>
                          </div>
                        </div>
                        <div className="text-center my-4">
                          <a href="#" className="theme-btn">
                            {" "}
                            <span className="fa fa-sync-alt"></span>
                            Tải thêm
                          </a>
                        </div>
                      </div>
                      <div className="billard-detail-review-form">
                        <h4>Để lại đánh giá</h4>
                        <form action="#">
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
                                    />{" "}
                                    <label htmlFor="star-5">&#9733;</label>
                                    <input
                                      type="radio"
                                      name="rating"
                                      value="4"
                                      id="star-4"
                                    />{" "}
                                    <label htmlFor="star-4">&#9733;</label>
                                    <input
                                      type="radio"
                                      name="rating"
                                      value="3"
                                      id="star-3"
                                    />{" "}
                                    <label htmlFor="star-3">&#9733;</label>
                                    <input
                                      type="radio"
                                      name="rating"
                                      value="2"
                                      id="star-2"
                                    />{" "}
                                    <label htmlFor="star-2">&#9733;</label>
                                    <input
                                      type="radio"
                                      name="rating"
                                      value="1"
                                      id="star-1"
                                    />{" "}
                                    <label htmlFor="star-1">&#9733;</label>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-lg-6">
                              <div className="form-group">
                                <input
                                  type="text"
                                  className="form-control"
                                  placeholder="Nhập tên*"
                                />
                              </div>
                            </div>
                            <div className="col-lg-6">
                              <div className="form-group">
                                <input
                                  type="email"
                                  className="form-control"
                                  placeholder="Nhập Email*"
                                />
                              </div>
                            </div>
                          </div>
                          <div className="form-group">
                            <textarea
                              className="form-control"
                              cols="30"
                              rows="5"
                              placeholder="Nhận xét*"
                            ></textarea>
                          </div>
                          <button className="theme-btn" type="button">
                            Gửi đánh giá
                          </button>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-4">
                <div className="booking-sidebar billard-detail-side-content">
                  <div className="booking-item">
                    <div className="billard-detail-price">
                      <h4 className="billard-detail-price-tag">Nổi bật</h4>
                      <div className="billard-detail-price-amount">
                        Giá:<span>90.000đ</span> <del>110.000đ</del>
                      </div>
                    </div>
                    <div className="search-form">
                      <form action="#">
                        <div className="tour-search-wrapper">
                          <div className="row">
                            <div className="col-lg-12">
                              <div className="form-group passenger-box">
                                <div className="passenger-class">
                                  <label>Số lượng</label>
                                  <div className="form-group-icon">
                                    <div className="passenger-total">
                                      <div className="passenger-item">
                                        <div className="passenger-qty">
                                          <button
                                            type="button"
                                            className="minus-btn"
                                          >
                                            <i className="fa-solid fa-minus"></i>
                                          </button>
                                          <input
                                            type="text"
                                            name="table"
                                            className="qty-amount passenger-table"
                                            value="2"
                                            readOnly
                                          />
                                          <button
                                            type="button"
                                            className="plus-btn"
                                          >
                                            <i className="fa-soild fa-plus"></i>
                                          </button>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="col-lg-12">
                              <div className="form-group passenger-box">
                                <div className="passenger-class">
                                  <label>Loại bàn</label>
                                  <div className="form-group-icon">
                                    <div className="passenger-total">
                                      <span className="passenger-class-name">
                                        Pool table
                                      </span>
                                    </div>
                                  </div>
                                  <div className="passenger-class-info">
                                    <div className="form-check">
                                      <input
                                        className="form-check-input"
                                        type="radio"
                                        value="Pool table"
                                        name="table-type"
                                        id="table-type1"
                                      />
                                      <label
                                        className="form-check-label"
                                        htmlFor="table-type1"
                                      >
                                        Pool table
                                      </label>
                                    </div>
                                    <div className="form-check">
                                      <input
                                        className="form-check-input"
                                        checked
                                        type="radio"
                                        value="Bàn bi-a snooker"
                                        name="table-type"
                                        id="table-type2"
                                      />
                                      <label
                                        className="form-check-label"
                                        htmlFor="table-type2"
                                      >
                                        Bàn bi-a snooker
                                      </label>
                                    </div>
                                    <div className="form-check">
                                      <input
                                        className="form-check-input"
                                        type="radio"
                                        value="Pocket billiards"
                                        name="table-type"
                                        id="table-type3"
                                      />
                                      <label
                                        className="form-check-label"
                                        htmlFor="table-type3"
                                      >
                                        Pocket billiards
                                      </label>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="billard-detail-side-btn">
                            <button type="submit" className="theme-btn">
                              <span className="fa fa-shopping-bag"></span>Đặt
                              ngay
                            </button>
                            <a href="#" className="border-btn">
                              <i className="far fa-heart"></i> Thêm yêu thích
                            </a>
                          </div>
                        </div>
                      </form>
                    </div>
                    <div className="billard-detail-side-share">
                      <a href="#">
                        <i className="fa fa-share-nodes"></i> Chia sẻ
                      </a>
                      <span>
                        <i className="far fa-eye"></i> 250 Lượt xem
                      </span>
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
