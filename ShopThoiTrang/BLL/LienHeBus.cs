using DAL;
using Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;

namespace BLL
{
    public class LienHeBus : ILienHeBus
    {
        private ILienHeDAL _res;
        public LienHeBus(ILienHeDAL res)
        {
            _res = res;
        }
        public List<LienHeModel> GetALL(int? pageIndex, int? pageSize, out int total, string? Email, string? SoDienThoai)
        {
            return _res.GetALL(pageIndex, pageSize, out total, Email,SoDienThoai);
        }
        public bool CreateLienHe(LienHeModel themlienhe)
        {
            return _res.CreateLienHe(themlienhe);
        }
        public bool UpdateLienHe(LienHeModel sualienhe)
        {
            return _res.UpdateLienHe(sualienhe);
        }
        public bool DeleteLienHe(int ma)
        {
            return _res.DeleteLienHe(ma);
        }
    }
}