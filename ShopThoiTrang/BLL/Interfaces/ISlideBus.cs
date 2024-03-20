using Model;

namespace BLL
{
    public interface ISlideBus
    {
        SlideModel GetTheoMa(int ma);
        List<SlideModel> GetALL();
        bool Create(SlideModel them);
        bool Update(SlideModel sua);
        bool Delete(int ma);

    }
}