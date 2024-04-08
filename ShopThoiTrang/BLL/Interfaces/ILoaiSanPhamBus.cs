using Model;

namespace BLL
{
    public interface ILoaiSanPhamBus
    {
        List<LoaiSanPhamModel> GetALL(int? page, int? pageSize, out int total, string? TenLoaiSanPham);
        bool Create(LoaiSanPhamModel them);
        bool Update(LoaiSanPhamModel sua);
        bool Delete(int ma);

    }
}