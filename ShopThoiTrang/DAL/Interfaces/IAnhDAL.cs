using Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL
{
    public partial interface IAnhDAL
    {
        List<AnhModel> GetALL();
        bool Create(AnhModel them);
        bool Update(AnhModel sua);
        bool Delete(int ma);

    }
}
