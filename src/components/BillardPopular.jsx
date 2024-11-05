import "@slick/slick-theme.css";
import "@slick/slick.css";
import "animate.css/animate.min.css";
import Slider from "react-slick";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchCuahangs } from "./../features/shop/shopSlice";
import { formatMoney } from './../utils/formatMoney';
import { Link } from 'react-router-dom';
const BillardPopular = () => {
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
          slidesToShow: 4,
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

  const { cuahangs, loading, error } = useSelector((state) => state.shop);

  useEffect(() => {
    dispatch(fetchCuahangs());
  }, [dispatch]);

  const billardItems = cuahangs.filter((item) => item.badge === "Nổi bật");
  return (
    <div className="billard-area bg pt-60">
      <div className="container">
        <div className="row">
          <div className="col-lg-6 mx-auto animated animate__fadeIn">
            <div className="site-heading text-center">
              <div>
                <span className="site-title-tagline">Billard Club</span>
                <h2 className="site-title">Billard Club phổ biến</h2>
              </div>
            </div>
          </div>
        </div>
        <Slider {...settings} className="billard-slider">
          {billardItems.map((item) => (
            <div key={item.id} className="billard-item mr-2">
              <div className="billard-img">
                <span className="badge">{item.discount}</span>
                <img src={item.AnhDaiDien_CuaHang} alt={item.TenCuaHang} />
                
              </div>
              <div className="billard-content">
                <h4 className="billard-title">
                  <a href="#">{item.TenCuaHang}</a>
                </h4>
                <p>
                  <i className="fa-solid fa-location-crosshairs" />{" "}
                  {item.DiaChi}
                </p>
                <div className="billard-rate">
                  <span className="badge">
                    <i className="fa fa-star" /> {item.DanhGiaTong}
                  </span>
                </div>
                <div className="billard-bottom">
                  <div className="billard-price">
                    <span className="billard-price-amount">
                      {formatMoney(item.minGiaBan)} 
                      <span className="billard-price-type">/Giờ</span>
                    </span>
                  </div>
                  <div className="billard-text-btn">
                    <Link to={`/billiard/${item.id}`}>
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

export default BillardPopular;
