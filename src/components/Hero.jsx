import { useEffect, useState } from "react";
import axiosClient from "../api/axiosClient";

const Hero = () => {
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
    <div className="hero-section">
      <div
        className="hero-single"
        style={{
          backgroundImage: `url(${
            banners?.find((banner) =>
              banner.tenDanhMuc.localeCompare("chính")
            )?.link_url
          })`,
        }}
      >
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-12 mx-auto">
              <div className="hero-content text-center">
                <div className="hero-content-wrapper">
                  <h1 className="hero-title">
                    Tìm Billard Club với giá tốt nhất
                  </h1>
                  <p>Xem những ưu đãi tốt nhất tại hơn 5000 Billards</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
