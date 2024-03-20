using Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL
{
    public partial interface ILienHeDAL
    {
        List<LienHeModel> GetALL(int? page, int? pageSize, out int total,string? Email, string? SoDienThoai);
        bool CreateLienHe(LienHeModel themlienhe);
        bool UpdateLienHe(LienHeModel sualienhe);
        bool DeleteLienHe(int ma);
       
    }
}
