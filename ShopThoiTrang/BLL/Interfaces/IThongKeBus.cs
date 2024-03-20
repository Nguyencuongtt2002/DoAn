using Model;

namespace BLL
{
    public interface IThongKeBus
    {
        List<ThongKeModel> ThongKe_doanhthutheothang();
        List<ThongKeModel> ThongKe_sanphambanchay();
        List<ThongKeModel> ThongKe_doanhthutheonam();
        List<ThongKeModel> ThongKe_nguoidungmuanhieu();
        ThongKeModel ThongKe_tongsoluong();
    }
}