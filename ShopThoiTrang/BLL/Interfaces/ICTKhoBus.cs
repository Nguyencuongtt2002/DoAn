using Model;

namespace BLL
{
    public interface ICTKhoBus
    {
        CTKhoModel GetTheoMa(int ma);
        List<CTKhoModel> GetALL();
        bool Create(CTKhoModel them);
        bool Update(CTKhoModel sua);
        bool Delete(int ma);
        List<CTKhoModel> GetCTKhoTheoKho(int MaKho);

    }
}