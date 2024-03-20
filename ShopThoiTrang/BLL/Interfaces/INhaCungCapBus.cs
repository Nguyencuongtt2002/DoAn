using Model;

namespace BLL
{
    public interface INhaCungCapBus
    {
        List<NhaCungCapModel> GetALL();
        bool Create(NhaCungCapModel them);
        bool Update(NhaCungCapModel sua);
        bool Delete(int ma);

    }
}