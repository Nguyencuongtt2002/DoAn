using BLL;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Model;

namespace ShopThoiTrang.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class HoaDonNhapController : ControllerBase
    {
        private IHoaDonNhapBus _Bus;
        public HoaDonNhapController(IHoaDonNhapBus Bus)
        {
            _Bus = Bus;
        }
        [Route("getbyid/{ma}")]
        [HttpGet]
        public HoaDonNhapModel GetTheoMa(int ma)
        {
            return _Bus.GetTheoMa(ma);
        }
        [Route("getnew")]
        [HttpGet]
        public HoaDonNhapModel GetNew()
        {
            return _Bus.GetNew();
        }
        [Route("get-all")]
        [HttpPost]
        public IActionResult GetAll([FromBody] Dictionary<string, object> formData)
        {
            try
            {
                var page = int.Parse(formData["page"].ToString());
                var pageSize = int.Parse(formData["pageSize"].ToString());


                int total = 0;
                var data = _Bus.GetALL(page, pageSize, out total);

                var response = new
                {
                    success = true,
                    message = "Lấy dữ liệu thành công",
                    totalItems = total,
                    page = page,
                    pageSize = pageSize,
                    data = data
                };

                return Ok(response);
            }
            catch (Exception ex)
            {
                return BadRequest(new { success = false, message = ex.Message });
            }
        }

        [Route("them")]
        [HttpPost]
        public IActionResult Create([FromBody] HoaDonNhapModel them)
        {
            try
            {
                _Bus.Create(them);
                return Ok(new { message = "Đã thêm thành công", results = true, status = 200 });
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Đã xảy ra lỗi:" + ex.Message);
            }
        }
        [Route("update")]
        [HttpPut]
        public IActionResult Update([FromBody] HoaDonNhapModel sua)
        {
            try
            {
                _Bus.Update(sua);
                return Ok(new { message = "Đã cập nhật thành công", results = true });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = ex.Message, results = false });
            }
        }
        [Route("xoa/{ma}")]
        [HttpDelete]
        public bool Xoa(int ma)
        {
            return _Bus.Delete(ma);
        }
    }


}