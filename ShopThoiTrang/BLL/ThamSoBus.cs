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
    public class ThamSoBus : IThamSoBus
    {
        private IThamSoDAL _res;
        public ThamSoBus(IThamSoDAL res)
        {
            _res = res;
        }
        public ThamSoModel GetTheoMa(int ma)
        {
            return _res.GetTheoMa(ma);
        }
        public ThamSoModel GetTheoKyHieu(string kyhieu)
        {
            return _res.GetTheoKyHieu(kyhieu);
        }
        public List<ThamSoModel> GetALL()
        {
            return _res.GetALL();
        }
        public bool Create(ThamSoModel them)
        {
            return _res.Create(them);
        }
        public bool Update(ThamSoModel sua)
        {
            return _res.Update(sua);
        }
        public bool Delete(int ma)
        {
            return _res.Delete(ma);
        }
    }
}