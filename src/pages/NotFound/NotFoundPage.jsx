import { Link } from "react-router-dom";
import { Breadcrumb } from "../../components";

const NotFoundPage = () => {
  return (
    <>
      <Breadcrumb title="404 Error" items="404 Error" />

      <div className="error-area py-120">
        <div className="container">
          <div className="col-md-6 mx-auto">
            <div className="error-wrapper">
              <h1>
                4<span>0</span>4
              </h1>
              <h2>Opos... Không tìm thấy trang!</h2>
              <p>
                Trang bạn đang tìm kiếm không tìm thấy có thể là do nó không tồn
                tại hoặc đã bị xóa.
              </p>
              <Link to="/" className="theme-btn">
                Quay về trang chủ <i className="fa fa-home"></i>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NotFoundPage;
