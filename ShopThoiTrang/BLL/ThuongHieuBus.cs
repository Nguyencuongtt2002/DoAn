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
    public class ThuongHieuBus : IThuongHieuBus
    {
        private IThuongHieuDAL _res;
        public ThuongHieuBus(IThuongHieuDAL res)
        {
            _res = res;
        }
        public List<ThuongHieuModel> GetALL()
        {
            return _res.GetALL();
        }
        public bool Create(ThuongHieuModel them)
        {
            return _res.Create(them);
        }
        public bool Update(ThuongHieuModel sua)
        {
            return _res.Update(sua);
        }
        public bool Delete(int ma)
        {
            return _res.Delete(ma);
        }
    }
}