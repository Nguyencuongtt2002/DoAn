using DAL;
using Model;
using System;
using System.Collections.Generic;
using System.Drawing;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;

namespace BLL
{
    public class KhoBus : IKhoBus
    {
        private IKhoDAL _res;
        public KhoBus(IKhoDAL res)
        {
            _res = res;
        }
        public KhoModel GetTheoMa(int ma)
        {
            return _res.GetTheoMa(ma);
        }
        public List<KhoModel> GetALL(int? pageIndex, int? pageSize, out int total)
        {
            return _res.GetALL(pageIndex, pageSize, out total);
        }
        public bool Create(KhoModel them)
        {
            return _res.Create(them);
        }
        public bool Update(KhoModel sua)
        {
            return _res.Update(sua);
        }
        public bool Delete(int ma)
        {
            return _res.Delete(ma);
        }
    }
}