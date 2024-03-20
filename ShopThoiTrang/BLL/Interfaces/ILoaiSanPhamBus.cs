using Model;

namespace BLL
{
    public interface ILoaiSanPhamBus
    {
        List<LoaiSanPhamModel> GetALL();
        bool Create(LoaiSanPhamModel them);
        bool Update(LoaiSanPhamModel sua);
        bool Delete(int ma);

    }
}