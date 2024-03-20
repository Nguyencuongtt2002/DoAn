using Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL
{
    public partial interface IGioiThieuDAL
    {
        GioiThieuModel GetTheoMa(int ma);
        List<GioiThieuModel> GetALL();
        bool Create(GioiThieuModel them);
        bool Update(GioiThieuModel sua);
        bool Delete(int ma);

    }
}
