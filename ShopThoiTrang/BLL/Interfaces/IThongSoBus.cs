using Model;

namespace BLL
{
    public interface IThongSoBus
    {
        List<ThongSoModel> GetALL();
        bool Create(ThongSoModel them);
        bool Update(ThongSoModel sua);
        bool Delete(int ma);
        List<ThongSoModel> GetThongSoTheoSanPham(int MaSanPham);

    }
}