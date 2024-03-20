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
    public class CTKhoBus : ICTKhoBus
    {
        private ICTKhoDAL _res;
        public CTKhoBus(ICTKhoDAL res)
        {
            _res = res;
        }
        public CTKhoModel GetTheoMa(int ma)
        {
            return _res.GetTheoMa(ma);
        }
        public List<CTKhoModel> GetALL()
        {
            return _res.GetALL();
        }
        public bool Create(CTKhoModel them)
        {
            return _res.Create(them);
        }
        public bool Update(CTKhoModel sua)
        {
            return _res.Update(sua);
        }
        public bool Delete(int ma)
        {
            return _res.Delete(ma);
        }
        public List<CTKhoModel> GetCTKhoTheoKho(int MaKho)
        {
            return _res.GetCTKhoTheoKho(MaKho);
        }
    }
}