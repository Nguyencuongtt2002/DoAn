using BLL;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Model;

namespace ShopThoiTrang.Controllers
{
    [Authorize(Roles = "Admin,Nhân viên")]
    [Route("api/[controller]")]
    [ApiController]
    public class SizeController : ControllerBase
    {
        private ISizeBus _sizeBus;
        public SizeController(ISizeBus sizeBus)
        {
            _sizeBus = sizeBus;
        }
        [Route("get-all")]
        [HttpGet]
        public IEnumerable<SizeModel> GetALL()
        {
            return _sizeBus.GetALL();
        }
        [Route("them")]
        [HttpPost]
        public IActionResult Create([FromBody] SizeModel them)
        {
            try
            {
                _sizeBus.Create(them);
                return Ok(new { message = "Đã thêm thành công", results = true, status = 200 });
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Đã xảy ra lỗi:" + ex.Message);
            }
        }
        [Route("update")]
        [HttpPut]
        public IActionResult Update([FromBody] SizeModel sua)
        {
            try
            {
                _sizeBus.Update(sua);
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
            return _sizeBus.Delete(ma);
        }
    }


}