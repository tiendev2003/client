import { Breadcrumb } from "../../components";

const FaqPage = () => {
  return (
    <>
      <Breadcrumb
        title="Câu Hỏi Thường Gặp (FAQ)"
        items="Câu Hỏi Thường Gặp (FAQ)"
      />

      <div className="faq-area py-120">
        <div className="container">
          <div className="accordion" id="accordionExample">
            <div className="row">
              <div className="col-lg-6">
                <div className="accordion-item">
                  <h2 className="accordion-header" id="heading1">
                    <button
                      className="accordion-button"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapse1"
                      aria-expanded="true"
                      aria-controls="collapse1"
                    >
                      <span>
                        <i className="far fa-question"></i>
                      </span>{" "}
                      Dịch vụ của bạn có phí như thế nào?
                    </button>
                  </h2>
                  <div
                    id="collapse1"
                    className="accordion-collapse collapse show"
                    aria-labelledby="heading1"
                    data-bs-parent="#accordionExample"
                  >
                    <div className="accordion-body">
                      Chúng tôi cung cấp nhiều gói dịch vụ khác nhau với mức phí
                      linh hoạt. Bạn có thể kiểm tra chi tiết về các gói dịch vụ
                      và mức phí trên trang &quot;Gói Dịch Vụ&quot; của chúng
                      tôi.
                    </div>
                  </div>
                </div>
                <div className="accordion-item">
                  <h2 className="accordion-header" id="heading2">
                    <button
                      className="accordion-button collapsed"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapse2"
                      aria-expanded="false"
                      aria-controls="collapse2"
                    >
                      <span>
                        <i className="far fa-question"></i>
                      </span>{" "}
                      Làm thế nào để trở thành thành viên?
                    </button>
                  </h2>
                  <div
                    id="collapse2"
                    className="accordion-collapse collapse"
                    aria-labelledby="heading2"
                    data-bs-parent="#accordionExample"
                  >
                    <div className="accordion-body">
                      Bạn có thể trở thành thành viên bằng cách đăng ký trực
                      tuyến trên trang web của chúng tôi. Chỉ cần điền thông tin
                      cần thiết và làm theo hướng dẫn để hoàn tất quá trình đăng
                      ký.
                    </div>
                  </div>
                </div>
                <div className="accordion-item">
                  <h2 className="accordion-header" id="heading3">
                    <button
                      className="accordion-button collapsed"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapse3"
                      aria-expanded="false"
                      aria-controls="collapse3"
                    >
                      <span>
                        <i className="far fa-question"></i>
                      </span>{" "}
                      Tôi có thể nâng cấp gói dịch vụ bất kỳ lúc nào không?
                    </button>
                  </h2>
                  <div
                    id="collapse3"
                    className="accordion-collapse collapse"
                    aria-labelledby="heading3"
                    data-bs-parent="#accordionExample"
                  >
                    <div className="accordion-body">
                      Có, bạn có thể nâng cấp gói dịch vụ của mình bất kỳ lúc
                      nào. Để nâng cấp, hãy đăng nhập vào tài khoản của bạn và
                      chọn tùy chọn nâng cấp.
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-6">
                <div className="accordion-item">
                  <h2 className="accordion-header" id="heading4">
                    <button
                      className="accordion-button collapsed"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapse4"
                      aria-expanded="false"
                      aria-controls="collapse4"
                    >
                      <span>
                        <i className="far fa-question"></i>
                      </span>{" "}
                      Bạn hỗ trợ các cổng thanh toán nào?
                    </button>
                  </h2>
                  <div
                    id="collapse4"
                    className="accordion-collapse collapse"
                    aria-labelledby="heading4"
                    data-bs-parent="#accordionExample"
                  >
                    <div className="accordion-body">
                      Chúng tôi hỗ trợ nhiều cổng thanh toán khác nhau như
                      PayPal, thẻ tín dụng, và chuyển khoản ngân hàng để mang
                      đến sự tiện lợi cho bạn.
                    </div>
                  </div>
                </div>
                <div className="accordion-item">
                  <h2 className="accordion-header" id="heading5">
                    <button
                      className="accordion-button collapsed"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapse5"
                      aria-expanded="false"
                      aria-controls="collapse5"
                    >
                      <span>
                        <i className="far fa-question"></i>
                      </span>{" "}
                      Làm thế nào để thay đổi địa chỉ email của tôi?
                    </button>
                  </h2>
                  <div
                    id="collapse5"
                    className="accordion-collapse collapse"
                    aria-labelledby="heading5"
                    data-bs-parent="#accordionExample"
                  >
                    <div className="accordion-body">
                      Bạn có thể thay đổi địa chỉ email của mình trong phần cài
                      đặt tài khoản sau khi đăng nhập. Vui lòng làm theo hướng
                      dẫn để cập nhật thông tin.
                    </div>
                  </div>
                </div>
                <div className="accordion-item">
                  <h2 className="accordion-header" id="heading6">
                    <button
                      className="accordion-button collapsed"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapse6"
                      aria-expanded="false"
                      aria-controls="collapse6"
                    >
                      <span>
                        <i className="far fa-question"></i>
                      </span>{" "}
                      Làm thế nào để đặt lại mật khẩu của tôi?
                    </button>
                  </h2>
                  <div
                    id="collapse6"
                    className="accordion-collapse collapse"
                    aria-labelledby="heading6"
                    data-bs-parent="#accordionExample"
                  >
                    <div className="accordion-body">
                      Bạn có thể đặt lại mật khẩu của mình bằng cách chọn
                      &quot;Quên mật khẩu?&quot; trên trang đăng nhập và làm
                      theo các bước hướng dẫn để thiết lập lại mật khẩu mới.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FaqPage;
