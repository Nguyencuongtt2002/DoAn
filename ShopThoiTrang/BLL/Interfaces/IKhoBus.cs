using Model;

namespace BLL
{
    public interface IKhoBus
    {
        KhoModel GetTheoMa(int ma);
        List<KhoModel> GetALL(int? pageIndex, int? pageSize, out int total);
        bool Create(KhoModel them);
        bool Update(KhoModel sua);
        bool Delete(int ma);

    }
}