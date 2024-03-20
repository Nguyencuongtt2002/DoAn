using Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL
{
    public partial interface ICTHoaDonNhapDAL
    {
        CTHoaDonNhapModel GetTheoMa(int ma);
        List<CTHoaDonNhapModel> GetALL();
        bool Create(CTHoaDonNhapModel them);
        bool Update(CTHoaDonNhapModel sua);
        bool Delete(int ma);
        List<CTHoaDonNhapModel> GetCTHDNTheoHDN(int ma);
    }
}
