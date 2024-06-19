using BLL;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Model;
using static System.Runtime.InteropServices.JavaScript.JSType;

namespace ShopThoiTrang.Controllers
{
    [Authorize(Roles = "Admin,Nhân viên")]
    [Route("api/[controller]")]
    [ApiController]
    public class ThongSoController : ControllerBase
    {
        private IThongSoBus _thongsoBus;
        public ThongSoController(IThongSoBus thongsoBus)
        {
            _thongsoBus = thongsoBus;
        }
        [Route("getthongsobysanpham/{ma}")]
        [HttpGet]
        public IActionResult GetThongSoTheoSanPham(int ma)
        {
            try
            {
                var data = _thongsoBus.GetThongSoTheoSanPham(ma);
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
        [Route("get-all")]
        [HttpGet]
        public IEnumerable<ThongSoModel> GetALL()
        {
            return _thongsoBus.GetALL();
        }
        [Route("them")]
        [HttpPost]
        public IActionResult Create([FromBody] ThongSoModel them)
        {
            try
            {
                _thongsoBus.Create(them);
                return Ok(new { message = "Đã thêm thành công", results = true, status = 200 });
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Đã xảy ra lỗi:" + ex.Message);
            }
        }
        [Route("update")]
        [HttpPut]
        public IActionResult Update([FromBody] ThongSoModel sua)
        {
            try
            {
                _thongsoBus.Update(sua);
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
            return _thongsoBus.Delete(ma);
        }
    }


}