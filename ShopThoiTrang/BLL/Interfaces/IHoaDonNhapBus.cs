using Model;

namespace BLL
{
    public interface IHoaDonNhapBus
    {
        HoaDonNhapModel GetTheoMa(int ma);
        HoaDonNhapModel GetNew();
        List<HoaDonNhapModel> GetALL(int? pageIndex, int? pageSize, out int total);
        bool Create(HoaDonNhapModel them);
        bool Update(HoaDonNhapModel sua);
        bool Delete(int ma);
        List<LienHeModel> ThongTinLienHe();

    }
}