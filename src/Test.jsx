import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
if (pdfFonts && pdfFonts.pdfMake && pdfFonts.pdfMake.vfs) {
  pdfMake.vfs = pdfFonts.pdfMake.vfs;
} else {
  console.error(
    "Failed to load pdfFonts. Check the import paths or version compatibility."
  );
}
// Đảm bảo rằng pdfMake có font

const RestaurantMenu = () => {
  const generatePDF = () => {
     const docDefinition = {
      content: [
        {
          text: "Quán Ăn Ngon Miệng",
          style: "header",
          alignment: "center",
        },
        {
          text: "Chào mừng bạn đến với Quán Ăn Ngon Miệng. Chúng tôi luôn mang đến những món ăn ngon và chất lượng.",
          style: "introText",
          alignment: "center",
        },
        {
          text: "Thực Đơn Của Quán",
          style: "menuHeader",
          margin: [0, 30],
        },
        {
          style: "tableExample",
          table: {
            widths: ["*", "auto"],
            body: [
              ["Món", "Giá"],
              ["Phở Bò", "50.000 VNĐ"],
              ["Bánh Mì Thịt", "20.000 VNĐ"],
              ["Cơm Gà Xối Mỡ", "45.000 VNĐ"],
              ["Bánh Canh Cua", "40.000 VNĐ"],
              ["Gỏi Cuốn", "30.000 VNĐ"],
            ],
          },
        },
        {
          text: "Các Món Ăn Đặc Biệt",
          style: "specialMenuHeader",
          margin: [0, 20],
        },
        {
          style: "tableExample",
          table: {
            widths: ["*", "auto"],
            body: [
              ["Món", "Giá"],
              ["Lẩu Hải Sản", "150.000 VNĐ"],
              ["Sushi Tươi", "200.000 VNĐ"],
              ["Sườn Nướng Mật Ong", "120.000 VNĐ"],
              ["Bò Tơ Nướng", "180.000 VNĐ"],
            ],
          },
        },
        {
          image: "data:image/jpeg;base64,...", // Hình ảnh quán hoặc món ăn (dữ liệu base64)
          width: 200,
          height: 150,
          alignment: "center",
          margin: [0, 20],
        },
        {
          text: "Cảm ơn bạn đã chọn Quán Ăn Ngon Miệng! Chúc bạn có một bữa ăn ngon miệng!",
          style: "footerText",
          alignment: "center",
          margin: [0, 20],
        },
      ],
      styles: {
        header: {
          fontSize: 26,
          bold: true,
          color: "#FF5733",
          letterSpacing: 2,
          decoration: "underline",
        },
        introText: {
          fontSize: 16,
          color: "#555",
          italics: true,
          margin: [0, 5],
        },
        menuHeader: {
          fontSize: 20,
          bold: true,
          color: "#333",
          margin: [0, 10],
        },
        specialMenuHeader: {
          fontSize: 18,
          bold: true,
          color: "#4CAF50",
          margin: [0, 10],
        },
        tableExample: {
          margin: [0, 5, 0, 15],
          fontSize: 14,
          alignment: "center",
          headerRows: 1,
          widths: ["*", "auto"],
        },
        footerText: {
          fontSize: 14,
          color: "#888",
          margin: [0, 20],
        },
      },
    };

    // Tạo PDF
    pdfMake.createPdf(docDefinition).open();
  };

  return (
    <div>
      <h1>Ứng Dụng Tạo PDF cho Quán Ăn</h1>
      <button onClick={generatePDF}>Tạo Thực Đơn PDF</button>
    </div>
  );
};

export default RestaurantMenu;
