using Model;

namespace BLL
{
    public interface INguoiDungBus
    {
        NguoiDungModel DangNhap(string TaiKhoan, string MatKhau);
        NguoiDungModel GetTheoMa(int ma);
        NguoiDungModel CheckTaiKhoan(string TaiKhoan, string Email);
        List<NguoiDungModel> GetALL(int? pageIndex, int? pageSize, out int total);
        bool Create(NguoiDungModel model);
        bool Update(NguoiDungModel model);
        bool Delete(int ma);
        bool ResetMatKhau(NguoiDungModel model);

    }
}