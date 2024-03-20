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
    public class CTTinTucBus : ICTTinTucBus
    {
        private ICTTinTucDAL _res;
        public CTTinTucBus(ICTTinTucDAL res)
        {
            _res = res;
        }
        public CTTinTucModel GetTheoMa(int ma)
        {
            return _res.GetTheoMa(ma);
        }
        public List<CTTinTucModel> GetALL()
        {
            return _res.GetALL();
        }
        public bool Create(CTTinTucModel them)
        {
            return _res.Create(them);
        }
        public bool Update(CTTinTucModel sua)
        {
            return _res.Update(sua);
        }
        public bool Delete(int ma)
        {
            return _res.Delete(ma);
        }
        public List<CTTinTucModel> GetCTTinTucTheoTinTuc(int MaTinTuc)
        {
            return _res.GetCTTinTucTheoTinTuc(MaTinTuc);
        }
    }
}