using Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL
{
    public partial interface IThamSoDAL
    {
        List<ThamSoModel> GetALL();
        //ThamSoModel GetTheoKyHieu(ThamSoModel model);
        ThamSoModel GetTheoMa(int ma);
        bool Create(ThamSoModel them);
        bool Update(ThamSoModel sua);
        bool Delete(int ma);
    }
}
