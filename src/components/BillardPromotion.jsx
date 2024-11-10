import "@slick/slick-theme.css";
import "@slick/slick.css";
import "animate.css/animate.min.css";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import { fetchCuahangs } from "../features/shop/shopSlice";
import { formatMoney } from "../utils/formatMoney";
const BillardPromotion = () => {
  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 4,
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
    responsive: [
      {
        breakpoint: 1000,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  const dispatch = useDispatch();

  const { cuahangs } = useSelector((state) => state.shop);

  useEffect(() => {
    dispatch(fetchCuahangs());
  }, [dispatch]);
  const billardItems = cuahangs.filter(
    (item) => item.badge === "Đang khuyến mãi"
  );
  return (
    <div className="billard-area bg pt-60">
      <div className="container">
        <div className="row">
          <div className="col-lg-6 mx-auto animated animate__fadeIn">
            <div className="site-heading text-center">
              <span className="site-title-tagline">Billard Club</span>
              <h2 className="site-title">Ưu đãi dành cho bạn</h2>
            </div>
          </div>
        </div>
        <Slider {...settings} className="billard-slider">
          {billardItems.map((cuahang, index) => (
            <div className="billard-item" key={index}>
              <div className="billard-img">
                <span className="badge badge-discount">{cuahang.badge}</span>
                <img
                  src={cuahang.AnhDaiDien_CuaHang}
                  alt={cuahang.TenCuaHang}
                />
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
                </div>
                <div className="billard-bottom">
                  <div className="billard-price">
                    <span className="billard-price-amount">
                      {/* Assuming price is a property */}
                      {formatMoney(cuahang.minGiaBan)}{" "}
                      <span className="billard-price-type">/Giờ</span>
                    </span>
                  </div>
                  <div className="billard-text-btn">
                    <Link to={`/billiard/${cuahang.id}`}>
                      Chi tiết <i className="fas fa-arrow-right" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default BillardPromotion;
