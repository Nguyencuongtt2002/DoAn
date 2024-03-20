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
    public class TinTucBus : ITinTucBus
    {
        private ITinTucDAL _res;
        public TinTucBus(ITinTucDAL res)
        {
            _res = res;
        }
        public TinTucModel GetTheoMa(int ma)
        {
            return _res.GetTheoMa(ma);
        }
        public List<TinTucModel> GetALL(int? pageIndex, int? pageSize, out int total)
        {
            return _res.GetALL(pageIndex, pageSize, out total);
        }
        public List<TinTucModel> GetTinTucKhac(int ma)
        {
            return _res.GetTinTucKhac(ma);
        }
        public bool Create(TinTucModel them)
        {
            return _res.Create(them);
        }
        public bool Update(TinTucModel sua)
        {
            return _res.Update(sua);
        }
        public bool Delete(int ma)
        {
            return _res.Delete(ma);
        }
    }
}