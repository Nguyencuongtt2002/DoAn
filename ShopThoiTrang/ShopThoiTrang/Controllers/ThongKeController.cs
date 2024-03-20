using BLL;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Model;

namespace ShopThoiTrang.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class ThongKeController : ControllerBase
    {
        private IThongKeBus _thongkeBus;
        public ThongKeController(IThongKeBus thongkeBus)
        {
            _thongkeBus = thongkeBus;
        }
        [Route("doanhthutheothang")]
        [HttpGet]
        public IEnumerable<ThongKeModel> ThongKe_doanhthutheothang()
        {
            return _thongkeBus.ThongKe_doanhthutheothang();
        }
        [Route("sanphambanchay")]
        [HttpGet]
        public IEnumerable<ThongKeModel> ThongKe_sanphambanchay()
        {
            return _thongkeBus.ThongKe_sanphambanchay();
        }
        [Route("doanhthutheonam")]
        [HttpGet]
        public IEnumerable<ThongKeModel> ThongKe_doanhthutheonam()
        {
            return _thongkeBus.ThongKe_doanhthutheonam();
        }
        [Route("nguoidungmuanhieu")]
        [HttpGet]
        public IEnumerable<ThongKeModel> ThongKe_nguoidungmuanhieu()
        {
            return _thongkeBus.ThongKe_nguoidungmuanhieu();
        }
        [Route("tongsoluong")]
        [HttpGet]
        public ThongKeModel ThongKe_tongsoluong()
        {
            return _thongkeBus.ThongKe_tongsoluong();
        }
    }
        

}