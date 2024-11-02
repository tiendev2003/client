import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Testimonial = () => {
  const testimonials = [
    {
      name: "Huỳnh Gia Huy",
      role: "Khách hàng",
      quote: "Những trải nghiệm trên trang web này thật sự nổi bật. Giao diện dễ sử dụng và nhanh chóng, giúp tôi tìm được bàn phù hợp mà không gặp khó khăn nào. Dịch vụ khách hàng cũng rất tận tâm và chu đáo, điều này khiến tôi cảm thấy thoải mái và tin tưởng. Tôi chắc chắn sẽ quay lại sử dụng dịch vụ này trong tương lai!",
      image: "../assets/img/billard/01.jpeg"
    },
    {
      name: "Huỳnh Gia Huy",
      role: "Khách hàng",
      quote: "Những trải nghiệm trên trang web này thật sự nổi bật. Giao diện dễ sử dụng và nhanh chóng, giúp tôi tìm được bàn phù hợp mà không gặp khó khăn nào. Dịch vụ khách hàng cũng rất tận tâm và chu đáo, điều này khiến tôi cảm thấy thoải mái và tin tưởng. Tôi chắc chắn sẽ quay lại sử dụng dịch vụ này trong tương lai!",
      image: "../assets/img/billard/01.jpeg"
    },
    {
      name: "Huỳnh Gia Huy",
      role: "Khách hàng",
      quote: "Những trải nghiệm trên trang web này thật sự nổi bật. Giao diện dễ sử dụng và nhanh chóng, giúp tôi tìm được bàn phù hợp mà không gặp khó khăn nào. Dịch vụ khách hàng cũng rất tận tâm và chu đáo, điều này khiến tôi cảm thấy thoải mái và tin tưởng. Tôi chắc chắn sẽ quay lại sử dụng dịch vụ này trong tương lai!",
      image: "../assets/img/billard/01.jpeg"
    },
    // You can add more testimonials here
  ];

  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    autoplay: false,
    draggable: true,
    nextArrow: <div className="slick-next"><i className='fa fa-long-arrow-right'></i></div>,
    prevArrow: <div className="slick-prev"><i className='fa fa-long-arrow-left'></i></div>,
    responsive: [
        {
            breakpoint: 1000,
            settings: {
                slidesToShow: 4,
                slidesToScroll: 1,
            },
        },
        {
            breakpoint: 600,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 1,
            },
        },
        {
            breakpoint: 0,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
            },
        },
    ],
};

  return (
    <div className="testimonial-area bg pt-50">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-lg-5 mx-auto wow animate__fadeInDown" data-wow-duration="1s" data-wow-delay=".25s">
            <div className="site-heading">
              <span className="site-title-tagline">Đánh giá</span>
              <h2 className="site-title">Khách hàng đánh giá về chúng tôi?</h2>
              <p>Chúng tôi rất tự hào khi nhận được phản hồi tích cực từ khách hàng. Nhiều người đã chia sẻ rằng họ hài lòng với chất lượng sản phẩm và dịch vụ mà chúng tôi cung cấp. Đội ngũ nhân viên tận tâm, chuyên nghiệp và luôn sẵn sàng lắng nghe nhu cầu của khách hàng. Chúng tôi cam kết không ngừng cải thiện để mang đến trải nghiệm tốt nhất. Cảm ơn bạn đã tin tưởng và lựa chọn chúng tôi.</p>
              <a href="#" className="theme-btn mt-30">Đọc thêm<i className="fa fa-arrow-right" /></a>
            </div>
          </div>
          <div className="col-lg-7">
            <Slider {...settings} className="testimonial-slider">
              {testimonials.map((testimonial, index) => (
                <div key={index} className="testimonial-single">
                  <div className="testimonial-content">
                    <div className="testimonial-author-img">
                      <img src={testimonial.image} alt={testimonial.name} />
                    </div>
                    <div className="testimonial-author-info">
                      <h4>{testimonial.name}</h4>
                      <p>{testimonial.role}</p>
                    </div>
                  </div>
                  <div className="testimonial-quote">
                    <p>{testimonial.quote}</p>
                    <div className="testimonial-quote-icon">
                      <img src="../assets/img/icon/quote.svg" alt="quote icon" />
                    </div>
                  </div>
                  <div className="testimonial-rate">
                    <i className="fas fa-star" />
                    <i className="fas fa-star" />
                    <i className="fas fa-star" />
                    <i className="fas fa-star" />
                    <i className="fas fa-star" />
                  </div>
                </div>
              ))}
            </Slider>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Testimonial;
