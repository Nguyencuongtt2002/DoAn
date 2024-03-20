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
    public class HoaDonNhapBus : IHoaDonNhapBus
    {
        private IHoaDonNhapDAL _res;
        public HoaDonNhapBus(IHoaDonNhapDAL res)
        {
            _res = res;
        }
        public HoaDonNhapModel GetTheoMa(int ma)
        {
            return _res.GetTheoMa(ma);
        }
        public HoaDonNhapModel GetNew()
        {
            return _res.GetNew();
        }
        public List<HoaDonNhapModel> GetALL(int? pageIndex, int? pageSize, out int total)
        {
            return _res.GetALL(pageIndex, pageSize, out total);
        }
        public bool Create(HoaDonNhapModel them)
        {
            return _res.Create(them);
        }
        public bool Update(HoaDonNhapModel sua)
        {
            return _res.Update(sua);
        }
        public bool Delete(int ma)
        {
            return _res.Delete(ma);
        }
        public List<LienHeModel> ThongTinLienHe()
        {
            return _res.ThongTinLienHe();
        }
    }
}