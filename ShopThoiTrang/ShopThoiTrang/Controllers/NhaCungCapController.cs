using BLL;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Model;

namespace ShopThoiTrang.Controllers
{
    [Authorize(Roles = "Admin,Nhân viên")]
    [Route("api/[controller]")]
    [ApiController]
    public class NhaCungCapController : ControllerBase
    {
        private INhaCungCapBus _nhacungcapBus;
        public NhaCungCapController(INhaCungCapBus nhacungcapBus)
        {
            _nhacungcapBus = nhacungcapBus;
        }
        [Route("get-all")]
        [HttpGet]
        public IEnumerable<NhaCungCapModel> GetALL()
        {
            return _nhacungcapBus.GetALL();
        }
        [Route("them")]
        [HttpPost]
        public IActionResult Create([FromBody] NhaCungCapModel them)
        {
            try
            {
                _nhacungcapBus.Create(them);
                return Ok(new { message = "Đã thêm thành công", results = true, status = 200 });
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Đã xảy ra lỗi:" + ex.Message);
            }
        }
        [Route("update")]
        [HttpPut]
        public IActionResult Update([FromBody] NhaCungCapModel sua)
        {
            try
            {
                _nhacungcapBus.Update(sua);
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
            return _nhacungcapBus.Delete(ma);
        }
    }


}