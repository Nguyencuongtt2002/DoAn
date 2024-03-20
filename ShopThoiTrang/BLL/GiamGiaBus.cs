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
    public class GiamGiaBus : IGiamGiaBus
    {
        private IGiamGiaDAL _res;
        public GiamGiaBus(IGiamGiaDAL res)
        {
            _res = res;
        }
        public GiamGiaModel GetGiamGiaTheoSanPham(int MaSanPham)
        {
            return _res.GetGiamGiaTheoSanPham(MaSanPham);
        }
        public List<GiamGiaModel> GetALL(int? pageIndex, int? pageSize, out int total)
        {
            return _res.GetALL(pageIndex, pageSize, out total);
        }

        public bool Create(GiamGiaModel them)
        {
            return _res.Create(them);
        }
        public bool Update(GiamGiaModel sua)
        {
            return _res.Update(sua);
        }
        public bool Delete(int ma)
        {
            return _res.Delete(ma);
        }
    }
}