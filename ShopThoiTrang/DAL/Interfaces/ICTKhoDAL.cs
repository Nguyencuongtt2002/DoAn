using Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL
{
    public partial interface ICTKhoDAL
    {
        CTKhoModel GetTheoMa(int ma);
        List<CTKhoModel> GetALL();
        bool Create(CTKhoModel them);
        bool Update(CTKhoModel sua);
        bool Delete(int ma);
        List<CTKhoModel> GetCTKhoTheoKho(int MaKho);
    }
}
