
const Search = () => {
    return (
        <div className="search-area">
            <div className="container">
                <div className="search-wrapper">
                    <div className="search-box billard-search">
                        <div className="search-form">
                            <form action="#">
                                <div className="billard-search-wrapper">
                                    <div className="row">
                                        <div className="col-lg-4">
                                            <div className="form-group">
                                                <label>Quận</label>
                                                <div className="form-group-icon">
                                                    <input type="text" name="destination" className="form-control" placeholder="Nhập địa chỉ" />
                                                    <i className="fa-solid fa-location-crosshairs" />
                                                </div>
                                                <p>TP.Hồ Chí Minh</p>
                                            </div>
                                        </div>
                                        <div className="col-lg-4">
                                            <div className="form-group">
                                                <label>Tỉnh &amp; Thành phố</label>
                                                <div className="form-group-icon">
                                                    <input type="text" name="destination" className="form-control" defaultValue="Hồ Chí Minh" disabled />
                                                    <i className="fa-solid fa-map-location-dot" />
                                                </div>
                                                <p>Việt Nam</p>
                                            </div>
                                        </div>
                                        <div className="col-lg-4">
                                            <div className="form-group dropdown passenger-box">
                                                <div className="passenger-class" role="menu" data-bs-toggle="dropdown" aria-expanded="false">
                                                    <label>Loại bàn</label>
                                                    <div className="form-group-icon">
                                                        <div className="passenger-total">
                                                            <span className="passenger-class-name">Nhấn chọn</span>
                                                        </div>
                                                        <i className="fa fa-shapes" />
                                                    </div>
                                                    <p>Billard</p>
                                                </div>
                                                <div className="dropdown-menu dropdown-menu-end">
                                                    {/* <div class="dropdown-item">
                                                  <div class="passenger-item">
                                                      <div class="passenger-info">
                                                          <h6>Số lượng</h6>
                                                      </div>
                                                      <div class="passenger-qty">
                                                          <button type="button" class="minus-btn"><i
                                                                  class="fa fa-minus"></i></button>
                                                          <input type="text" name="table"
                                                              class="qty-amount passenger-table" value="2"
                                                              readonly>
                                                          <button type="button" class="plus-btn"><i
                                                                  class="fa fa-plus"></i></button>
                                                      </div>
                                                  </div>
                                              </div> */}
                                                    <div className="dropdown-item">
                                                        <h6 className="mb-3 mt-2">Loại bàn</h6>
                                                        <div className="passenger-class-info">
                                                            <div className="form-check">
                                                                <input className="form-check-input" type="radio" defaultValue="Table Pool" name="table-type" id="table-type1" />
                                                                <label className="form-check-label" htmlFor="table-type1">
                                                                    Table Pool
                                                                </label>
                                                            </div>
                                                            <div className="form-check">
                                                                <input className="form-check-input" defaultChecked type="radio" defaultValue="Bàn bi-a snooker" name="table-type" id="table-type2" />
                                                                <label className="form-check-label" htmlFor="table-type2">
                                                                    Bàn bi-a snooker
                                                                </label>
                                                            </div>
                                                            <div className="form-check">
                                                                <input className="form-check-input" type="radio" defaultValue="Pocket billiards" name="table-type" id="table-type3" />
                                                                <label className="form-check-label" htmlFor="table-type3">
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
                                        <button type="submit" className="theme-btn"><span className="fa fa-magnifying-glass" />
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

    )
}

export default Search
