using Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL
{
    public partial interface ILoaiSanPhamDAL
    {
        List<LoaiSanPhamModel> GetALL();
        bool Create(LoaiSanPhamModel them);
        bool Update(LoaiSanPhamModel sua);
        bool Delete(int ma);
    }
}
