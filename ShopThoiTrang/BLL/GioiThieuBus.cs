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
    public class GioiThieuBus : IGioiThieuBus
    {
        private IGioiThieuDAL _res;
        public GioiThieuBus(IGioiThieuDAL res)
        {
            _res = res;
        }
        public GioiThieuModel GetTheoMa(int ma)
        {
            return _res.GetTheoMa(ma);
        }
        public List<GioiThieuModel> GetALL()
        {
            return _res.GetALL();
        }
        public bool Create(GioiThieuModel them)
        {
            return _res.Create(them);
        }
        public bool Update(GioiThieuModel sua)
        {
            return _res.Update(sua);
        }
        public bool Delete(int ma)
        {
            return _res.Delete(ma);
        }
    }
}