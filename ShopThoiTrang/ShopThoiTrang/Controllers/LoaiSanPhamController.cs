using BLL;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Model;

namespace ShopThoiTrang.Controllers
{
    [Authorize(Roles = "Admin")]
    [Route("api/[controller]")]
    [ApiController]
    public class LoaiSanPhamController : ControllerBase
    {
        private ILoaiSanPhamBus _loaisanphamBus;
        public LoaiSanPhamController(ILoaiSanPhamBus loaisanphamBus)
        {
            _loaisanphamBus = loaisanphamBus;
        }
        [AllowAnonymous]
        [Route("get-all")]
        [HttpGet]
        public IEnumerable<LoaiSanPhamModel> GetALL()
        {
            return _loaisanphamBus.GetALL();
        }
        [Route("them")]
        [HttpPost]
        public IActionResult Create([FromBody] LoaiSanPhamModel them)
        {
            try
            {
                _loaisanphamBus.Create(them);
                return Ok(new { message = "Đã thêm thành công", results = true, status = 200 });
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Đã xảy ra lỗi:" + ex.Message);
            }
        }
        [Route("update")]
        [HttpPut]
        public IActionResult Update([FromBody] LoaiSanPhamModel sua)
        {
            try
            {
                _loaisanphamBus.Update(sua);
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
            return _loaisanphamBus.Delete(ma);
        }
    }


}