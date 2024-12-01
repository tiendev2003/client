**NOTE**
- Ngày bắt đầu: ngày đầu tiên tạo hóa đơn hoặc ngày đầu tiên tạo gì đó (hóa đơn, tài khoản, đặt bàn,...)
- Ngày bắt đầu: ngày cuối cùng hóa đơn được tạo hoặc ngày cuối cùng gì đó được tạo (hóa đơn, tài khoản, đặt bàn,...)
# API Documentation for Client and Store Statistics

## 1. **API Dành cho Khách Hàng (Client)**

### 1.1 Tổng quan
- **Endpoint**: `/api/client/overview`
- **Method**: GET
- **Parameters**:
  - `start_date`: Ngày bắt đầu trong khoảng thời gian.
  - `end_date`: Ngày kết thúc trong khoảng thời gian.
- **Response**:
  ```json
  {
      "start_date": "2024-01-01",
      "end_date": "2024-01-31",
      "total_orders": 50,
      "total_successful_plays": 45,
      "total_canceled_orders": 5,
      "total_spending": 5000000
  }
  ```
- **Mô tả giá trị trả về**:
  - `start_date`: Ngày bắt đầu trong khoảng thời gian lọc.
  - `end_date`: Ngày kết thúc trong khoảng thời gian lọc.
  - `total_orders`: Tổng lượt đặt (thành công + hủy).
  - `total_successful_plays`: Tổng lượt chơi thành công.
  - `total_canceled_orders`: Tổng lượt đặt bị hủy.
  - `total_spending`: Tổng số tiền đã chi tiêu.

---

### 1.2 Chi tiết Khách Hàng với Cửa Hàng
- **Endpoint**: `/api/client/store-details`
- **Method**: GET
- **Parameters**:
  - `user_id`: ID của khách hàng.
  - `start_date`: Ngày bắt đầu trong khoảng thời gian.
  - `end_date`: Ngày kết thúc trong khoảng thời gian.
- **Response**:
  ```json
  [
      {
          "user_id": 1,
          "store_name": "Billiard MBM",
          "total_orders": 20,
          "total_successful_plays": 18,
          "total_canceled_orders": 2,
          "total_spending": 2000000,
          "average_spending_per_play": 111111,
          "average_spending_per_day": 66667,
          "start_date": "2024-01-01",
          "end_date": "2024-01-31"
      }
  ]
  ```
- **Mô tả giá trị trả về**:
  - `user_id`: ID của khách hàng.
  - `store_name`: Tên cửa hàng.
  - `total_orders`: Tổng lượt đặt (thành công + hủy).
  - `total_successful_plays`: Tổng lượt chơi thành công.
  - `total_canceled_orders`: Tổng lượt đặt bị hủy.
  - `total_spending`: Tổng số tiền đã chi tiêu.
  - `average_spending_per_play`: Trung bình chi tiêu mỗi lượt chơi = Tổng số tiền / lượt chơi thành công.
  - `average_spending_per_day`: Trung bình chi tiêu mỗi ngày = Tổng số tiền / (end_date - start_date).
  - `start_date`: Ngày bắt đầu trong khoảng thời gian.
  - `end_date`: Ngày kết thúc trong khoảng thời gian.

---


## 2. **API Dành cho Cửa Hàng (Store)**

### 2.1 Tổng quan
- **Endpoint**: `/api/store/overview`
- **Method**: GET
- **Parameters**:
  - `start_date`: Ngày bắt đầu trong khoảng thời gian.
  - `end_date`: Ngày kết thúc trong khoảng thời gian.
- **Response**:
  ```json
  {
      "start_date": "2024-01-01",
      "end_date": "2024-01-31",
      "total_users": 150,
      "total_orders": 500,
      "total_successful_orders": 450,
      "total_canceled_orders": 50,
      "total_new_users": 30,
      "average_users_per_order": 0.3,
      "average_users_per_day": 5
  }
  ```
