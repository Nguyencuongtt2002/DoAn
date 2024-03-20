using Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL
{
    public partial interface ICTTinTucDAL
    {
        CTTinTucModel GetTheoMa(int ma);
        List<CTTinTucModel> GetALL();
        bool Create(CTTinTucModel them);
        bool Update(CTTinTucModel sua);
        bool Delete(int ma);
        List<CTTinTucModel> GetCTTinTucTheoTinTuc(int MaKho);
    }
}
