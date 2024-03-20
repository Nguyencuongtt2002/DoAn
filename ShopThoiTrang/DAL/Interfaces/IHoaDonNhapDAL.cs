using Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL
{
    public partial interface IHoaDonNhapDAL
    {
        HoaDonNhapModel GetTheoMa(int ma);
        HoaDonNhapModel GetNew();
        List<HoaDonNhapModel> GetALL(int? pageIndex, int? pageSize, out int total);
        bool Create(HoaDonNhapModel them);
        bool Update(HoaDonNhapModel sua);
        bool Delete(int ma);
        List<LienHeModel> ThongTinLienHe();
    }
}
