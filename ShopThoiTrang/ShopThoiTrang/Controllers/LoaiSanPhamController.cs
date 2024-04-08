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
        [HttpPost]
        public IActionResult GetAll([FromBody] Dictionary<string, object> formData)
        {
            try
            {
                var page = int.Parse(formData["page"].ToString());
                var pageSize = int.Parse(formData["pageSize"].ToString());
                string TenLoaiSanPham = "";

                if (formData.Keys.Contains("tenLoaiSanPham") && !string.IsNullOrEmpty(Convert.ToString(formData["tenLoaiSanPham"])))
                {
                    TenLoaiSanPham = Convert.ToString(formData["tenLoaiSanPham"].ToString());
                }

                int total = 0;
                var data = _loaisanphamBus.GetALL(page, pageSize, out total,TenLoaiSanPham);

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