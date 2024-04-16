using Model;

namespace BLL
{
    public interface IDonHangBus
    {
        List<DonHangModel> GetALL();
        bool CreateDonHang(DonHangModel model);
        DonHangModel GetNew();
        DonHangModel GetTheoMa(int? ma);
        List<DonHangModel> LichSuMuaHang(int MaNguoiDung);
        bool HuyDonHang(DonHangModel model);
        bool DuyetDonHang(int ma);
        List<ChiTietDonHangModel> GetCTDonHangTheoDonHang(int? MaDonHang);
        List<LienHeModel> ThongTinLienHe();
        bool CapNhatDonHang(DonHangModel model);
        bool CapNhatDonHangKhiGiao(DonHangModel model);

    }
}