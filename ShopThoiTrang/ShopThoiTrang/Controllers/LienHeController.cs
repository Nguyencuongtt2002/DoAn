using BLL;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Model;

namespace ShopThoiTrang.Controllers
{
    [Authorize(Roles = "Admin")]
    [Route("api/[controller]")]
    [ApiController]
    public class LienHeController : ControllerBase
    {
        private ILienHeBus _lienheBus;
        public LienHeController(ILienHeBus lienheBus)
        {
            _lienheBus = lienheBus;
        }
        [AllowAnonymous]
        [Route("get-all")]
        [HttpPost]
        public IActionResult GetAll([FromBody] Dictionary<string, object> formData)
        {
            try
            {
                var page = int.Parse(formData["page"].ToString());
                var pageSize = int.Parse(formData["pageSize"].ToString());
                string Email = "";

                if (formData.Keys.Contains("email") && !string.IsNullOrEmpty(Convert.ToString(formData["email"])))
                {
                    Email = Convert.ToString(formData["email"].ToString());
                }
                string SoDienThoai = "";

                if (formData.Keys.Contains("soDienThoai") && !string.IsNullOrEmpty(Convert.ToString(formData["soDienThoai"])))
                {
                    SoDienThoai = Convert.ToString(formData["soDienThoai"].ToString());
                }

                int total = 0;
                var data = _lienheBus.GetALL(page, pageSize, out total, Email,SoDienThoai);

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
        public IActionResult CreateLienHe([FromBody] LienHeModel themlienhe)
        {
            try
            {
                _lienheBus.CreateLienHe(themlienhe);
                return Ok(new { message = "Đã thêm thành công", results = true, status = 200 });
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Đã xảy ra lỗi:" + ex.Message);
            }
        }
        [Route("update")]
        [HttpPut]
        public IActionResult UpdateLienHe([FromBody] LienHeModel sualienhe)
        {
            try
            {
                _lienheBus.UpdateLienHe(sualienhe);
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
            return _lienheBus.DeleteLienHe(ma);
        }
    }


}