- **Mô tả giá trị trả về**:
  - `start_date`: Ngày bắt đầu trong khoảng thời gian.
  - `end_date`: Ngày kết thúc trong khoảng thời gian.
  - `total_users`: Tổng số khách hàng (distinct).
  - `total_orders`: Tổng lượt đặt (thành công + hủy).
  - `total_successful_orders`: Tổng lượt đặt thành công.
  - `total_canceled_orders`: Tổng lượt đặt bị hủy.
  - `total_new_users`: Tổng khách hàng mới.
  - `average_users_per_order`: Trung bình số khách hàng mỗi lượt đặt = Tổng khách hàng / lượt đặt.
  - `average_users_per_day`: Trung bình số khách hàng mỗi ngày = Tổng khách hàng / (end_date - start_date).

---


# API Documentation for Admin Statistics

## 1. **API Thống kê chung**
## 1. API cho Tài Khoản (Account)

### 1.1 Tổng quan Tài Khoản
- **Endpoint**: `/api/admin/account-overview`
- **Method**: GET
- **Parameters**:
  - `start_date`: Ngày tạo đầu tiên trong khoảng thời gian.
  - `end_date`: Ngày cập nhật cuối cùng trong khoảng thời gian.
- **Response**:
  ```json
  {
      "start_date": "2024-01-01",
      "end_date": "2024-01-31",
      "total_users": 1500,
      "new_users": 200,
      "total_shops": 200,
      "new_shops": 25
  }
  ```
- **Mô tả giá trị trả về**:
  - `start_date`: Ngày tạo đầu tiên trong khoảng thời gian lọc.
  - `end_date`: Ngày cập nhật cuối cùng trong khoảng thời gian lọc.
  - `total_users`: Tổng số người dùng trong hệ thống.
  - `new_users`: Số người dùng mới đăng ký trong khoảng thời gian.
  - `total_shops`: Tổng số cửa hàng.
  - `new_shops`: Số cửa hàng mới thêm vào trong khoảng thời gian.

---

## 2. API cho Đặt Hàng (Order)

### 2.1 Tổng quan Đặt Hàng
- **Endpoint**: `/api/admin/order-overview`
- **Method**: GET
- **Parameters**:
  - `start_date`: Ngày tạo đầu tiên trong khoảng thời gian.
  - `end_date`: Ngày cập nhật cuối cùng trong khoảng thời gian.
- **Response**:
  ```json
  {
      "start_date": "2024-01-01",
      "end_date": "2024-01-31",
      "total_orders": 5000,
      "successful_orders": 4500,
      "canceled_orders": 500,
      "total_revenue": 300000000
  }
  ```
- **Mô tả giá trị trả về**:
  - `start_date`: Ngày tạo đầu tiên trong khoảng thời gian lọc.
  - `end_date`: Ngày cập nhật cuối cùng trong khoảng thời gian lọc.
  - `total_orders`: Tổng số lượt đặt bàn.
  - `successful_orders`: Số lượt đặt bàn thành công.
  - `canceled_orders`: Số lượt đặt bàn bị hủy.
  - `total_revenue`: Tổng doanh thu từ các đơn đặt bàn.

## 2. **API Thống kê cửa hàng**
### 2.1 Doanh thu theo ngày
- **Endpoint**: `/api/admin/shop-revenue`
- **Method**: GET
- **Parameters**:
  - `shop_id` (optional): ID cửa hàng cụ thể.
  - `start_date`, `end_date`: Khoảng thời gian.
- **Response**:
  ```json
  {
      "start_date": "2024-01-01",
      "end_date": "2024-01-31",
      "shop_id": 1,
      "shop_name": "Billiard MBM",
      "daily_revenue": [
          {
              "date": "2024-01-01",
              "total_revenue": 1000000,
              "total_orders": 50
          },
          {
              "date": "2024-01-02",
              "total_revenue": 1200000,
              "total_orders": 60
          }
      ]
  }
  ```
