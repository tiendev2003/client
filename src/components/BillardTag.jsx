import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchCuahangs } from "../features/shop/shopSlice";
import { formatMoney } from "../utils/formatMoney";

const BillardTag = () => {
  const [filter, setFilter] = useState("*");

  const dispatch = useDispatch();

  const { cuahangs } = useSelector((state) => state.shop);

  useEffect(() => {
    dispatch(fetchCuahangs());
  }, [dispatch]);

  const handleFilterChange = (category) => {
    console.log(`Filtering by: ${category}`);
    setFilter(category);
  };
  const filterdData = cuahangs.filter((cuahang) => {
    if (filter === "*") {
      return true;
    } else {
      return cuahang.badge === filter;
    }
  });

  return (
    <>
      <div className="banner-area py-120">
        <div className="container">
          <div className="row">
            <div className="col-lg-6">
              <div
                className="banner-item wow fadeInUp animated"
                data-wow-duration="1s"
                data-wow-delay=".25s"
                style={{
                  visibility: "visible",
                  animationDuration: "1s",
                  animationDelay: "0.25s",
                }}
              >
                <div className="banner-img">
                  <img src="/img/billard/01.jpeg" alt="" />
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
                    Xem thêm<i className="fa fa-arrow-right"></i>
                  </a>
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div
                className="banner-item wow fadeInUp animated"
                data-wow-duration="1s"
                data-wow-delay=".50s"
                style={{
                  visibility: "visible",
                  animationDuration: "1s",
                  animationDelay: "0.5s",
                }}
              >
                <div className="banner-img">
                  <img src="/img/billard/01.jpeg" alt="" />
                </div>
                <div className="banner-content">
                  <h3>
                    Chào mừng khai trương<span> ưu đãi 70%!</span>
                  </h3>
                  <p>
                    Đặt lịch ngay hôm nay để nhận voucher ưu đãi lên đến 70%.
                    Đừng bỏ lỡ cơ hội tận hưởng những giây phút thư giãn tuyệt
                    vời cùng chúng tôi!
                  </p>
                  <a href="#" className="theme-btn">
                    Xem thêm<i className="fa fa-arrow-right"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        className="billard-area py-120 "
        style={{
          minHeight: "100vh",
        }}
      >
        {" "}
        <div className="row">
          <div className="col-lg-7 mx-auto">
            <div className="site-heading text-center mb-30">
              <span className="site-title-tagline">Billard Club</span>
              <h2 className="site-title">none</h2>
            </div>
            <div className="filter-controls">
              <ul className="filter-btns">
                <li
                  className={filter === "*" ? "active" : ""}
                  onClick={() => handleFilterChange("*")}
                >
                  Tất cả
                </li>
                <li
                  className={filter === "Quán mới" ? "active" : ""}
                  onClick={() => handleFilterChange("Quán mới")}
                >
                  Quán mới
                </li>
                <li
                  className={filter === "Đang khuyến mãi" ? "active" : ""}
                  onClick={() => handleFilterChange("Đang khuyến mãi")}
                >
                  Đang khuyến mãi
                </li>
                <li
                  className={filter === "Nổi bật" ? "active" : ""}
                  onClick={() => handleFilterChange("Nổi bật")}
                >
                  Nổi bật
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="container">
          <div className="row filter-box"  >
            {filterdData.map((cuahang) => (
              <div
                key={cuahang.id}
                className={`col-md-6 col-lg-3 filter-item ${cuahang.badge}`}
              >
                <div className="billard-item">
                  <div className="billard-img">
                    <span className="badge badge-discount">
                      {cuahang.badge}
                    </span>
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
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default BillardTag;
