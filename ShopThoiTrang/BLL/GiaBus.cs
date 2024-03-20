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
    public class GiaBus : IGiaBus
    {
        private IGiaDAL _res;
        public GiaBus(IGiaDAL res)
        {
            _res = res;
        }
        public GiaModel GetGiaTheoSanPham(int MaSanPham)
        {
            return _res.GetGiaTheoSanPham(MaSanPham);
        }
        public List<GiaModel> GetALL(int? pageIndex, int? pageSize, out int total)
        {
            return _res.GetALL(pageIndex, pageSize, out total);
        }

        public bool Create(GiaModel them)
        {
            return _res.Create(them);
        }
        public bool Update(GiaModel sua)
        {
            return _res.Update(sua);
        }
        public bool Delete(int ma)
        {
            return _res.Delete(ma);
        }
    }
}