using Model;

namespace BLL
{
    public interface ICTHoaDonNhapBus
    {
        CTHoaDonNhapModel GetTheoMa(int ma);
        List<CTHoaDonNhapModel> GetALL();
        bool Create(CTHoaDonNhapModel them);
        bool Update(CTHoaDonNhapModel sua);
        bool Delete(int ma);
        List<CTHoaDonNhapModel> GetCTHDNTheoHDN(int ma);

    }
}