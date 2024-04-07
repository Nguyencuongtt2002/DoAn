using Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL
{
    public partial interface IEmailDAL
    {
        void SendConfirmationEmail(string toEmail, string confirmationLink, string token, string Ten);
        void OrderEmail(string toEmail, string Ten, string HoTen,int? TongTien ,string DiaChi, string SDT, List<ChiTietDonHangModel> model);
    }
}
