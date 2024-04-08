using DAL.Helper;
using DAL;
using Model;
using Microsoft.Extensions.Options;
using MimeKit;
using MailKit.Net.Smtp;
namespace DAL
{
    public partial class EmailDAL : IEmailDAL
    {
        private readonly MailSettings _mailSettings;

        public EmailDAL(IOptions<MailSettings> mailSettings)
        {
            _mailSettings = mailSettings.Value;
        }

        public void SendConfirmationEmail(string toEmail, string confirmationLink, string token, string Ten)
        {
            var message = new MimeMessage();
            message.From.Add(new MailboxAddress(_mailSettings.SenderName, _mailSettings.SenderEmail));
            message.To.Add(new MailboxAddress("", toEmail));
            message.Subject = "Xác nhận email đăng ký " + Ten;

            var bodyBuilder = new BodyBuilder();
            bodyBuilder.HtmlBody = $"Cảm ơn bạn đã đăng ký,<br/><br/>Vui lòng nhấp vào liên kết sau để xác nhận email của bạn: <a href='{confirmationLink}?token={token}'>Xác nhận</a>";
            message.Body = bodyBuilder.ToMessageBody();

            using (var client = new SmtpClient())
            {
                client.Connect(_mailSettings.Server, _mailSettings.Port, false);
                client.Authenticate(_mailSettings.SenderEmail, _mailSettings.Password);
                client.Send(message);
                client.Disconnect(true);
            }
        }
        public void OrderEmail(string toEmail, string Ten, string HoTen,int? TongTien ,string DiaChi, string SDT, List<ChiTietDonHangModel> model)
        {
            var message = new MimeMessage();
            message.From.Add(new MailboxAddress(Ten + _mailSettings.SenderName, _mailSettings.SenderEmail));
            message.To.Add(new MailboxAddress("", toEmail));
            message.Subject = "Cảm ơn đã đặt hàng tại " + Ten;

            var bodyBuilder = new BodyBuilder();

            // Bắt đầu thiết kế nội dung HTML của email
            string htmlContent = @"
                <h2>Cảm ơn bạn đã đặt hàng tại " + Ten + @"</h2>
                <p>Xin chào " + HoTen + @",</p>
                <p>Dưới đây là chi tiết đơn hàng của bạn:</p>
                <table border='1'>
                    <tr>
                        <th>Sản phẩm</th>
                        <th>Số lượng</th>
                        <th>Giá</th>
                    </tr>";

                    // Thêm thông tin chi tiết đơn hàng vào bảng
                    foreach (var item in model)
                    {
                        htmlContent += @"
                    <tr>
                        <td>" + item.TenSP + @"</td>
                        <td>" + item.SoLuong + @"</td>
                        <td>" + item.GiaTien + @" VNĐ</td>
                        <td>" + item.TongTien + @" VNĐ</td>
                    </tr>";
                    }
                 htmlContent += @"
                        <tr>
                            <td colspan='3'><strong>Tổng tiền tất cả hóa đơn:</strong></td>
                            <td><strong>" + TongTien + @" VNĐ</strong></td>
                        </tr>";
                htmlContent += @"
                    </table>
                    <p>Địa chỉ giao hàng: " + DiaChi + @"</p>
                    <p>Số điện thoại liên hệ: " + SDT + @"</p>
                    <p>Xin chân thành cảm ơn!</p>";

            bodyBuilder.HtmlBody = htmlContent;
            message.Body = bodyBuilder.ToMessageBody();

            using (var client = new SmtpClient())
            {
                client.Connect(_mailSettings.Server, _mailSettings.Port, false);
                client.Authenticate(_mailSettings.SenderEmail, _mailSettings.Password);
                client.Send(message);
                client.Disconnect(true);
            }
        }

    }
}