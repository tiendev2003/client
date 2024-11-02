import { Breadcrumb } from "../../components";

const AboutPage = () => {
  return (
    <>
      <Breadcrumb title="Giới thiệu" items="Giới thiệu" />

      <div className="about-area py-120 mb-30">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <div
                className="about-left wow fadeInLeft"
                data-wow-duration="1s"
                data-wow-delay=".25s"
              >
                <div className="about-img">
                  <img src="../assets/img/billard/01.jpeg" alt="" />
                </div>
                <div className="about-experience">
                  <h1>
                    2 <span>+</span>
                  </h1>
                  <span className="about-experience-text">
                    Số năm kinh nghiệm
                  </span>
                </div>
                <div className="about-shape">
                  <img src="../assets/img/billard/02.svg" alt="" />
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div
                className="about-right wow animate__fadeInUp"
                data-wow-duration="1s"
                data-wow-delay=".25s"
              >
                <div className="site-heading mb-3">
                  <span className="site-title-tagline">Giới thiệu</span>
                  <h2 className="site-title">
                    Chúng Tôi Là Công Ty Đặt Bàn Bi-A Hàng Đầu Việt Nam
                  </h2>
                </div>
                <p className="about-text">
                  Chúng tôi cung cấp dịch vụ đặt bàn bi-a chất lượng cao với
                  nhiều lựa chọn khác nhau. Đội ngũ chuyên nghiệp của chúng tôi
                  sẵn sàng phục vụ để mang đến trải nghiệm tốt nhất cho khách
                  hàng.
                </p>
                <div className="about-list-wrapper">
                  <ul className="about-list list-unstyled">
                    <li>
                      <div className="about-icon">
                        <span className="fa fa-check-circle"></span>
                      </div>
                      <div className="about-list-text">
                        <p>Cung cấp nhiều loại bàn: Billiard, Poker, Snooker</p>
                      </div>
                    </li>
                    <li>
                      <div className="about-icon">
                        <span className="fa fa-check-circle"></span>
                      </div>
                      <div className="about-list-text">
                        <p>Đặt chỗ nhanh chóng và dễ dàng qua website</p>
                      </div>
                    </li>
                    <li>
                      <div className="about-icon">
                        <span className="fa fa-check-circle"></span>
                      </div>
                      <div className="about-list-text">
                        <p>Dịch vụ khách hàng tận tâm 24/7</p>
                      </div>
                    </li>
                  </ul>
                </div>
                <div className="about-bottom">
                  <a href="#" className="theme-btn">
                    Tìm Hiểu Thêm <i className="fa fa-arrow-right"></i>
                  </a>
                  <div className="about-call">
                    <div className="about-call-icon">
                      <i className="fa fa-headset"></i>
                    </div>
                    <div className="about-call-content">
                      <span>Gọi Chúng Tôi Bất Cứ Khi Nào</span>
                      <h5 className="about-call-number">
                        <a href="#">+2 123 654 789</a>
                      </h5>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="counter-area pt-80 pb-80">
        <div className="container">
          <div className="row">
            <div className="col-lg-3 col-sm-6">
              <div className="counter-box">
                <div className="icon">
                  <i className="fa fa-check-circle"></i>
                </div>
                <div className="counter-content">
                  <div className="counter-number">
                    <span
                      className="counter"
                      data-count="+"
                      data-to="120"
                      data-speed="3000"
                    >
                      120
                    </span>
                    <span className="counter-sign">k</span>
                  </div>
                  <h6 className="title">Đã bàn thành công</h6>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-sm-6">
              <div className="counter-box">
                <div className="icon">
                  <i className="fa fa-earth-americas"></i>
                </div>
                <div className="counter-content">
                  <div className="counter-number">
                    <span
                      className="counter"
                      data-count="+"
                      data-to="200"
                      data-speed="3000"
                    >
                      200
                    </span>
                    <span className="counter-sign">+</span>
                  </div>
                  <h6 className="title">Điểm đến</h6>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-sm-6">
              <div className="counter-box">
                <div className="icon">
                  <i className="fa fa-smile"></i>
                </div>
                <div className="counter-content">
                  <div className="counter-number">
                    <span
                      className="counter"
                      data-count="+"
                      data-to="40"
                      data-speed="3000"
                    >
                      40
                    </span>
                    <span className="counter-sign">k</span>
                  </div>
                  <h6 className="title">Khách hàng hài lòng</h6>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-sm-6">
              <div className="counter-box">
                <div className="icon">
                  <i className="fa fa-users"></i>
                </div>
                <div className="counter-content">
                  <div className="counter-number">
                    <span
                      className="counter"
                      data-count="+"
                      data-to="180"
                      data-speed="3000"
                    >
                      180
                    </span>
                    <span className="counter-sign">+</span>
                  </div>
                  <h6 className="title">Đối tác của chúng tôi</h6>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="team-area py-120">
        <div className="container">
          <div className="row">
            <div
              className="col-lg-6 mx-auto wow animate__fadeInDown"
              data-wow-duration="1s"
              data-wow-delay=".25s"
            >
              <div className="site-heading text-center">
                <span className="site-title-tagline">Đội ngũ</span>
                <h2 className="site-title">Gặp gỡ với nhóm của chúng tôi</h2>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6 col-lg-3">
              <div
                className="team-item wow animate__fadeInUp"
                data-wow-duration="1s"
                data-wow-delay=".25s"
              >
                <div className="team-img">
                  <img src="../assets/img/billard/01.jpeg" alt="thumb" />
                </div>
                <div className="team-content">
                  <div className="team-bio">
                    <h5>
                      <a href="#">Huỳnh Gia Huy</a>
                    </h5>
                    <span>Front-End Developer</span>
                  </div>
                  <div className="team-social">
                    <ul className="team-social-btn">
                      <li>
                        <span>
                          <i className="fa fa-share-alt"></i>
                        </span>
                      </li>
                      <li>
                        <a href="#">
                          <i className="fa-brands fa-facebook"></i>
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          <i className="fa-brands fa-instagram"></i>
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          <i className="fa-brands fa-linkedin-in"></i>
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-lg-3">
              <div
                className="team-item wow animate__fadeInUp"
                data-wow-duration="1s"
                data-wow-delay=".50s"
              >
                <div className="team-img">
                  <img src="../assets/img/billard/01.jpeg" alt="thumb" />
                </div>
                <div className="team-content">
                  <div className="team-bio">
                    <h5>
                      <a href="#">Lê Trung Hiếu</a>
                    </h5>
                    <span>Teams leader</span>
                  </div>
                  <div className="team-social">
                    <ul className="team-social-btn">
                      <li>
                        <span>
                          <i className="fa fa-share-alt"></i>
                        </span>
                      </li>
                      <li>
                        <a href="#">
                          <i className="fa-brands fa-facebook"></i>
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          <i className="fa-brands fa-instagram"></i>
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          <i className="fa-brands fa-linkedin-in"></i>
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-lg-3">
              <div
                className="team-item wow animate__fadeInUp"
                data-wow-duration="1s"
                data-wow-delay=".75s"
              >
                <div className="team-img">
                  <img src="../assets/img/billard/01.jpeg" alt="thumb" />
                </div>
                <div className="team-content">
                  <div className="team-bio">
                    <h5>
                      <a href="#">Nguyễn Ngọc Phương</a>
                    </h5>
                    <span>Back-End Developer</span>
                  </div>
                  <div className="team-social">
                    <ul className="team-social-btn">
                      <li>
                        <span>
                          <i className="fa fa-share-alt"></i>
                        </span>
                      </li>
                      <li>
                        <a href="#">
                          <i className="fa-brands fa-facebook"></i>
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          <i className="fa-brands fa-instagram"></i>
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          <i className="fa-brands fa-linkedin-in"></i>
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-lg-3">
              <div
                className="team-item wow animate__fadeInUp"
                data-wow-duration="1s"
                data-wow-delay="1s"
              >
                <div className="team-img">
                  <img src="../assets/img/billard/01.jpeg" alt="thumb" />
                </div>
                <div className="team-content">
                  <div className="team-bio">
                    <h5>
                      <a href="#">Nguễn Vũ Đại Nam</a>
                    </h5>
                    <span>Back-End Developer</span>
                  </div>
                  <div className="team-social">
                    <ul className="team-social-btn">
                      <li>
                        <span>
                          <i className="fa fa-share-alt"></i>
                        </span>
                      </li>
                      <li>
                        <a href="#">
                          <i className="fa-brands fa-facebook"></i>
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          <i className="fa-brands fa-instagram"></i>
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          <i className="fa-brands fa-linkedin-in"></i>
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-lg-3">
              <div
                className="team-item wow animate__fadeInUp"
                data-wow-duration="1s"
                data-wow-delay="1.25s"
              >
                <div className="team-img">
                  <img src="../assets/img/billard/01.jpeg" alt="thumb" />
                </div>
                <div className="team-content">
                  <div className="team-bio">
                    <h5>
                      <a href="#">Nguyễn Ngọc Thạch</a>
                    </h5>
                    <span>Back-End Developer</span>
                  </div>
                  <div className="team-social">
                    <ul className="team-social-btn">
                      <li>
                        <span>
                          <i className="fa fa-share-alt"></i>
                        </span>
                      </li>
                      <li>
                        <a href="#">
                          <i className="fa-brands fa-facebook"></i>
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          <i className="fa-brands fa-instagram"></i>
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          <i className="fa-brands fa-linkedin-in"></i>
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="testimonial-area bg py-120">
        <div className="container">
          <div className="row align-items-center">
            <div
              className="col-lg-5 mx-auto wow animate__fadeInDown"
              data-wow-duration="1s"
              data-wow-delay=".25s"
            >
              <div className="site-heading">
                <span className="site-title-tagline">Đánh giá</span>
                <h2 className="site-title">
                  Khách hàng đánh giá về chúng tôi?
                </h2>
                <p>
                  Chúng tôi rất tự hào khi nhận được phản hồi tích cực từ khách
                  hàng. Nhiều người đã chia sẻ rằng họ hài lòng với chất lượng
                  sản phẩm và dịch vụ mà chúng tôi cung cấp. Đội ngũ nhân viên
                  tận tâm, chuyên nghiệp và luôn sẵn sàng lắng nghe nhu cầu của
                  khách hàng. Chúng tôi cam kết không ngừng cải thiện để mang
                  đến trải nghiệm tốt nhất. Cảm ơn bạn đã tin tưởng và lựa chọn
                  chúng tôi
                </p>
                <a href="#" className="theme-btn mt-30">
                  Đọc thêm<i className="fa fa-arrow-right"></i>
                </a>
              </div>
            </div>
            <div className="col-lg-7">
              <div
                className="testimonial-slider owl-carousel owl-theme wow animate__fadeInUp"
                data-wow-duration="1s"
                data-wow-delay=".25s"
              >
                <div className="testimonial-single">
                  <div className="testimonial-content">
                    <div className="testimonial-author-img">
                      <img src="../assets/img/billard/01.jpeg" alt="" />
                    </div>
                    <div className="testimonial-author-info">
                      <h4>Huỳnh Gia Huy</h4>
                      <p>Khách hàng</p>
                    </div>
                  </div>
                  <div className="testimonial-quote">
                    <p>
                      Những trải nghiệm trên trang web này thật sự nổi bật. Giao
                      diện dễ sử dụng và nhanh chóng, giúp tôi tìm được bàn phù
                      hợp mà không gặp khó khăn nào. Dịch vụ khách hàng cũng rất
                      tận tâm và chu đáo, điều này khiến tôi cảm thấy thoải mái
                      và tin tưởng. Tôi chắc chắn sẽ quay lại sử dụng dịch vụ
                      này trong tương lai!
                    </p>
                    <div className="testimonial-quote-icon">
                      <img src="../assets/img/icon/quote.svg" alt="" />
                    </div>
                  </div>
                  <div className="testimonial-rate">
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                  </div>
                </div>
                <div className="testimonial-single">
                  <div className="testimonial-content">
                    <div className="testimonial-author-img">
                      <img src="../assets/img/billard/01.jpeg" alt="" />
                    </div>
                    <div className="testimonial-author-info">
                      <h4>Huỳnh Gia Huy</h4>
                      <p>Khách hàng</p>
                    </div>
                  </div>
                  <div className="testimonial-quote">
                    <p>
                      Những trải nghiệm trên trang web này thật sự nổi bật. Giao
                      diện dễ sử dụng và nhanh chóng, giúp tôi tìm được bàn phù
                      hợp mà không gặp khó khăn nào. Dịch vụ khách hàng cũng rất
                      tận tâm và chu đáo, điều này khiến tôi cảm thấy thoải mái
                      và tin tưởng. Tôi chắc chắn sẽ quay lại sử dụng dịch vụ
                      này trong tương lai!
                    </p>
                    <div className="testimonial-quote-icon">
                      <img src="../assets/img/icon/quote.svg" alt="" />
                    </div>
                  </div>
                  <div className="testimonial-rate">
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                  </div>
                </div>
                <div className="testimonial-single">
                  <div className="testimonial-content">
                    <div className="testimonial-author-img">
                      <img src="../assets/img/billard/01.jpeg" alt="" />
                    </div>
                    <div className="testimonial-author-info">
                      <h4>Huỳnh Gia Huy</h4>
                      <p>Khách hàng</p>
                    </div>
                  </div>
                  <div className="testimonial-quote">
                    <p>
                      Những trải nghiệm trên trang web này thật sự nổi bật. Giao
                      diện dễ sử dụng và nhanh chóng, giúp tôi tìm được bàn phù
                      hợp mà không gặp khó khăn nào. Dịch vụ khách hàng cũng rất
                      tận tâm và chu đáo, điều này khiến tôi cảm thấy thoải mái
                      và tin tưởng. Tôi chắc chắn sẽ quay lại sử dụng dịch vụ
                      này trong tương lai!
                    </p>
                    <div className="testimonial-quote-icon">
                      <img src="../assets/img/icon/quote.svg" alt="" />
                    </div>
                  </div>
                  <div className="testimonial-rate">
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                  </div>
                </div>
                <div className="testimonial-single">
                  <div className="testimonial-content">
                    <div className="testimonial-author-img">
                      <img src="../assets/img/billard/01.jpeg" alt="" />
                    </div>
                    <div className="testimonial-author-info">
                      <h4>Huỳnh Gia Huy</h4>
                      <p>Khách hàng</p>
                    </div>
                  </div>
                  <div className="testimonial-quote">
                    <p>
                      Những trải nghiệm trên trang web này thật sự nổi bật. Giao
                      diện dễ sử dụng và nhanh chóng, giúp tôi tìm được bàn phù
                      hợp mà không gặp khó khăn nào. Dịch vụ khách hàng cũng rất
                      tận tâm và chu đáo, điều này khiến tôi cảm thấy thoải mái
                      và tin tưởng. Tôi chắc chắn sẽ quay lại sử dụng dịch vụ
                      này trong tương lai!
                    </p>
                    <div className="testimonial-quote-icon">
                      <img src="../assets/img/icon/quote.svg" alt="" />
                    </div>
                  </div>
                  <div className="testimonial-rate">
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="feature-area py-120">
        <div className="container">
          <div className="feature-wrapper">
            <div className="row">
              <div className="col-md-6 col-lg-4">
                <div
                  className="feature-item wow animate__fadeInUp"
                  data-wow-duration="1s"
                  data-wow-delay=".25s"
                >
                  <div className="feature-icon">
                    <i className="fa-solid fa-earth-asia"></i>
                  </div>
                  <h4 className="feature-title">Phủ sóng toàn quốc</h4>
                  <p>Rỗng</p>
                </div>
              </div>
              <div className="col-md-6 col-lg-4">
                <div
                  className="feature-item wow animate__fadeInUp"
                  data-wow-duration="1s"
                  data-wow-delay=".50s"
                >
                  <div className="feature-icon">
                    <i className="fa-solid fa-medal"></i>
                  </div>
                  <h4 className="feature-title">Dịch vụ chất lượng</h4>
                  <p>Rỗng</p>
                </div>
              </div>
              <div className="col-md-6 col-lg-4">
                <div
                  className="feature-item wow animate__fadeInUp"
                  data-wow-duration="1s"
                  data-wow-delay=".75s"
                >
                  <div className="feature-icon">
                    <i className="fa-solid fa-headset"></i>
                  </div>
                  <h4 className="feature-title">Dịch vụ khách hàng 24/7</h4>
                  <p>Rỗng</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="cta-area pb-120">
        <div className="container">
          <div className="cta-wrapper">
            <div className="row">
              <div className="col-lg-7 mx-auto text-center">
                <div className="cta-text">
                  <h1>Đặt bàn đầu tiên được giảm giá 70%!</h1>
                  <p>
                    Đừng bỏ lỡ cơ hội trải nghiệm dịch vụ tuyệt vời với mức giá
                    cực kỳ hấp dẫn. Hãy nhanh tay để tận hưởng những giây phút
                    thú vị cùng bạn bè và gia đình!{" "}
                  </p>
                </div>
                <a href="#" className="theme-btn mt-30">
                  Đặt ngay <i className="fa fa-arrow-right"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="partner-area pt-100 pb-80">
        <div className="container">
          <div className="partner-wrapper partner-slider owl-carousel owl-theme">
            <img src="../assets/img/billard/01.jpeg" alt="thumb" />
            <img src="../assets/img/billard/01.jpeg" alt="thumb" />
            <img src="../assets/img/billard/01.jpeg" alt="thumb" />
            <img src="../assets/img/billard/01.jpeg" alt="thumb" />
            <img src="../assets/img/billard/01.jpeg" alt="thumb" />
            <img src="../assets/img/billard/01.jpeg" alt="thumb" />
            <img src="../assets/img/billard/01.jpeg" alt="thumb" />
            <img src="../assets/img/billard/01.jpeg" alt="thumb" />
            <img src="../assets/img/billard/01.jpeg" alt="thumb" />
          </div>
        </div>
      </div>
    </>
  );
};

export default AboutPage;
