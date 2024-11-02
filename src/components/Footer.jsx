import AppStore from '../assets/img/app-store.png'
import AppTwo from '../assets/img/google-play.png'
import Logo from '../assets/img/logo/logo-dark.png'

const Footer = () => {
    return (
        <footer className="footer-area">
            <div className="footer-widget">
                <div className="container">
                    <div className="row footer-widget-wrapper pt-100 pb-70">
                        <div className="col-md-6 col-lg-3">
                            <div className="footer-widget-box about-us">
                                <a href="#" className="footer-logo">
                                    <img src={Logo} alt="logo" />
                                </a>
                                <p className="mb-4">
                                    Hãy liên hệ với chúng tôi để được tư vấn và hỗ trợ tốt nhất!
                                </p>
                                <ul className="footer-contact">
                                    <li>
                                        <div className="footer-call">
                                            <div className="footer-call-icon">
                                                <i className="fa-solid fa-headset" />
                                            </div>
                                            <div className="footer-call-info">
                                                <h6>Dịch vụ khách hàng 24/7</h6>
                                                <a href="#">+1900 246 357</a>
                                            </div>
                                        </div>
                                    </li>
                                    <li><i className="fa fa-map-location-dot" />256 Phan Huy Ích, Gò Vấp, TP.Hồ Chí Minh</li>
                                    <li><a href="#"><i className="fa-solid fa-envelope" /><span className="__cf_email__">billardbooking@gmail.com</span></a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-md-6 col-lg-2">
                            <div className="footer-widget-box list">
                                <h4 className="footer-widget-title">Về Chúng Tôi</h4>
                                <ul className="footer-list">
                                    <li><a href="#"><i className="fas fa-angle-double-right" /> Giới thiệu</a></li>
                                    <li><a href="#"><i className="fas fa-angle-double-right" /> Blog</a></li>
                                    <li><a href="#"><i className="fas fa-angle-double-right" /> Tuyển dụng</a></li>
                                    <li><a href="#"><i className="fas fa-angle-double-right" /> Chính sách bảo mật thông tin
                                        cá nhân</a></li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-md-6 col-lg-2">
                            <div className="footer-widget-box list">
                                <h4 className="footer-widget-title">Dịch vụ</h4>
                                <ul className="footer-list">
                                    <li><a href="#"><i className="fas fa-angle-double-right" /> Khách hàng</a></li>
                                    <li><a href="#"><i className="fas fa-angle-double-right" /> Doanh nghiệp</a></li>
                                    <li><a href="#"><i className="fas fa-angle-double-right" /> Đăng ký doanh nghiệp</a></li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-md-6 col-lg-2">
                            <div className="footer-widget-box list">
                                <h4 className="footer-widget-title">Trung tâm trợ giúp</h4>
                                <ul className="footer-list">
                                    <li><a href="#"><i className="fas fa-angle-double-right" /> Các câu hỏi thường gặp</a>
                                    </li>
                                    <li><a href="#"><i className="fas fa-angle-double-right" /> Gửi yêu cầu hỗ trợ</a></li>
                                    <li><a href="#"><i className="fas fa-angle-double-right" /> Hướng dẫn đăng ký doanh
                                        nghiệp</a></li>
                                    <li><a href="#"><i className="fas fa-angle-double-right" /> Hướng dẫn đặt bàn</a></li>
                                    <li><a href="#"><i className="fas fa-angle-double-right" /> Chính sách giải quyết khiếu
                                        nại</a></li>
                                    <li><a href="#"><i className="fas fa-angle-double-right" /> Điều khoản sử dụng</a></li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-md-6 col-lg-3">
                            <div className="footer-widget-box list">
                                <h4 className="footer-widget-title">Ưu đãi</h4>
                                <div className="footer-newsletter">
                                    <p>Đăng ký nhận khuyến mãi của chúng tôi và thông tin mới nhất</p>
                                    <div className="subscribe-form">
                                        <form action="#">
                                            <div className="form-group">
                                                <div className="form-group-icon">
                                                    <input type="email" className="form-control" placeholder="Nhập Email" />
                                                    <i className="fa-solid fa-envelope" />
                                                </div>
                                            </div>
                                            <button className="theme-btn" type="submit">
                                                Đăng Ký Ngay <i className="fa fa-paper-plane" />
                                            </button>
                                            <p><i className="fa fa-lock" /> Thông tin của bạn được chúng tôi bảo mật an toàn.
                                            </p>
                                        </form>
                                    </div>
                                </div>
                                <div className="footer-payment-method">
                                    <h6>Download Now:</h6>
                                    <div className="payment-method-img">
                                        <img src={AppStore} alt="App Store" />
                                        <img src={AppTwo} alt="Google Play" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="copyright">
                <div className="container">
                    <div className="row">
                        <div className="col-md-6 align-self-center">
                            <p className="copyright-text">
                                © Copyright <span id="date" /> <a href="#"> BillardBooking </a> All Rights
                                Reserved.
                            </p>
                        </div>
                        <div className="col-md-6 align-self-center">
                            <ul className="footer-social">
                                <li><a href="#"><i className="fab fa-facebook-f" /></a></li>
                                <li><a href="#"><i className="fab fa-instagram" /></a></li>
                                <li><a href="#"><i className="fab fa-linkedin-in" /></a></li>
                                <li><a href="#"><i className="fab fa-youtube" /></a></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </footer>

    )
}

export default Footer
