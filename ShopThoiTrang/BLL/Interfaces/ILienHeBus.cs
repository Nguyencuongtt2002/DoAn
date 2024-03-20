using Model;

namespace BLL
{
    public interface ILienHeBus
    {
        List<LienHeModel> GetALL(int? page, int? pageSize, out int total, string? Email, string? SoDienThoai);
        bool CreateLienHe(LienHeModel themlienhe);
        bool UpdateLienHe(LienHeModel sualienhe);
        bool DeleteLienHe(int ma);
    }
}