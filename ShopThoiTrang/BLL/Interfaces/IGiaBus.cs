using Model;

namespace BLL
{
    public interface IGiaBus
    {
        List<GiaModel> GetALL(int? pageIndex, int? pageSize, out int total);
        bool Create(GiaModel them);
        bool Update(GiaModel sua);
        bool Delete(int ma);
        GiaModel GetGiaTheoSanPham(int MaSanPham);

    }
}