using Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL
{
    public partial interface IThuongHieuDAL
    {
        List<ThuongHieuModel> GetALL();
        bool Create(ThuongHieuModel them);
        bool Update(ThuongHieuModel sua);
        bool Delete(int ma);
    }
}
