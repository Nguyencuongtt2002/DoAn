using Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL
{
    public partial interface INhaCungCapDAL
    {
        List<NhaCungCapModel> GetALL();
        bool Create(NhaCungCapModel them);
        bool Update(NhaCungCapModel sua);
        bool Delete(int ma);
    }
}
