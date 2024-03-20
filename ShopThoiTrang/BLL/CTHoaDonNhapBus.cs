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
    public class CTHoaDonNhapBus : ICTHoaDonNhapBus
    {
        private ICTHoaDonNhapDAL _res;
        public CTHoaDonNhapBus(ICTHoaDonNhapDAL res)
        {
            _res = res;
        }
        public CTHoaDonNhapModel GetTheoMa(int ma)
        {
            return _res.GetTheoMa(ma);
        }
        public List<CTHoaDonNhapModel> GetALL()
        {
            return _res.GetALL();
        }
        public bool Create(CTHoaDonNhapModel them)
        {
            return _res.Create(them);
        }
        public bool Update(CTHoaDonNhapModel sua)
        {
            return _res.Update(sua);
        }
        public bool Delete(int ma)
        {
            return _res.Delete(ma);
        }
        public List<CTHoaDonNhapModel> GetCTHDNTheoHDN(int ma)
        {
            return _res.GetCTHDNTheoHDN(ma);
        }
    }
}