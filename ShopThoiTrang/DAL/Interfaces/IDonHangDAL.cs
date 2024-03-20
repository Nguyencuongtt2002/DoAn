using Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL
{
    public partial interface IDonHangDAL
    {
        List<DonHangModel> GetALL();
        bool CreateDonHang(DonHangModel model);
        List<DonHangModel> LichSuMuaHang(int MaNguoiDung);
        bool HuyDonHang(DonHangModel model);
        bool DuyetDonHang(int ma);
        List<ChiTietDonHangModel> GetCTDonHangTheoDonHang(int MaDonHang , int MaSanPham);
        List<LienHeModel> ThongTinLienHe();
    }
}