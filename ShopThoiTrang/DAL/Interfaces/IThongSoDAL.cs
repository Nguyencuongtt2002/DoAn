using Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL
{
    public partial interface IThongSoDAL
    {
        List<ThongSoModel> GetALL();
        bool Create(ThongSoModel them);
        bool Update(ThongSoModel sua);
        bool Delete(int ma);
        List<ThongSoModel> GetThongSoTheoSanPham(int MaSanPham);
    }
}
