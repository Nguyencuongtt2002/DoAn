using Model;

namespace BLL
{
    public interface IDonHangBus
    {
        List<DonHangModel> GetALL();
        bool CreateDonHang(DonHangModel model);
        DonHangModel GetNew();
        List<DonHangModel> LichSuMuaHang(int MaNguoiDung);
        bool HuyDonHang(DonHangModel model);
        bool DuyetDonHang(DonHangModel model);
        List<ChiTietDonHangModel> GetCTDonHangTheoDonHang(int MaDonHang, int MaSanPham);
        List<LienHeModel> ThongTinLienHe();
        bool CapNhatDonHang(DonHangModel model);
        bool CapNhatDonHangKhiGiao(DonHangModel model);

    }
}