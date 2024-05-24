using BLL;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Model;

namespace ShopThoiTrang.Controllers
{
    [Authorize(Roles = "Admin")]
    [Route("api/[controller]")]
    [ApiController]
    public class ThuongHieuController : ControllerBase
    {
        private IThuongHieuBus _thuonghieuBus;
        public ThuongHieuController(IThuongHieuBus thuonghieuBus)
        {
            _thuonghieuBus = thuonghieuBus;
        }
        [AllowAnonymous]
        [Route("get-all")]
        [HttpGet]
        public IEnumerable<ThuongHieuModel> GetALL()
        {
            return _thuonghieuBus.GetALL();
        }
        [Route("them")]
        [HttpPost]
        public IActionResult Create([FromBody] ThuongHieuModel them)
        {
            try
            {
                _thuonghieuBus.Create(them);
                return Ok(new { message = "Đã thêm thành công", results = true, status = 200 });
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Đã xảy ra lỗi:" + ex.Message);
            }
        }
        [Route("update")]
        [HttpPut]
        public IActionResult Update([FromBody] ThuongHieuModel sua)
        {
            try
            {
                _thuonghieuBus.Update(sua);
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
            return _thuonghieuBus.Delete(ma);
        }
    }


}