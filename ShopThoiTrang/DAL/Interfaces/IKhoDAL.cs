using Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL
{
    public partial interface IKhoDAL
    {
        KhoModel GetTheoMa(int ma);
        List<KhoModel> GetALL(int? pageIndex, int? pageSize, out int total);
        bool Create(KhoModel them);
        bool Update(KhoModel sua);
        bool Delete(int ma);

    }
}
