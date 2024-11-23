import "jspdf-autotable";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { getCTKMs } from "../../features/ctkm/ctkmSlice";
import { fetchHoadonId } from "../../features/hoadon/hoadonSlice";
import { exportBill } from "../../features/orders/orderSlice";
import { formatMoney } from "../../utils/formatMoney";

if (pdfFonts && pdfFonts.pdfMake && pdfFonts.pdfMake.vfs) {
  pdfMake.vfs = pdfFonts.pdfMake.vfs;
} else {
  console.error(
    "Failed to load pdfFonts. Check the import paths or version compatibility."
  );
}
export const DetailPaymentInvoices = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { hoadons } = useSelector((state) => state.hoadon);
  const { ctkms } = useSelector((state) => state.ctkm);
  const [selectedCTKM, setSelectedCTKM] = useState(null);
  const { userInfo } = useSelector((state) => state.auth);
  useEffect(() => {
    dispatch(fetchHoadonId(id));
  }, [dispatch, id]);

  useEffect(() => {
    dispatch(getCTKMs());
  }, [dispatch]);
  const exportToPDF = (data) => {
  
    const { hoaDon } = data;
  
    // Thông tin cửa hàng
    const storeName = userInfo.cuahang.TenCuaHang || "Không có";
    const storePhone = userInfo.cuahang?.SDT || "Không có";
    const storeAddress = userInfo.cuahang?.DiaChi || "Không có";
  
    // Thông tin khách hàng
    const customerName = hoaDon.taikhoan?.TenTaiKhoan || "Không có";
    const customerPhone = hoaDon.taikhoan?.SDT || "Không có";
  
    // Danh sách chi tiết hóa đơn
    const invoiceDetails = hoaDon.hoadonct.map((item, index) => {
      const productName = item.sanpham?.TenSanPham || item.ban?.TenBan || "Không có";
      const unitPrice = item.sanpham?.Gia || item.ban?.GiaBan || 0;
      const quantity = item.SoLuong < 1 ? 1 : item.SoLuong;
      const isLongDecimal = (value) => {
        const decimalPart = value.toString().split(".")[1]; // Lấy phần thập phân
        return decimalPart && decimalPart.length > 2; // Kiểm tra số chữ số thập phân > 2
      };
      const totalPrice =isLongDecimal(item.Tong)  ?item.ban?.GiaBan  : item.Tong || 0;
  
      return [
        index + 1,
        productName,
        unitPrice  + " đ",
        quantity,
        totalPrice  + " đ",
      ];
    });
  
    // Tạo PDF
    const docDefinition = {
      content: [
        { text: storeName, style: "header", alignment: "center" },
        { text: `${storeAddress}\n${storePhone}`, alignment: "center" },
        { text: "PHIẾU THANH TOÁN", style: "subheader", alignment: "center", margin: [0, 10, 0, 10] },
        { text: `Khách hàng: ${customerName} - ${customerPhone}`, margin: [0, 10, 0, 10] },
        { text: `Thời gian xuất hóa đơn: ${new Date(hoaDon.ThoiGianXuatHD) }` },
  
        {
          table: {
            headerRows: 1,
            widths: [30, "*", 50, 30, 60],
            body: [
              ["Stt", "Tên món", "Đơn giá", "SL", "Thành tiền"],
              ...invoiceDetails,
            ],
          },
          layout: "lightHorizontalLines",
          margin: [0, 10, 0, 10],
        },
  
        {
          columns: [
            { text: "Tổng hóa đơn gốc:", bold: true },
            { text: `${data.originalTongHD } đ`, alignment: "right" },
          ],
        },
        {
          columns: [
            { text: "Tổng sau giảm giá:", bold: true },
            { text: `${data.TongHD_after_discount } đ`, alignment: "right" },
          ],
        },
        {
          columns: [
            { text: "Số giờ chơi:", bold: true },
            { text: hoaDon.SoGioChoi, alignment: "right" },
          ],
        },
  
        { text: "\nChân thành cảm ơn quý khách!", alignment: "center", margin: [0, 20, 0, 0] },
      ],
      styles: {
        header: { fontSize: 18, bold: true },
        subheader: { fontSize: 14, bold: true },
      },
    };
    pdfMake.createPdf(docDefinition).download(`HoaDon_${1}.pdf`);

     
  };
  
  const handleSubmit = async () => {
    try {
      console.log(hoadons.chi_tiet_ban[0].id_ban);
      console.log("Selected CTKM:", selectedCTKM);
      const result = await dispatch(
        exportBill({
          id: hoadons.chi_tiet_ban[0].id_ban,
          id_PGG: selectedCTKM ?? "",
        })
      ).unwrap();
       exportToPDF(result);
      toast.success("Xuất hóa đơn thành công");
    } catch (error) {
      toast.error("Xuất hóa đơn thất bại");
      console.log(error);
    }
  };

  console.log(hoadons);

  return (
    <div className="user-profile-card user-profile-listing mt-4 min-vh-100">
      <div className="row">
        <div className="col-lg-8">
          <div className="add-listing-form p-4 border rounded shadow-sm">
            <h4 className="mb-4">Chi tiết hóa đơn</h4>
            <div className="selected-products-list mt-2">
              {hoadons && hoadons?.chi_tiet_san_pham ? (
                <table className="table table-bordered table-responsive">
                  <thead className="thead-dark">
                    <tr>
                      <th>STT</th>
                      <th>Tên Sản Phẩm</th>
                      <th>Giá</th>
                      <th>Số Lượng</th>
                      <th>Thành Tiền</th>
                    </tr>
                  </thead>
                  <tbody>
                    {hoadons.chi_tiet_ban.map((chi_tiet, index) => (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{chi_tiet.ten_ban}</td>
                        <td>{formatMoney(chi_tiet.gia_ban)}</td>
                        <td>{1}</td>
                        <td>{formatMoney(chi_tiet.gia_ban)}</td>
                      </tr>
                    ))}
                    {Object.values(hoadons.chi_tiet_san_pham).map(
                      (invoice, index) => (
                        <tr key={invoice.id}>
                          <td>{index + 1}</td>
                          <td>{invoice.ten_san_pham}</td>
                          <td>{formatMoney(invoice.gia)}</td>
                          <td>{invoice.so_luong}</td>
                          <td>{formatMoney(invoice.tong)}</td>
                        </tr>
                      )
                    )}
                  </tbody>
                </table>
              ) : (
                <p>Không có sản phẩm nào trong hóa đơn</p>
              )}
            </div>
          </div>
        </div>
        <div className="col-lg-4">
          <div className="add-listing-form p-4 border rounded shadow-sm">
            <h5 className="mb-2">Thông Tin Bàn</h5>
            <div className="store-info ">
              {hoadons &&
                hoadons?.chi_tiet_ban?.map((invoice) => (
                  <div key={invoice.id} className="invoice-item mb-3">
                    <div>
                      <p>
                        <strong>Tên bàn:</strong> {invoice.ten_ban}
                      </p>
                    </div>
                  </div>
                ))}
            </div>
            <div>
              <h5 className="mb-2">Thông Tin Hóa Đơn</h5>
              <div className="invoice-info ">
                <div>
                  <p>
                    <strong>Số giờ chơi:</strong>{" "}
                    {hoadons &&
                      hoadons.chi_tiet_ban &&
                      hoadons.chi_tiet_ban[0].so_gio_choi}
                  </p>
                </div>
                <div>
                  <p>
                    <strong>Ngày tạo:</strong> {hoadons.thoi_gian_bat_dau}
                  </p>
                </div>
                <div>
                  <p>
                    <strong>Ngày thanh toán:</strong>{" "}
                    {hoadons.thoi_gian_ket_thuc}
                  </p>
                </div>
              </div>
            </div>
            <div className="discount-code mt-3 mb-1">
              <label htmlFor="ctkmSelect">Chọn Mã Giảm Giá:</label>
              <div className="input-group">
                <select
                  id="ctkmSelect"
                  className="form-control border px-3"
                  value={selectedCTKM}
                  onChange={(e) => setSelectedCTKM(e.target.value)}
                >
                  <option value="">Chọn mã giảm giá</option>
                  {ctkms.map((ctkm) => (
                    <option key={ctkm.id} value={ctkm.id}>
                      {ctkm.Ten_PGG}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="total-amount mt-4">
              <h5>Tổng Tiền: {formatMoney(hoadons.tong_hoa_don)}</h5>
              <h5>Giảm Giá: {formatMoney(hoadons.so_tien_giam_gia)}</h5>
              <h5>
                Thành Tiền:{" "}
                {formatMoney(hoadons.tong_hoa_don - hoadons.so_tien_giam_gia)}
              </h5>
            </div>
            <div className="form-group mt-4">
              <button className="btn btn-primary w-100" onClick={handleSubmit}>
                Xuất hóa đơn
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
