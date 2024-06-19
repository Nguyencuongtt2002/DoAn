using BLL;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Model;

namespace ShopThoiTrang.Controllers
{
    [Authorize(Roles = "Admin,Nhân viên")]
    [Route("api/[controller]")]
    [ApiController]
    public class MenuController : ControllerBase
    {
        private IMenuBus _menuBus;
        public MenuController(IMenuBus menuBus)
        {
            _menuBus = menuBus;
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
                string TenMenu = "";

                if (formData.Keys.Contains("tenMenu") && !string.IsNullOrEmpty(Convert.ToString(formData["tenMenu"])))
                {
                    TenMenu = Convert.ToString(formData["tenMenu"].ToString());
                }

                int total = 0;
                var data = _menuBus.GetALLMenu(page, pageSize, out total,TenMenu);

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
        [AllowAnonymous]
        [Route("get-all-admin")]
        [HttpGet]
        public IActionResult GetAll(int page, int pageSize, string tenMenu = "")
        {
            try
            {
                int total = 0;
                var data = _menuBus.GetALLMenu(page, pageSize, out total, tenMenu);

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
        public IActionResult Create([FromBody] MenuModel them)
        {
            try
            {
                _menuBus.Create(them);
                return Ok(new { message = "Đã thêm thành công", results = true, status = 200 });
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Đã xảy ra lỗi:" + ex.Message);
            }
        }
        [Route("update")]
        [HttpPut]
        public IActionResult Update([FromBody] MenuModel sua)
        {
            try
            {
                _menuBus.Update(sua);
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
            return _menuBus.Delete(ma);
        }
    }


}