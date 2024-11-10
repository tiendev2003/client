import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Search = () => {
  const [province, setProvince] = useState([]);
  const [district, setDistrict] = useState([]);
  const [ward, setWard] = useState([]);
  const [selectedProvince, setSelectedProvince] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedWard, setSelectedWard] = useState("");
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

  useEffect(() => {
    if (selectedDistrict) {
      const fetchWard = async () => {
        const res = await fetch(
          `https://provinces.open-api.vn/api/d/${selectedDistrict}?depth=2`
        ).then((res) => res.json());

        setWard(res.wards);
      };
      fetchWard();
    }
  }, [selectedDistrict]);

  const handleSearch = (e) => {
    e.preventDefault();
    const pro = province.find(
      (item) => item.code.toString() === selectedProvince
    )?.name ?? "";
    const dis = district.find(
      (item) => item.code.toString() === selectedDistrict
    )?.name ?? "";
    const war = ward.find((item) => item.code.toString() === selectedWard)?.name ??"";
    navigate(`/billiard?province=${pro}&district=${dis}&ward=${war}`);
  };
  return (
    <div className="search-area">
      <div className="container">
        <div className="search-wrapper">
          <div className="search-box billard-search">
            <div className="search-form">
              <form onSubmit={handleSearch}>
                <div className="billard-search-wrapper">
                  <div className="row">
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
                        <label>Phường</label>
                        <div className="form-group-icon">
                          <select
                            className="form-control"
                            name="ward"
                            onChange={(e) => setSelectedWard(e.target.value)}
                          >
                            <option value="">Chọn phường/xã</option>
                            {ward.map((item) => (
                              <option key={item.code} value={item.code}>
                                {item.name}
                              </option>
                            ))}
                          </select>
                          <i className="fa-solid fa-location-dot" />
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
