import '@slick/slick-theme.css';
import '@slick/slick.css';
import 'animate.css/animate.min.css';
import Slider from 'react-slick';
const BillardPopular = () => {
    const settings = {
        infinite: true,
        speed: 500,
        slidesToShow: 4,
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

    const billardItems = [
        // Dữ liệu các mục billiard
        {
            id: 1,
            imgSrc: 'https://alltop.vn/backend/media/images/posts/1813/Paradise_Billiards_Club-99073.jpg',
            title: 'Billard Club',
            address: '256 Phan Huy Ích, P.12, Q.Gò Vấp, TP.HCM',
            rating: '5.0',
            reviews: '(2.5k Reviews)',
            price: '90.000đ',
            discount: 'Phổ biến',
        },
        {
            id: 1,
            imgSrc: 'https://alltop.vn/backend/media/images/posts/1813/Paradise_Billiards_Club-99073.jpg',
            title: 'Billard Club',
            address: '256 Phan Huy Ích, P.12, Q.Gò Vấp, TP.HCM',
            rating: '5.0',
            reviews: '(2.5k Reviews)',
            price: '90.000đ',
            discount: 'Phổ biến',
        },
        {
            id: 3,
            imgSrc: 'https://alltop.vn/backend/media/images/posts/1813/Paradise_Billiards_Club-99073.jpg',
            title: 'Billard Club',
            address: '256 Phan Huy Ích, P.12, Q.Gò Vấp, TP.HCM',
            rating: '5.0',
            reviews: '(2.5k Reviews)',
            price: '90.000đ',
            discount: 'Phổ biến',
        },
        {
            id: 4,
            imgSrc: 'https://alltop.vn/backend/media/images/posts/1813/Paradise_Billiards_Club-99073.jpg',
            title: 'Billard Club',
            address: '256 Phan Huy Ích, P.12, Q.Gò Vấp, TP.HCM',
            rating: '5.0',
            reviews: '(2.5k Reviews)',
            price: '90.000đ',
            discount: 'Phổ biến',
        },
        {
            id: 5,
            imgSrc: 'https://alltop.vn/backend/media/images/posts/1813/Paradise_Billiards_Club-99073.jpg',
            title: 'Billard Club',
            address: '256 Phan Huy Ích, P.12, Q.Gò Vấp, TP.HCM',
            rating: '5.0',
            reviews: '(2.5k Reviews)',
            price: '90.000đ',
            discount: 'Phổ biến',
        },
        {
            id: 6,
            imgSrc: 'https://alltop.vn/backend/media/images/posts/1813/Paradise_Billiards_Club-99073.jpg',
            title: 'Billard Club',
            address: '256 Phan Huy Ích, P.12, Q.Gò Vấp, TP.HCM',
            rating: '5.0',
            reviews: '(2.5k Reviews)',
            price: '90.000đ',
            discount: 'Phổ biến',
        },
        {
            id: 7,
            imgSrc: 'https://alltop.vn/backend/media/images/posts/1813/Paradise_Billiards_Club-99073.jpg',
            title: 'Billard Club',
            address: '256 Phan Huy Ích, P.12, Q.Gò Vấp, TP.HCM',
            rating: '5.0',
            reviews: '(2.5k Reviews)',
            price: '90.000đ',
            discount: 'Phổ biến',
        },
        {
            id: 8,
            imgSrc: 'https://alltop.vn/backend/media/images/posts/1813/Paradise_Billiards_Club-99073.jpg',
            title: 'Billard Club',
            address: '256 Phan Huy Ích, P.12, Q.Gò Vấp, TP.HCM',
            rating: '5.0',
            reviews: '(2.5k Reviews)',
            price: '90.000đ',
            discount: 'Phổ biến',
        },
        // Thêm các mục khác tương tự...
    ];

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
                    {billardItems.map(item => (
                        <div key={item.id} className="billard-item">
                            <div className="billard-img">
                                <span className="badge">{item.discount}</span>
                                <img src={item.imgSrc} alt={item.title} />
                                <a href="#" className="add-wishlist"><i className="far fa-heart" /></a>
                            </div>
                            <div className="billard-content">
                                <h4 className="billard-title"><a href="#">{item.title}</a></h4>
                                <p><i className="fa-solid fa-location-crosshairs" /> {item.address}</p>
                                <div className="billard-rate">
                                    <span className="badge"><i className="fa fa-star" /> {item.rating}</span>
                                    <span className="billard-rate-review">{item.reviews}</span>
                                </div>
                                <div className="billard-bottom">
                                    <div className="billard-price">
                                        <span className="billard-price-amount">{item.price} <span className="billard-price-type">/Giờ</span></span>
                                    </div>
                                    <div className="billard-text-btn">
                                        <a href="#">Chi tiết <i className="fas fa-arrow-right" /></a>
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
