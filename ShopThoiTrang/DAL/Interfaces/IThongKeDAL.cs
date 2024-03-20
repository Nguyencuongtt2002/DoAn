using Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL
{
    public partial interface IThongKeDAL
    {
        List<ThongKeModel> ThongKe_doanhthutheothang();
        List<ThongKeModel> ThongKe_sanphambanchay();
        List<ThongKeModel> ThongKe_doanhthutheonam();
        List<ThongKeModel> ThongKe_nguoidungmuanhieu();
        ThongKeModel ThongKe_tongsoluong();

    }
}
