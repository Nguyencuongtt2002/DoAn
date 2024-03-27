using Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL
{
    public partial interface INguoiDungDAL
    {
        NguoiDungModel DangNhap(string TaiKhoan, string MatKhau);
        NguoiDungModel GetTheoMa(int ma);
        NguoiDungModel CheckTaiKhoan(string TaiKhoan,string Email);
        List<NguoiDungModel> GetALL(int? page, int? pageSize, out int total);
        bool Create(NguoiDungModel model);
        bool Update(NguoiDungModel model);
        bool Delete(int ma);
        bool ResetMatKhau(NguoiDungModel model);

    }
}