- **Mô tả giá trị trả về**:
  - `start_date`, `end_date`: Khoảng thời gian lọc.
  - `shop_id`: ID của cửa hàng.
  - `shop_name`: Tên cửa hàng.
  - `daily_revenue`: Danh sách doanh thu theo từng ngày, gồm:
    - `date`: Ngày thống kê.
    - `total_revenue`: Tổng doanh thu trong ngày.
    - `total_orders`: Tổng lượt đặt bàn trong ngày.

### 2.2 Tỷ lệ hủy đặt bàn
- **Endpoint**: `/api/admin/shop-cancel-rate`
- **Method**: GET
- **Parameters**:
  - `shop_id` (optional): ID cửa hàng cụ thể.
  - `start_date`, `end_date`: Khoảng thời gian.
- **Response**:
  ```json
  {
      "start_date": "2024-01-01",
      "end_date": "2024-01-31",
      "shop_id": 1,
      "shop_name": "Billiard MBM",
      "canceled_orders": 10,
      "total_orders": 100,
      "cancel_rate": 10.0
  }
  ```
- **Mô tả giá trị trả về**:
  - `start_date`, `end_date`: Khoảng thời gian lọc.
  - `shop_id`, `shop_name`: ID và tên cửa hàng.
  - `canceled_orders`: Số lượt đặt bị hủy.
  - `total_orders`: Tổng số lượt đặt.
  - `cancel_rate`: Tỷ lệ hủy đặt bàn (%).

## 3. **API Thống kê người dùng**
### 3.1 Người dùng hoạt động tích cực
- **Endpoint**: `/api/admin/active-users`
- **Method**: GET
- **Parameters**:
  - `start_date`, `end_date`: Khoảng thời gian.
- **Response**:
  ```json
  {
      "start_date": "2024-01-01",
      "end_date": "2024-01-31",
      "active_users": [
          {
              "user_id": 1,
              "user_name": "Nguyen Van A",
              "total_orders": 20,
              "total_spending": 300000,
              "average_order_value": 15000
          }
      ]
  }
  ```
- **Mô tả giá trị trả về**:
  - `start_date`, `end_date`: Khoảng thời gian lọc.
  - `active_users`: Danh sách người dùng hoạt động tích cực, gồm:
    - `user_id`: ID của người dùng.
    - `user_name`: Tên người dùng.
    - `total_orders`: Tổng số lượt đặt bàn.
    - `total_spending`: Tổng chi tiêu.
    - `average_order_value`: Giá trị trung bình mỗi lượt đặt.

## 4. **API Báo cáo**
### 4.1 Báo cáo doanh thu
- **Endpoint**: `/api/admin/export-revenue-report`
- **Method**: GET
- **Parameters**:
  - `start_date`, `end_date`: Khoảng thời gian.
  - `format`: Định dạng tệp (`pdf` hoặc `excel`).
- **Response**:
  ```json
  {
      "start_date": "2024-01-01",
      "end_date": "2024-01-31",
      "file_url": "https://example.com/revenue-report.pdf"
  }
  ```
- **Mô tả giá trị trả về**:
  - `start_date`, `end_date`: Khoảng thời gian lọc.
  - `file_url`: Đường dẫn tải về file báo cáo.

## 5. **API Thống kê hệ thống**
### 5.1 Hiệu suất hệ thống
- **Endpoint**: `/api/admin/system-performance`
- **Method**: GET
- **Parameters**:
  - `start_date`, `end_date`: Khoảng thời gian.
- **Response**:
  ```json
  {
      "start_date": "2024-01-01",
      "end_date": "2024-01-31",
      "active_users": 500,
      "active_shops": 120,
      "api_requests": 10000,
      "average_response_time": "150ms",
      "uptime_percentage": 99.9
  }
  ```
- **Mô tả giá trị trả về**:
  - `start_date`, `end_date`: Khoảng thời gian lọc.
  - `active_users`: Số lượng người dùng đang hoạt động.
  - `active_shops`: Số lượng cửa hàng đang hoạt động.
  - `api_requests`: Tổng số lượt yêu cầu API.
  - `average_response_time`: Thời gian phản hồi trung bình.
  - `uptime_percentage`: Tỉ lệ uptime của hệ thống.
   