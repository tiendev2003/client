import App from "../assets/img/app-store.png";
import DownloadApp from "../assets/img/app.png";
import AppTwo from "../assets/img/google-play.png";

const Download = () => {
  return (
    <div className="download-area py-120">
      <div className="container">
        <div className="row">
          <div className="col-lg-6">
            <div
              className="download-img wow fadeInUp"
              data-wow-duration="1s"
              data-wow-delay=".25s"
            >
              <img src={DownloadApp} alt="down-load-app" />
            </div>
          </div>
          <div className="col-lg-6">
            <div
              className="download-content wow fadeInDown"
              data-wow-duration="1s"
              data-wow-delay=".25s"
            >
              <div className="site-heading mb-0">
                <span className="site-title-tagline">Tải về</span>
                <h2 className="site-title">
                  Ứng dụng BillardBooking cho Android và IOS đã có sẵn! Tải ngay
                </h2>
                <p>
                  {" "}
                  BillardBooking luôn sẵn sàng phục vụ, dù bạn ở bất kỳ đâu!.
                </p>
                <ul className="download-feature">
                  <li>
                    <i className="fa fa-check" /> Đặt bàn siêu tốc, tiện lợi mọi
                    lúc mọi nơi
                  </li>
                  <li>
                    <i className="fa fa-check" /> Tải ngay hôm nay để nhận ngay
                    ưu đãi đặc biệt
                  </li>
                  <li>
                    <i className="fa fa-check" /> Nhanh tay tải ứng dụng và trở
                    thành cao thủ billiard ngay!
                  </li>
                </ul>
                <div className="download-link">
                  <a href="#">
                    <img src={App} alt="App Store" />
                  </a>
                  <a href="#">
                    <img src={AppTwo} alt="Google Play" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Download;
