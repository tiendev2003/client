import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Search = () => {
  const [province, setProvince] = useState([]);
  const [district, setDistrict] = useState([]);
  const [selectedProvince, setSelectedProvince] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProvince = async () => {
      const res = await fetch(
        "https://provinces.open-api.vn/api/?depth=2"
      ).then((res) => res.json());

      setProvince(res);
    };
    fetchProvince();
  }, []);

  useEffect(() => {
    if (selectedProvince) {
      const fetchDistrict = async () => {
        console.log(selectedProvince);
        const res = await fetch(
          `https://provinces.open-api.vn/api/p/${selectedProvince}?depth=2`
        ).then((res) => res.json());

        setDistrict(res.districts);
      };
      fetchDistrict();
    }
  }, [selectedProvince]);
  const handleSearch = (e) => {
    e.preventDefault();
    const pro = province.find((item) => item.code.toString() === selectedProvince).name;
    const dis =  district.find((item) => item.code.toString() === selectedDistrict).name;
    navigate(`/billiard?province=${pro}&district=${dis}`);
  };
  return (
    <div className="search-area">
      <div className="container">
        <div className="search-wrapper">
          <div className="search-box billard-search">
            <div className="search-form">
              <form  onSubmit={handleSearch}>
                <div className="billard-search-wrapper">
                  <div className="row">
                    <div className="col-lg-4">
                      <div className="form-group">
                        <label>Quận</label>
                        <div className="form-group-icon">
                          <select
                            className="form-control"
                            name="district"
                            onChange={(e) =>
                              setSelectedDistrict(e.target.value)
                            }
                          >
                            <option value="">Chọn quận/huyện</option>
                            {district.map((item) => (
                              <option key={item.code} value={item.code}>
                                {item.name}
                              </option>
                            ))}
                          </select>
                          <i className="fa-solid fa-location-crosshairs" />
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-4">
                      <div className="form-group">
                        <label>Tỉnh &amp; Thành phố</label>
                        <div className="form-group-icon">
                          <select
                            className="form-control"
                            name="province"
                            onChange={(e) =>
                              setSelectedProvince(e.target.value)
                            }
                          >
                            <option value="">Chọn tỉnh/thành phố</option>
                            {province.map((item) => (
                              <option key={item.code} value={item.code}>
                                {item.name}
                              </option>
                            ))}
                          </select>

                          <i className="fa-solid fa-map-location-dot" />
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-4">
                      <div className="form-group dropdown passenger-box">
                        <div
                          className="passenger-class"
                          role="menu"
                          data-bs-toggle="dropdown"
                          aria-expanded="false"
                        >
                          <label>Loại bàn</label>
                          <div className="form-group-icon">
                            <div className="passenger-total">
                              <span className="passenger-class-name">
                                Nhấn chọn
                              </span>
                            </div>
                            <i className="fa fa-shapes" />
                          </div>
                        </div>
                        <div className="dropdown-menu dropdown-menu-end">
                          <div className="dropdown-item">
                            <h6 className="mb-3 mt-2">Loại bàn</h6>
                            <div className="passenger-class-info">
                              <div className="form-check">
                                <input
                                  className="form-check-input"
                                  type="radio"
                                  defaultValue="Table Pool"
                                  name="table-type"
                                  id="table-type1"
                                />
                                <label
                                  className="form-check-label"
                                  htmlFor="table-type1"
                                >
                                  Table Pool
                                </label>
                              </div>
                              <div className="form-check">
                                <input
                                  className="form-check-input"
                                  defaultChecked
                                  type="radio"
                                  defaultValue="Bàn bi-a snooker"
                                  name="table-type"
                                  id="table-type2"
                                />
                                <label
                                  className="form-check-label"
                                  htmlFor="table-type2"
                                >
                                  Bàn bi-a snooker
                                </label>
                              </div>
                              <div className="form-check">
                                <input
                                  className="form-check-input"
                                  type="radio"
                                  defaultValue="Pocket billiards"
                                  name="table-type"
                                  id="table-type3"
                                />
                                <label
                                  className="form-check-label"
                                  htmlFor="table-type3"
                                >
                                  Pocket billiards
                                </label>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="search-btn">
                    <button type="submit" className="theme-btn">
                      <span className="fa fa-magnifying-glass" />
                      Tìm ngay
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search;
