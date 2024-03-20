using Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL
{
    public partial interface ITinTucDAL
    {
        TinTucModel GetTheoMa(int ma);
        List<TinTucModel> GetTinTucKhac(int ma);
        List<TinTucModel> GetALL(int? pageIndex, int? pageSize, out int total);
        bool Create(TinTucModel them);
        bool Update(TinTucModel sua);
        bool Delete(int ma);

    }
}
