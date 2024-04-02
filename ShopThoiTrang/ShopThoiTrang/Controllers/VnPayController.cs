using BLL;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Model;

namespace ShopThoiTrang.Controllers
{
    //[Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class VnPayController : ControllerBase
    {
        private IVnPayBus _bll;
        private IDonHangBus _blldonhang;
        public VnPayController(IVnPayBus bll, IDonHangBus blldonhang)
        {
            _bll = bll;
            _blldonhang = blldonhang;

        }

        [Route("vnpay")]
        [HttpPost]
        public IActionResult CreatePaymentUrl(PaymentInformationModel model)
        {
            try
            {
                var url = _bll.CreatePaymentUrl(model, HttpContext);
                return Ok(new { success = true, message = "Lấy Url thành công", data = url });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { success = false, message = "Đã xảy ra lỗi: " + ex.Message });
            }
        }

        [Route("callback")]
        [HttpGet]
        public IActionResult PaymentCallback()
        {
            try
            {
                var response = _bll.PaymentExecute(Request.Query);
                if(response.Success)
                {
                    DonHangModel model = new DonHangModel();
                    model.MaDonHang = int.Parse(response.OrderId);
                    model.TinhTrang = 4;
                    model.TrangThai = 4;
                    _blldonhang.CapNhatDonHang(model);
                }
                return Ok(response);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { success = false, message = "Đã xảy ra lỗi: " + ex.Message });
            }
        }
    }
}