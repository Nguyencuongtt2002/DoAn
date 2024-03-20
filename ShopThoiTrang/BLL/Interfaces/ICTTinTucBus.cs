using Model;

namespace BLL
{
    public interface ICTTinTucBus
    {
        CTTinTucModel GetTheoMa(int ma);
        List<CTTinTucModel> GetALL();
        bool Create(CTTinTucModel them);
        bool Update(CTTinTucModel sua);
        bool Delete(int ma);
        List<CTTinTucModel> GetCTTinTucTheoTinTuc(int MaKho);

    }
}