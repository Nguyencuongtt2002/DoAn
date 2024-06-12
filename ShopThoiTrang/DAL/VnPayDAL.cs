using DAL.Helper;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;
using Model;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL
{
    public class VnPayDAL : IVnPayDAL
    {
        private IDatabaseHelper _dbHelper;
        private IConfiguration _configuration;
        public VnPayDAL(IDatabaseHelper dbHelper, IConfiguration configuration)
        {
            _dbHelper = dbHelper;
            _configuration = configuration;
        }
        public string CreatePaymentUrl(PaymentInformationModel model, HttpContext context)
        {
            // Lấy thời gian hiện tại ở múi giờ địa phương
            var thoiGianHienTai = TimeZoneInfo.ConvertTimeFromUtc(DateTime.UtcNow, TimeZoneInfo.Local);

            // Lấy số nháy thời gian hiện tại và chuyển thành chuỗi
            var tick = DateTime.Now.Ticks.ToString();

            // Khởi tạo một đối tượng thư viện VnPay mới
            var vnpay = new VnPayLibrary();

            // Thêm các dữ liệu yêu cầu vào đối tượng VnPay để tạo URL thanh toán
            vnpay.AddRequestData("vnp_Version", _configuration["Vnpay:Version"]); // Phiên bản API của VnPay
            vnpay.AddRequestData("vnp_Command", _configuration["Vnpay:Command"]); // Lệnh thanh toán
            vnpay.AddRequestData("vnp_TmnCode", _configuration["Vnpay:TmnCode"]); // Mã cửa hàng của bạn trên hệ thống VnPay
            vnpay.AddRequestData("vnp_Amount", ((int)model.Amount * 100).ToString()); // Số tiền thanh toán (đơn vị: đồng)
            vnpay.AddRequestData("vnp_CreateDate", thoiGianHienTai.ToString("yyyyMMddHHmmss")); // Thời gian tạo đơn hàng
            vnpay.AddRequestData("vnp_CurrCode", _configuration["Vnpay:CurrCode"]); // Mã tiền tệ (VND)
            vnpay.AddRequestData("vnp_IpAddr", Utils.GetIpAddress(context)); // Địa chỉ IP của khách hàng
            vnpay.AddRequestData("vnp_Locale", _configuration["Vnpay:Locale"]); // Ngôn ngữ hiển thị trên giao diện thanh toán
            vnpay.AddRequestData("vnp_OrderInfo", model.OrderId.ToString()); // Thông tin đơn hàng
            vnpay.AddRequestData("vnp_OrderType", model.OrderType); // Loại đơn hàng
            vnpay.AddRequestData("vnp_ReturnUrl", model.Url); // URL để xử lý kết quả thanh toán
            vnpay.AddRequestData("vnp_TxnRef", model.OrderId.ToString()); // Tham chiếu đơn hàng

            // Tạo URL thanh toán bằng cách gọi phương thức CreateRequestUrl của đối tượng VnPay
            var paymentUrl =
                vnpay.CreateRequestUrl(_configuration["Vnpay:BaseUrl"], _configuration["Vnpay:HashSecret"]);

            // Trả về URL thanh toán được tạo ra
            return paymentUrl;
        }


        public VnPaymentModel PaymentExecute(IQueryCollection collections)
        {
            var vnPay = new VnPayLibrary();
            foreach (var (key, value) in collections)
            {
                if (!string.IsNullOrEmpty(key) && key.StartsWith("vnp_"))
                {
                    vnPay.AddResponseData(key, value);
                }
            }

            var orderId = Convert.ToInt64(vnPay.GetResponseData("vnp_TxnRef"));
            var vnPayTranId = Convert.ToInt64(vnPay.GetResponseData("vnp_TransactionNo"));
            var vnpResponseCode = vnPay.GetResponseData("vnp_ResponseCode");
            var vnpSecureHash =
                collections.FirstOrDefault(k => k.Key == "vnp_SecureHash").Value;
            var orderInfo = vnPay.GetResponseData("vnp_OrderInfo");

            var checkSignature =
                vnPay.ValidateSignature(vnpSecureHash, _configuration["Vnpay:HashSecret"]);

            if (!checkSignature)
                return new VnPaymentModel()
                {
                    Success = false
                };
            var transactionStatus = vnPay.GetResponseData("vnp_TransactionStatus");
            if (transactionStatus != "00")
            {
                return new VnPaymentModel()
                {
                    Success = false
                };
            }

            return new VnPaymentModel()
            {
                Success = true,
                PaymentMethod = "VnPay",
                OrderDescription = orderInfo,
                OrderId = orderId.ToString(),
                PaymentId = vnPayTranId.ToString(),
                TransactionId = vnPayTranId.ToString(),
                Token = vnpSecureHash,
                VnPayResponseCode = vnpResponseCode
            };
        }
    }
}