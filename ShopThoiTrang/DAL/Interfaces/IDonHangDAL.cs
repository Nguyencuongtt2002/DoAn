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
        DonHangModel GetNew();
        bool CreateDonHang(DonHangModel model);
        List<DonHangModel> LichSuMuaHang(int MaNguoiDung);
        bool HuyDonHang(DonHangModel model);
        bool CapNhatDonHang(DonHangModel model);
        bool CapNhatDonHangKhiGiao(DonHangModel model);
        bool DuyetDonHang(DonHangModel model);
        List<ChiTietDonHangModel> GetCTDonHangTheoDonHang(int MaDonHang , int MaSanPham);
        List<LienHeModel> ThongTinLienHe();
    }
}