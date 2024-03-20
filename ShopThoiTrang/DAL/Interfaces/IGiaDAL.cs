using Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL
{
    public partial interface IGiaDAL
    {
        List<GiaModel> GetALL(int? pageIndex, int? pageSize, out int total);
        bool Create(GiaModel them);
        bool Update(GiaModel sua);
        bool Delete(int ma);
        GiaModel GetGiaTheoSanPham(int MaSanPham);
    }
}
