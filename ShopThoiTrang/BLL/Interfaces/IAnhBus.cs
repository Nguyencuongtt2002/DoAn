using Model;

namespace BLL
{
    public interface IAnhBus
    {
        List<AnhModel> GetALL();
        bool Create(AnhModel them);
        bool Update(AnhModel sua);
        bool Delete(int ma);
    }
}