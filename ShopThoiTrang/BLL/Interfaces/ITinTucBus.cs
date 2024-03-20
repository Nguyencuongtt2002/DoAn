using Model;

namespace BLL
{
    public interface ITinTucBus
    {
        TinTucModel GetTheoMa(int ma);
        List<TinTucModel> GetTinTucKhac(int ma);
        List<TinTucModel> GetALL(int? pageIndex, int? pageSize, out int total);
        bool Create(TinTucModel them);
        bool Update(TinTucModel sua);
        bool Delete(int ma);

    }
}