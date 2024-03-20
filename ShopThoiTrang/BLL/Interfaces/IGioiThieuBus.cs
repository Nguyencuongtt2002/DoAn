using Model;

namespace BLL
{
    public interface IGioiThieuBus
    {
        GioiThieuModel GetTheoMa(int ma);
        List<GioiThieuModel> GetALL();
        bool Create(GioiThieuModel them);
        bool Update(GioiThieuModel sua);
        bool Delete(int ma);

    }
}