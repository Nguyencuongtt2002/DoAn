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
    public class SizeBus : ISizeBus
    {
        private ISizeDAL _res;
        public SizeBus(ISizeDAL res)
        {
            _res = res;
        }
        public List<SizeModel> GetALL()
        {
            return _res.GetALL();
        }
        public bool Create(SizeModel them)
        {
            return _res.Create(them);
        }
        public bool Update(SizeModel sua)
        {
            return _res.Update(sua);
        }
        public bool Delete(int ma)
        {
            return _res.Delete(ma);
        }
    }
}