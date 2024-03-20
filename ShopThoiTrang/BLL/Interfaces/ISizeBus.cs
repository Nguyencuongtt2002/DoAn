using Model;

namespace BLL
{
    public interface ISizeBus
    {
        List<SizeModel> GetALL();
        bool Create(SizeModel them);
        bool Update(SizeModel sua);
        bool Delete(int ma);

    }
}