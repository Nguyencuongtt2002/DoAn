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
    public class NhaCungCapBus : INhaCungCapBus
    {
        private INhaCungCapDAL _res;
        public NhaCungCapBus(INhaCungCapDAL res)
        {
            _res = res;
        }
        public List<NhaCungCapModel> GetALL()
        {
            return _res.GetALL();
        }
        public bool Create(NhaCungCapModel them)
        {
            return _res.Create(them);
        }
        public bool Update(NhaCungCapModel sua)
        {
            return _res.Update(sua);
        }
        public bool Delete(int ma)
        {
            return _res.Delete(ma);
        }
    }
}