using DAL;
using Model;
using System;
using System.Collections.Generic;
using System.Drawing;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;

namespace BLL
{
    public class EmailBus : IEmailBus
    {
        private readonly IEmailDAL _emailDAL;

        public EmailBus(IEmailDAL emailDAL)
        {
            _emailDAL = emailDAL;
        }

        public void SendConfirmationEmail(string toEmail, string confirmationLink, string token, string Ten)
        {
            _emailDAL.SendConfirmationEmail(toEmail, confirmationLink, token, Ten);
        }
        public void OrderEmail(string toEmail, string Ten, string HoTen, int? TongTien, string DiaChi, string SDT, List<ChiTietDonHangModel> model)
        {
            _emailDAL.OrderEmail(toEmail,Ten,HoTen,TongTien,DiaChi,SDT,model);
        }
    }
}