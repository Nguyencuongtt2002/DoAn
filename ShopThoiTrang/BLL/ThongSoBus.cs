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
    public class ThongSoBus : IThongSoBus
    {
        private IThongSoDAL _res;
        public ThongSoBus(IThongSoDAL res)
        {
            _res = res;
        }
        public List<ThongSoModel> GetThongSoTheoSanPham(int MaSanPham)
        {
            return _res.GetThongSoTheoSanPham(MaSanPham);
        }
        public List<ThongSoModel> GetALL()
        {
            return _res.GetALL();
        }

        public bool Create(ThongSoModel them)
        {
            return _res.Create(them);
        }
        public bool Update(ThongSoModel sua)
        {
            return _res.Update(sua);
        }
        public bool Delete(int ma)
        {
            return _res.Delete(ma);
        }
    }
}