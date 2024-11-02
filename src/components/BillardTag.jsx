import { useEffect, useRef, useState } from 'react';
import Isotope from 'isotope-layout';

const BillardTag = () => {
    const [filter, setFilter] = useState('*');
    const filterBoxRef = useRef(null);
    const isotopeInstanceRef = useRef(null);

    const items = [
        { id: 1, category: 'cat1', title: 'Billard Club', address: '256 Phan Huy Ích, P.12, Q.Gò Vấp, TP.HCM', rate: 5.0, views: '2.5k Lượt xem', price: '90.000đ /Giờ', image: '../assets/img/billard/01.jpeg' },
        { id: 2, category: 'cat2', title: 'Billard 24h', address: '256 Phan Huy Ích, P.12, Q.Gò Vấp, TP.HCM', rate: 5.0, views: '2.5k Lượt xem', price: '90.000đ /Giờ', image: '../assets/img/billard/01.jpeg' },
        { id: 3, category: 'cat3', title: 'Billard VIP', address: '256 Phan Huy Ích, P.12, Q.Gò Vấp, TP.HCM', rate: 5.0, views: '2.5k Lượt xem', price: '90.000đ /Giờ', image: '../assets/img/billard/01.jpeg' },
        { id: 4, category: 'cat4', title: 'Billard yêu thích', address: '256 Phan Huy Ích, P.12, Q.Gò Vấp, TP.HCM', rate: 5.0, views: '2.5k Lượt xem', price: '90.000đ /Giờ', image: '../assets/img/billard/01.jpeg' },
    ];

    useEffect(() => {
   
        isotopeInstanceRef.current = new Isotope(filterBoxRef.current, {
            itemSelector: '.filter-item',
            masonry: {
                columnWidth: 1,
            },
        });

        return () => {
            if (isotopeInstanceRef.current) {
                isotopeInstanceRef.current.destroy();
            }
        };
    }, []);

    const handleFilterChange = (category) => {
        console.log(`Filtering by: ${category}`); 
        setFilter(category);
        if (isotopeInstanceRef.current) {
            isotopeInstanceRef.current.arrange({ filter: category });
        }
    };

    return (
        <div className="billard-area py-120">
            <div className="container">
                <div className="row">
                    <div className="col-lg-7 mx-auto">
                        <div className="site-heading text-center mb-30">
                            <span className="site-title-tagline">Billard Club</span>
                            <h2 className="site-title">none</h2>
                        </div>
                        <div className="filter-controls">
                            <ul className="filter-btns">
                                <li className={filter === '*' ? 'active' : ''} onClick={() => handleFilterChange('*')}>Tất cả</li>
                                <li className={filter === 'cat1' ? 'active' : ''} onClick={() => handleFilterChange('cat1')}>Billard gần bạn</li>
                                <li className={filter === 'cat2' ? 'active' : ''} onClick={() => handleFilterChange('cat2')}>Billard 24h</li>
                                <li className={filter === 'cat3' ? 'active' : ''} onClick={() => handleFilterChange('cat3')}>Billard VIP</li>
                                <li className={filter === 'cat4' ? 'active' : ''} onClick={() => handleFilterChange('cat4')}>Billard yêu thích</li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="row filter-box" ref={filterBoxRef}>
                    {items.map(item => (
                        <div key={item.id} className={`col-md-6 col-lg-3 filter-item ${item.category}`}>
                            <div className="billard-item">
                                <div className="billard-img">
                                    <span className="badge">Nổi bật</span>
                                    <img src={item.image} alt={item.title} />
                                    <a href="#" className="add-wishlist"><i className="far fa-heart" /></a>
                                </div>
                                <div className="billard-content">
                                    <h4 className="billard-title"><a href="#">{item.title}</a></h4>
                                    <p><i className="fa-solid fa-location-crosshairs" /> {item.address}</p>
                                    <div className="billard-rate">
                                        <span className="badge"><i className="fa fa-star" /> {item.rate}</span>
                                        <span className="billard-rate-review">({item.views})</span>
                                    </div>
                                    <div className="billard-bottom">
                                        <div className="billard-price">
                                            <span className="billard-price-amount">{item.price}</span>
                                        </div>
                                        <div className="billard-text-btn">
                                            <a href="#">Chi tiết <i className="fas fa-arrow-right" /></a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default BillardTag;
