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
    public class ThongKeBus : IThongKeBus
    {
        private IThongKeDAL _res;
        public ThongKeBus(IThongKeDAL res)
        {
            _res = res;
        }
        public List<ThongKeModel> ThongKe_doanhthutheothang()
        {
            return _res.ThongKe_doanhthutheothang();
        }
        public List<ThongKeModel> ThongKe_sanphambanchay()
        {
            return _res.ThongKe_sanphambanchay();
        }
        public List<ThongKeModel> ThongKe_doanhthutheonam()
        {
            return _res.ThongKe_doanhthutheonam();
        }
        public List<ThongKeModel> ThongKe_nguoidungmuanhieu()
        {
            return _res.ThongKe_nguoidungmuanhieu();
        }
        public ThongKeModel ThongKe_tongsoluong()
        {
            return _res.ThongKe_tongsoluong();
        }
    }
}