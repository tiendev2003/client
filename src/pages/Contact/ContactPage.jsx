import { Breadcrumb } from "../../components";

const ContactPage = () => {
  return (
    <>
      <Breadcrumb title="Liên hệ" items="Liên hệ" />

      <div className="contact-area py-120">
        <div className="container">
          <div className="contact-wrapper">
            <div className="row">
              <div className="col-lg-4">
                <div className="contact-content">
                  <div className="contact-info">
                    <div className="contact-info-icon">
                      <i className="fa fa-map-marker-alt"></i>
                    </div>
                    <div className="contact-info-content">
                      <h5>Địa chỉ văn phòng</h5>
                      <p>256 Phan Huy Ích, P.12, Q.Gò Vấp, TP.HCM</p>
                    </div>
                  </div>
                  <div className="contact-info">
                    <div className="contact-info-icon">
                      <i className="fa fa-phone"></i>
                    </div>
                    <div className="contact-info-content">
                      <h5>Gọi ngay</h5>
                      <p>+1900 246 357</p>
                    </div>
                  </div>
                  <div className="contact-info">
                    <div className="contact-info-icon">
                      <i className="fa fa-envelope"></i>
                    </div>
                    <div className="contact-info-content">
                      <h5>Email</h5>
                      <p>
                        <a href="" className="__cf_email__">
                          billardbooking@gmail.com
                        </a>
                      </p>
                    </div>
                  </div>
                  <div className="contact-info">
                    <div className="contact-info-icon">
                      <i className="fa fa-clock"></i>
                    </div>
                    <div className="contact-info-content">
                      <h5>Thời gian làm việc</h5>
                      <p>T2 - T6 (08.30AM - 05.30PM)</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-8 align-self-center">
                <div className="contact-form">
                  <div className="contact-form-header">
                    <h2>Liên hệ</h2>
                    <p> Chúng tôi sẽ phản hồi nhanh. </p>
                  </div>
                  <form method="post" action="#" id="contact-form">
                    <div className="row">
                      <div className="col-md-6">
                        <div className="form-group">
                          <input
                            type="text"
                            className="form-control"
                            name="name"
                            placeholder="Họ và tên"
                            required
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <input
                            type="email"
                            className="form-control"
                            name="email"
                            placeholder="Email"
                            required
                          />
                        </div>
                      </div>
                    </div>
                    <div className="form-group">
                      <input
                        type="text"
                        className="form-control"
                        name="subject"
                        placeholder="Tiêu đề"
                        required
                      />
                    </div>
                    <div className="form-group">
                      <textarea
                        name="message"
                        cols="30"
                        rows="5"
                        className="form-control"
                        placeholder="Nội dung"
                      ></textarea>
                    </div>
                    <button type="submit" className="theme-btn">
                      Gửi <i className="fa fa-paper-plane"></i>
                    </button>
                    <div className="col-md-12 mt-3">
                      <div className="form-messege text-success"></div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="contact-map">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.411885563475!2d106.6173706143371!3d10.853426162511526!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3175295b2c8e9a15%3A0xbddc87c74006ae8d!2zR8O0bmcgVmFwcGhhLCBUUEguIE4uIEdvw6AgVmlldA!5e0!3m2!1sen!2s!4v1636509037831!5m2!1sen!2s"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
        ></iframe>
      </div>
    </>
  );
};

export default ContactPage;
