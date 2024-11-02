import { Breadcrumb } from "../../components";

const TermsPage = () => {
  return (
    <>
      <Breadcrumb title="Điều Khoản Dịch Vụ" items="Điều Khoản Dịch Vụ" />

      <div className="py-120">
        <div className="container">
          <div className="row">
            <div className="col">
              <div className="terms-content">
                <h3>Hiệu Suất của Chúng Tôi</h3>
                <p>
                  BillardBooking cam kết cung cấp trải nghiệm đặt bàn chơi bi-a
                  tốt nhất cho người dùng. Chúng tôi tập trung vào việc tối ưu
                  hóa giao diện và hiệu suất để người dùng có thể dễ dàng tìm
                  kiếm và đặt bàn tại các địa điểm yêu thích.
                </p>
              </div>
              <div className="terms-content">
                <h3>Cookie</h3>
                <p>
                  Chúng tôi sử dụng cookie để cải thiện trải nghiệm người dùng
                  trên BillardBooking. Cookie giúp chúng tôi nhận diện người
                  dùng và cung cấp nội dung phù hợp hơn. Bạn có thể quản lý
                  cookie thông qua cài đặt trình duyệt của mình.
                </p>
              </div>
              <div className="terms-content">
                <h3>Thanh Toán</h3>
                <p>
                  BillardBooking chấp nhận nhiều phương thức thanh toán khác
                  nhau để đảm bảo sự thuận tiện cho người dùng. Chúng tôi bảo vệ
                  thông tin thanh toán của bạn bằng các biện pháp an ninh hiện
                  đại nhất.
                </p>
              </div>
              <div className="terms-content">
                <h3>Chính Sách Hoàn Tiền</h3>
                <p>
                  Chúng tôi hiểu rằng có thể xảy ra những tình huống không mong
                  muốn. Nếu bạn cần hoàn tiền cho một đặt chỗ, vui lòng liên hệ
                  với chúng tôi trong vòng 24 giờ sau khi đặt để được hỗ trợ.
                </p>
              </div>
              <div className="terms-content">
                <h3>Liên Kết Đến Nội Dung của Chúng Tôi</h3>
                <p>
                  Chúng tôi hoan nghênh việc bạn liên kết đến nội dung của
                  BillardBooking:
                </p>
                <ul className="terms-list ms-4">
                  <li>1. Liên kết trực tiếp đến trang chủ của chúng tôi.</li>
                  <li>
                    2. Đảm bảo nội dung liên kết không gây hiểu lầm về dịch vụ
                    của chúng tôi.
                  </li>
                  <li>
                    3. Không sao chép nội dung mà không có sự cho phép của chúng
                    tôi.
                  </li>
                </ul>
              </div>
              <div className="terms-content">
                <h3>Miễn Trừ Trách Nhiệm</h3>
                <p>
                  BillardBooking không chịu trách nhiệm cho bất kỳ tổn thất nào
                  phát sinh từ việc sử dụng dịch vụ của chúng tôi. Chúng tôi
                  luôn cố gắng cung cấp thông tin chính xác và kịp thời, nhưng
                  không thể đảm bảo mọi thông tin đều hoàn hảo.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TermsPage;
