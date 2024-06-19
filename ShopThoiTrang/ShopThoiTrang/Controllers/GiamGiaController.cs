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
    public class GiamGiaController : ControllerBase
    {
        private IGiamGiaBus _giamgiaBus;
        public GiamGiaController(IGiamGiaBus giamgiaBus)
        {
            _giamgiaBus = giamgiaBus;
        }
        [Route("getgiamgiabysanpham/{ma}")]
        [HttpGet]
        public IActionResult GetGiamGiaTheoSanPham(int ma)
        {
            try
            {
                var data = _giamgiaBus.GetGiamGiaTheoSanPham(ma);
                return Ok(new
                {
                    success = true,
                    message = "Lấy dữ liệu thành công",
                    data = data
                });
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
        [HttpPost]
        public IActionResult GetAll([FromBody] Dictionary<string, object> formData)
        {
            try
            {
                var page = int.Parse(formData["page"].ToString());
                var pageSize = int.Parse(formData["pageSize"].ToString());
                int total = 0;
                var data = _giamgiaBus.GetALL(page, pageSize, out total);

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
        public IActionResult Create([FromBody] GiamGiaModel them)
        {
            try
            {
                _giamgiaBus.Create(them);
                return Ok(new { message = "Đã thêm thành công", results = true, status = 200 });
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Đã xảy ra lỗi:" + ex.Message);
            }
        }
        [Route("update")]
        [HttpPut]
        public IActionResult Update([FromBody] GiamGiaModel sua)
        {
            try
            {
                _giamgiaBus.Update(sua);
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
            return _giamgiaBus.Delete(ma);
        }
    }


}