import { useEffect, useState } from "react";
import axiosClient from "../api/axiosClient";

const Banner = () => {
  const [banners, setBanners] = useState([]);
  useEffect(() => {
    const fetchBanner = async () => {
      try {
        const response = await axiosClient.get("/anhquangcao");
        setBanners(response.data.data);
      } catch (error) {
        console.log("Failed to fetch banner: ", error);
      }
    };
    fetchBanner();
  }, []);
  return (
    <div className="banner-area py-120">
      <div className="container">
        <div className="row">
          <div className="col-lg-6">
            <div
              className="banner-item wow fadeInUp"
              data-wow-duration="1s"
              data-wow-delay=".25s"
            >
              <div className="banner-img">
                <img
                  src={`${
                    banners?.find((banner) =>
                      banner.tenDanhMuc.localeCompare("Banner phụ bên trái")
                    )?.link_url
                  }`}
                  alt=""
                />
              </div>
              <div className="banner-content">
                <h3>
                  Đặt lần đầu Giảm ngay <span>70%!</span>
                </h3>
                <p>
                  Trải nghiệm dịch vụ đẳng cấp với ưu đãi cực sốc cho lần đặt
                  đầu tiên. Nhanh tay nhận ngay cơ hội giảm giá hấp dẫn!
                </p>
                <a href="#" className="theme-btn">
                  Xem thêm
                  <i className="fa fa-arrow-right" />
                </a>
              </div>
            </div>
          </div>
          <div className="col-lg-6">
            <div
              className="banner-item wow fadeInUp"
              data-wow-duration="1s"
              data-wow-delay=".50s"
            >
              <div className="banner-img">
                <img
                  src={`${
                    banners?.find((banner) =>
                      banner.tenDanhMuc.localeCompare("bên phải")
                    )?.link_url ??
                    `${
                      banners?.find((banner) =>
                        banner.tenDanhMuc.localeCompare("bên trái")
                      )?.link_url
                    }`
                  }`}
                  alt=""
                />
              </div>
              <div className="banner-content">
                <h3>
                  Chào mừng khai trương<span> ưu đãi 70%!</span>
                </h3>
                <p>
                  Đặt lịch ngay hôm nay để nhận voucher ưu đãi lên đến 70%. Đừng
                  bỏ lỡ cơ hội tận hưởng những giây phút thư giãn tuyệt vời cùng
                  chúng tôi!
                </p>
                <a href="#" className="theme-btn">
                  Xem thêm
                  <i className="fa fa-arrow-right" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
