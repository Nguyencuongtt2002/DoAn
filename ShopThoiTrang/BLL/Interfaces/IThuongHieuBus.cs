using Model;

namespace BLL
{
    public interface IThuongHieuBus
    {
        List<ThuongHieuModel> GetALL();
        bool Create(ThuongHieuModel them);
        bool Update(ThuongHieuModel sua);
        bool Delete(int ma);

    }
}