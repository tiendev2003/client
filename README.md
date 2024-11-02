# API Router cho Hệ thống Quản lý Quán Bida

## 1. Router cho Người Dùng

### Quản Lý Quán Bida
- `GET /clubs` - Lấy danh sách tất cả các quán bida.
- `GET /clubs/{id}` - Xem chi tiết một quán bida cụ thể.
- `GET /clubs/{id}/tables` - Xem danh sách các bàn tại một quán bida cụ thể.
- `POST /clubs/{id}/reserve` - Đặt bàn tại một quán bida.
- `GET /reservations` - Xem lịch sử đặt bàn của người dùng.
- `DELETE /reservations/{reservationId}` - Hủy một đặt bàn cụ thể.
- `GET /search` - Tìm kiếm quán bida theo tên, địa điểm hoặc tiêu chí khác.

### Quản Lý Tài Khoản Người Dùng
- `POST /users/register` - Đăng ký tài khoản người dùng mới.
- `POST /users/login` - Đăng nhập người dùng.
- `GET /users/profile` - Xem thông tin tài khoản người dùng hiện tại.
- `PUT /users/profile` - Cập nhật thông tin tài khoản người dùng.
- `PUT /users/password` - Thay đổi mật khẩu của người dùng.
- `DELETE /users/delete` - Xóa tài khoản người dùng.

### Bình Luận và Đánh Giá
- `POST /clubs/{id}/comment` - Đăng bình luận, đánh giá cho một quán bida.
- `GET /clubs/{id}/comments` - Lấy danh sách bình luận, đánh giá của một quán bida.
- `PUT /comments/{commentId}` - Chỉnh sửa bình luận của người dùng.
- `DELETE /comments/{commentId}` - Xóa bình luận của người dùng.

## 2. Router cho Chủ Quán

### Quản Lý Tài Khoản Chủ Quán
- `POST /owners/register` - Đăng ký làm chủ quán.
- `POST /owners/login` - Đăng nhập cho chủ quán.
- `GET /owners/profile` - Xem thông tin tài khoản của chủ quán hiện tại.
- `PUT /owners/profile` - Cập nhật thông tin tài khoản chủ quán.
- `PUT /owners/password` - Thay đổi mật khẩu của chủ quán.
- `DELETE /owners/delete` - Xóa tài khoản chủ quán.

### Quản Lý Quán Bida của Chủ Quán
- `POST /owners/clubs` - Thêm một quán bida mới.
- `PUT /owners/clubs/{id}` - Cập nhật thông tin của một quán bida.
- `DELETE /owners/clubs/{id}` - Xóa một quán bida.
- `GET /owners/clubs/{id}/tables` - Xem danh sách bàn tại quán của chủ quán.
- `POST /owners/clubs/{id}/tables` - Thêm bàn mới vào quán.
- `PUT /owners/clubs/{id}/tables/{tableId}` - Cập nhật thông tin một bàn.
- `DELETE /owners/clubs/{id}/tables/{tableId}` - Xóa một bàn.
- `PUT /owners/clubs/{id}/tables/{tableId}/status` - Thay đổi trạng thái của bàn (vd: đang sử dụng, trống).
- `GET /owners/clubs/{id}/reservations` - Xem danh sách các bàn đã đặt tại quán.
- `PUT /owners/reservations/{reservationId}/status` - Cập nhật trạng thái đặt bàn (vd: xác nhận, hủy).

### Quản Lý Chương Trình Khuyến Mãi cho Quán
- `POST /owners/clubs/{id}/promotions` - Thêm chương trình khuyến mãi cho quán.
- `GET /owners/clubs/{id}/promotions` - Xem danh sách các chương trình khuyến mãi hiện có tại quán.
- `PUT /owners/clubs/{id}/promotions/{promotionId}` - Cập nhật chương trình khuyến mãi.
- `DELETE /owners/clubs/{id}/promotions/{promotionId}` - Xóa chương trình khuyến mãi.

### Thống Kê Đặt Bàn cho Chủ Quán
- `GET /owners/clubs/{id}/statistics/reservations` - Lấy thống kê đặt bàn theo ngày, tuần, tháng.
- `GET /owners/clubs/{id}/statistics/earnings` - Lấy thống kê doanh thu từ đặt bàn theo ngày, tuần, tháng.

### Quản Lý Phản Hồi, Đánh Giá của Khách Hàng
- `GET /owners/clubs/{id}/comments` - Xem danh sách các bình luận, đánh giá cho quán.
- `PUT /owners/comments/{commentId}/status` - Ẩn/bỏ ẩn bình luận vi phạm hoặc không phù hợp.

## 3. Router cho Quản Trị Hệ Thống (Admin)

### Quản Lý Quán Bida
- `GET /admin/clubs` - Xem danh sách tất cả các quán bida.
- `DELETE /admin/clubs/{id}` - Xóa một quán vi phạm quy định.

### Quản Lý Người Dùng
- `GET /admin/users` - Xem danh sách tất cả người dùng.
- `DELETE /admin/users/{id}` - Xóa tài khoản người dùng vi phạm quy định.
- `PUT /admin/users/{id}/status` - Cập nhật trạng thái tài khoản người dùng (vd: khóa tài khoản).

### Quản Lý Chủ Quán
- `GET /admin/owners` - Xem danh sách tất cả chủ quán.
- `DELETE /admin/owners/{id}` - Xóa tài khoản chủ quán vi phạm quy định.
- `PUT /admin/owners/{id}/status` - Cập nhật trạng thái tài khoản chủ quán (vd: khóa tài khoản).

### Quản Lý Đặt Bàn
- `GET /admin/reservations` - Xem danh sách tất cả các bàn đã đặt trên hệ thống.
- `DELETE /admin/reservations/{reservationId}` - Hủy đặt bàn vi phạm quy định.

### Quản Lý Bình Luận và Đánh Giá
- `GET /admin/comments` - Xem danh sách tất cả bình luận trên hệ thống.
- `PUT /admin/comments/{commentId}/status` - Ẩn/bỏ ẩn bình luận vi phạm.
