using Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL
{
    public partial interface ISizeDAL
    {
        List<SizeModel> GetALL();
        bool Create(SizeModel them);
        bool Update(SizeModel sua);
        bool Delete(int ma);
    }
}
