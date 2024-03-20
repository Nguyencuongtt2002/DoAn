using Model;

namespace BLL
{
    public interface ISanPhamBus
    {
        SanPhamModel GetTheoMa(int ma);
        SanPhamModel GetNew();
        List<SanPhamModel> SanPhamMoi(int SL);
        List<SanPhamModel> SanPhamBanChay(int SL);
        List<SanPhamModel> SanPhamGiamGia(int SL);
        List<SanPhamModel> SanPhamCungLoai(int MaSanPham, int MaLoaiSanPham);
        List<SanPhamModel> GetALL(int? page, int? pageSize, out int total, string? TenSP);
        bool Create(SanPhamModel model);
        bool Update(SanPhamModel model);
        bool Delete(int ma);
        List<SanPhamModel> TimKiem(int? page, int? pageSize, out int total, int? MaSanPham, string TenSP, string TenThuongHieu, string TenLoaiSanPham, int? MinGia, int? MaxGia, int? MaLoaiSanPham, int? MaThuongHieu);
    }
}