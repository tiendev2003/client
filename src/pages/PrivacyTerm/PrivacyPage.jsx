import { Breadcrumb } from "../../components";

const PrivacyPage = () => {
  return (
    <>
      <Breadcrumb title="Chính Sách" items="Chính Sách" />

      <div className="pt-120 pb-120">
        <div className="container">
          <div className="row">
            <div className="col">
              <div className="terms-content">
                <h3>Chính Sách Bảo Mật</h3>
                <p>
                  BillardBooking cam kết bảo vệ thông tin cá nhân của bạn. Chúng
                  tôi thu thập và sử dụng thông tin theo cách minh bạch và an
                  toàn, để bạn có thể yên tâm khi sử dụng dịch vụ của chúng tôi.
                </p>
              </div>
              <div className="terms-content">
                <h3>Thông Tin Thu Thập</h3>
                <p>
                  Chúng tôi thu thập thông tin cá nhân cần thiết để cung cấp
                  dịch vụ tốt nhất cho bạn, bao gồm tên, địa chỉ email, số điện
                  thoại và thông tin thanh toán. Chúng tôi cũng có thể thu thập
                  thông tin về hành vi sử dụng của bạn trên trang web.
                </p>
              </div>
              <div className="terms-content">
                <h3>Chế Độ Sử Dụng Thông Tin</h3>
                <p>
                  Thông tin cá nhân của bạn sẽ được sử dụng để xử lý đặt chỗ,
                  gửi thông báo và cập nhật về dịch vụ của chúng tôi. Chúng tôi
                  cũng có thể sử dụng thông tin này để cải thiện trải nghiệm của
                  bạn trên BillardBooking.
                </p>
                <p>
                  Chúng tôi không bán, cho thuê hoặc chia sẻ thông tin cá nhân
                  của bạn với bên thứ ba mà không có sự đồng ý của bạn.
                </p>
              </div>
              <div className="terms-content">
                <h3>Bảo Mật Dữ Liệu Người Dùng</h3>
                <p>Chúng tôi cam kết bảo vệ dữ liệu người dùng bằng cách:</p>
                <ul className="terms-list ms-4">
                  <li>
                    1. Sử dụng công nghệ mã hóa để bảo vệ thông tin nhạy cảm.
                  </li>
                  <li>
                    2. Giới hạn quyền truy cập vào thông tin cá nhân của bạn.
                  </li>
                  <li>
                    3. Đào tạo nhân viên về chính sách bảo mật và an ninh thông
                    tin.
                  </li>
                  <li>
                    4. Thực hiện kiểm tra định kỳ để đảm bảo tính an toàn của dữ
                    liệu.
                  </li>
                </ul>
              </div>
              <div className="terms-content">
                <h3>Bản Quyền và Bảo Mật</h3>
                <p>
                  Tất cả nội dung trên BillardBooking đều thuộc bản quyền của
                  chúng tôi. Bạn không được sao chép hoặc sử dụng nội dung mà
                  không có sự cho phép. Chúng tôi sẽ thực hiện các biện pháp cần
                  thiết để bảo vệ bản quyền và quyền lợi hợp pháp của mình.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PrivacyPage;
