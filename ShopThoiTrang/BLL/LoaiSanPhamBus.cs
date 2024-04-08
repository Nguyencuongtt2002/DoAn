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
    public class LoaiSanPhamBus : ILoaiSanPhamBus
    {
        private ILoaiSanPhamDAL _res;
        public LoaiSanPhamBus(ILoaiSanPhamDAL res)
        {
            _res = res;
        }
        public List<LoaiSanPhamModel> GetALL(int? pageIndex, int? pageSize, out int total, string? TenLoaiSanPham)
        {
            return _res.GetALL(pageIndex, pageSize, out total,TenLoaiSanPham);
        }
        public bool Create(LoaiSanPhamModel them)
        {
            return _res.Create(them);
        }
        public bool Update(LoaiSanPhamModel sua)
        {
            return _res.Update(sua);
        }
        public bool Delete(int ma)
        {
            return _res.Delete(ma);
        }
    }
}