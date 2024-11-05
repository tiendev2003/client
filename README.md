# Hệ thống Website Đặt Bàn Bi-a

## Mục lục
- [Giới thiệu](#giới-thiệu)
- [Cấu trúc Router](#cấu-trúc-router)
- [Bảo mật](#bảo-mật)


## Giới thiệu
Hệ thống website đặt bàn bi-a là nền tảng kết nối người chơi bi-a với các câu lạc bộ/quán bi-a. 
Hệ thống cho phép đặt bàn trực tuyến, quản lý đặt bàn, và tương tác giữa người chơi và chủ quán.

## Cấu trúc Router

### 1. Khách vãng lai
#### Trang thông tin
- `/gioi-thieu`: Trang giới thiệu về website
- `/lien-he`: Thông tin liên hệ và hỗ trợ
- `/tin-tuc`: Tin tức và blog về billiard
- `/huong-dan-su-dung`: Hướng dẫn sử dụng website
- `/dieu-khoan-su-dung`: Điều khoản và điều kiện
- `/chinh-sach-bao-mat`: Chính sách bảo mật

#### Tìm kiếm và xem quán
- `/tim-quan`: Tìm kiếm quán billiard
- `/tim-quan/bo-loc`: Bộ lọc tìm kiếm nâng cao
- `/quan/:id-:slug`: Thông tin chi tiết quán
- `/quan/:id/ban-do`: Vị trí quán trên bản đồ
- `/quan/:id/danh-gia`: Xem đánh giá và bình luận

#### Đăng ký & Đăng nhập
- `/dang-ky`: Đăng ký tài khoản mới
- `/dang-nhap`: Đăng nhập hệ thống
- `/quen-mat-khau`: Khôi phục mật khẩu

### 2. Khách hàng đã đăng ký
#### Quản lý tài khoản
- `/thong-tin-ca-nhan`: Cập nhật thông tin cá nhân
- `/doi-mat-khau`: Thay đổi mật khẩu
- `/xac-thuc-2-buoc`: Bảo mật 2 lớp
- `/dang-xuat`: Đăng xuất

#### Đặt bàn & Thanh toán
- `/dat-ban`: Đặt bàn mới
- `/huy-dat-ban/:id`: Hủy đặt bàn
- `/lich-su-dat-ban`: Lịch sử đặt bàn
- `/thanh-toan`: Thanh toán trực tuyến
- `/lich-su-thanh-toan`: Lịch sử thanh toán

#### Tương tác & Tiện ích
- `/danh-gia-quan/:id`: Đánh giá và bình luận
- `/quan/:id/chi-duong`: Chỉ đường đến quán
- `/uu-dai-cua-toi`: Ưu đãi và điểm thưởng
- `/yeu-thich`: Danh sách quán yêu thích
- `/thong-bao`: Thông báo hệ thống
- `/ho-tro`: Gửi yêu cầu hỗ trợ

<!-- #### Tính năng xã hội
- `/chia-se/:id`: Chia sẻ thông tin quán
- `/moi-ban-be`: Giới thiệu bạn bè
- `/khuyen-mai-gioi-thieu`: Ưu đãi giới thiệu -->

### 3. Quản lý cửa hàng
#### Quản lý tài khoản
- `/quan-ly/dang-nhap`: Đăng nhập
- `/quan-ly/dang-xuat`: Đăng xuất
- `/quan-ly/cap-nhat-thong-tin-quan`: Cập nhật thông tin quán

#### Quản lý hoạt động
- `/quan-ly/quan-ly-ban`: Quản lý bàn billiard
- `/quan-ly/cap-nhat-tinh-trang-ban`: Cập nhật trạng thái bàn
- `/quan-ly/xac-nhan-dat-ban/:id`: Xác nhận đặt bàn
- `/quan-ly/quan-ly-khuyen-mai`: Quản lý khuyến mãi
<!-- - `/quan-ly/phan-hoi-danh-gia`: Phản hồi đánh giá -->
- `/quan-ly/quan-ly-thanh-toan`: Quản lý thanh toán

#### Báo cáo & Thống kê
- `/quan-ly/thong-ke-dat-ban`: Thống kê đặt bàn
- `/quan-ly/bao-cao-doanh-thu`: Báo cáo doanh thu
- `/quan-ly/sao-ke`: Sao kê thanh toán

<!-- #### Quản lý nhân sự
- `/quan-ly/nhan-vien`: Quản lý nhân viên
- `/quan-ly/lich-lam-viec`: Quản lý ca làm việc -->

#### Quản lý kho
- `/quan-ly/kho`: Quản lý kho và thiết bị

### 4. Quản trị viên
#### Quản lý hệ thống
- `/quan-tri/dang-nhap`: Đăng nhập
- `/quan-tri/dang-xuat`: Đăng xuất
- `/quan-tri/quan-ly-tai-khoan`: Quản lý tài khoản
- `/quan-tri/quan-ly-quyen`: Quản lý phân quyền
<!-- - `/quan-tri/cau-hinh-he-thong`: Cấu hình hệ thống -->

#### Quản lý nội dung
- `/quan-tri/quan-ly-quan`: Quản lý danh sách quán
- `/quan-tri/phe-duyet-quan`: Phê duyệt quán mới
- `/quan-tri/quan-ly-noi-dung`: Quản lý nội dung
<!-- - `/quan-tri/he-thong-thong-bao`: Quản lý thông báo -->

<!-- #### Báo cáo & Giám sát
- `/quan-tri/thong-ke`: Báo cáo thống kê
- `/quan-tri/nhat-ky-he-thong`: Xem log hệ thống
- `/quan-tri/bao-cao-loi`: Quản lý báo cáo lỗi
- `/quan-tri/sao-luu`: Sao lưu dữ liệu -->

### 5. API Endpoints
- Prefix: `/api/v1/`
- Ví dụ: 
  - `/api/v1/auth/login`
  - `/api/v1/bookings`
  - `/api/v1/clubs`

### 6. Error Pages
- `/404`: Trang không tìm thấy
- `/403`: Không có quyền truy cập
- `/500`: Lỗi server
- `/bao-tri`: Trang bảo trì

## Bảo mật
1. Authentication & Authorization
   - JWT hoặc session-based authentication
   - Middleware kiểm tra quyền truy cập
   - Xác thực 2 lớp cho tài khoản quan trọng

2. Bảo vệ Forms & API
   - CSRF token cho forms
   - Rate limiting cho API
   - Input validation và sanitization
   - XSS protection

3. Logging & Monitoring
   - Audit logging cho hoạt động quan trọng
   - Error logging
   - Performance monitoring
