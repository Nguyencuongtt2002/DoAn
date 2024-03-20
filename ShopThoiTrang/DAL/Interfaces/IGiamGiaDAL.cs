using Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL
{
    public partial interface IGiamGiaDAL
    {
        List<GiamGiaModel> GetALL(int? pageIndex, int? pageSize, out int total);
        bool Create(GiamGiaModel them);
        bool Update(GiamGiaModel sua);
        bool Delete(int ma);
        GiamGiaModel GetGiamGiaTheoSanPham(int MaSanPham);
    }
}
