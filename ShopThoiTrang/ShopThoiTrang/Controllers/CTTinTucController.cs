using BLL;
using Microsoft.AspNetCore.Mvc;
using Model;

namespace ShopThoiTrang.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CTTinTucController : ControllerBase
    {
        private ICTTinTucBus _cttintucBus;
        public CTTinTucController(ICTTinTucBus cttintucBus)
        {
            _cttintucBus = cttintucBus;
        }
        [Route("get-all")]
        [HttpGet]
        public IEnumerable<CTTinTucModel> GetALL()
        {
            return _cttintucBus.GetALL();
        }
        [Route("them")]
        [HttpPost]
        public IActionResult Create([FromBody] CTTinTucModel them)
        {
            try
            {
                _cttintucBus.Create(them);
                return Ok(new { message = "Đã thêm thành công", results = true, status = 200 });
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Đã xảy ra lỗi:" + ex.Message);
            }
        }
        [Route("update")]
        [HttpPut]
        public IActionResult Update([FromBody] CTTinTucModel sua)
        {
            try
            {
                _cttintucBus.Update(sua);
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
            return _cttintucBus.Delete(ma);
        }
        [Route("getctkhobykho/{ma}")]
        [HttpGet]
        public IActionResult GetCTTinTucTheoTinTuc(int ma)
        {
            try
            {
                var data = _cttintucBus.GetCTTinTucTheoTinTuc(ma);
                if (data != null)
                {
                    return Ok(new
                    {
                        success = true,
                        message = "Lấy dữ liệu thành công",
                        data = data
                    });
                }
                else
                {
                    return NotFound(new
                    {
                        success = false,
                        message = "Không tìm thấy dữ liệu"
                    });
                }
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new
                {
                    success = false,
                    message = $"Lỗi: {ex.Message}"
                });
            }
        }
    }


}