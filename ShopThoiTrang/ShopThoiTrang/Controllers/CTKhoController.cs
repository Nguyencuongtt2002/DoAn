using BLL;
using Microsoft.AspNetCore.Mvc;
using Model;

namespace ShopThoiTrang.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CTKhoController : ControllerBase
    {
        private ICTKhoBus _ctkhoBus;
        public CTKhoController(ICTKhoBus ctkhoBus)
        {
            _ctkhoBus = ctkhoBus;
        }
        [Route("get-all")]
        [HttpGet]
        public IEnumerable<CTKhoModel> GetALL()
        {
            return _ctkhoBus.GetALL();
        }
        [Route("them")]
        [HttpPost]
        public IActionResult Create([FromBody] CTKhoModel them)
        {
            try
            {
                _ctkhoBus.Create(them);
                return Ok(new { message = "Đã thêm thành công", results = true, status = 200 });
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Đã xảy ra lỗi:" + ex.Message);
            }
        }
        [Route("update")]
        [HttpPut]
        public IActionResult Update([FromBody] CTKhoModel sua)
        {
            try
            {
                _ctkhoBus.Update(sua);
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
            return _ctkhoBus.Delete(ma);
        }
        [Route("getctkhobykho/{ma}")]
        [HttpGet]
        public IActionResult GetCTKhoTheoKho(int ma)
        {
            try
            {
                var data = _ctkhoBus.GetCTKhoTheoKho(ma);
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