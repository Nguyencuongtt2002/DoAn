using BLL;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Model;

namespace ShopThoiTrang.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class TinTucController : ControllerBase
    {
        private ITinTucBus _tintucBus;
        private string _path;
        public TinTucController(ITinTucBus tintucBus, IConfiguration configuration)
        {
            _tintucBus = tintucBus;
            _path = configuration["AppSettings:PATH_TinTuc"];
        }
        [AllowAnonymous]
        [Route("getbyid/{ma}")]
        [HttpGet]
        public TinTucModel GetTheoMa(int ma)
        {
            return _tintucBus.GetTheoMa(ma);
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

                int total = 0;
                var data = _tintucBus.GetALL(page, pageSize, out total);

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
        [Route("gettintuckhac/{ma}")]
        [HttpGet]
        public IActionResult GetTinTucKhac(int ma)
        {
            try
            {
                var data = _tintucBus.GetTinTucKhac(ma);
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
        [Route("them")]
        [HttpPost]
        public IActionResult Create([FromForm] TinTucModel model)
        {
            try
            {
                if (model.File != null && model.File.Length > 0)
                {
                    if (model.File.Length > 5 * 1024 * 1024) // Kiểm tra kích thước tệp, 5MB
                    {
                        return BadRequest(new { success = false, message = "Kích thước tệp ảnh không được vượt quá 5MB." });
                    }

                    // Tạo tên file duy nhất bằng cách kết hợp GUID và tên file gốc
                    string uniqueFileName = Guid.NewGuid().ToString() + "_" + model.File.FileName;

                    // Kết hợp đường dẫn thư mục lưu trữ ảnh và tên file duy nhất để tạo đường dẫn đầy đủ
                    string filePath = Path.Combine(_path, uniqueFileName);

                    // Lưu file ảnh vào thư mục được chỉ định
                    using (var stream = new FileStream(filePath, FileMode.Create))
                    {
                        model.File.CopyTo(stream); // Copy dữ liệu file vào stream
                    }

                    var Model = new TinTucModel
                    {
                        TieuDe = model.TieuDe,
                        NoiDung = model.NoiDung, // Nội dung
                        AnhTinTuc = System.IO.File.ReadAllBytes(filePath), // Đường dẫn tương đối của ảnh
                        MaNguoiDung = model?.MaNguoiDung
                    };

                    _tintucBus.Create(Model);
                    // Xoá file ảnh theo tên từ thư mục lưu trữ
                    if (!string.IsNullOrEmpty(uniqueFileName))
                    {
                        string filePathDelete = Path.Combine(_path, uniqueFileName);
                        if (System.IO.File.Exists(filePathDelete))
                        {
                            System.IO.File.Delete(filePathDelete);
                        }
                    }
                    return Ok(new { success = true, message = "Tạo mới thành công" });
                }
                else
                {
                    return BadRequest(new { success = false, message = "Vui lòng chọn một tệp ảnh." });
                }

                
            }
            catch (Exception ex)
            {
                // Nếu có lỗi xảy ra, trả về mã lỗi 500 và thông báo lỗi
                return StatusCode(500, new { success = false, message = "Đã xảy ra lỗi: " + ex.Message });
            }
        }
        [Route("update")]
        [HttpPut]
        public IActionResult Update([FromForm] TinTucModel model)
        {
            try
            {
                // Kiểm tra xem người dùng có tải lên một ảnh mới không
                if (model.File != null && model.File.Length > 0)
                {
                    if (model.File.Length > 5 * 1024 * 1024) // Kiểm tra kích thước tệp, 5MB
                    {
                        return BadRequest(new { success = false, message = "Kích thước tệp ảnh không được vượt quá 5MB." });
                    }

                    // Tạo tên file duy nhất bằng cách kết hợp GUID và tên file gốc
                    string uniqueFileName = Guid.NewGuid().ToString() + "_" + model.File.FileName;

                    // Kết hợp đường dẫn thư mục lưu trữ ảnh và tên file duy nhất để tạo đường dẫn đầy đủ
                    string filePath = Path.Combine(_path, uniqueFileName);

                    // Lưu file ảnh vào thư mục được chỉ định
                    using (var stream = new FileStream(filePath, FileMode.Create))
                    {
                        model.File.CopyTo(stream); // Copy dữ liệu file vào stream
                    }

                    model.AnhTinTuc = System.IO.File.ReadAllBytes(filePath);
                    // Xoá file ảnh theo tên từ thư mục lưu trữ
                    if (!string.IsNullOrEmpty(uniqueFileName))
                    {
                        string filePathDelete = Path.Combine(_path, uniqueFileName);
                        if (System.IO.File.Exists(filePathDelete))
                        {
                            System.IO.File.Delete(filePathDelete);
                        }
                    }
                }

                _tintucBus.Update(model);

                return Ok(new { success = true, message = "Cập nhật thành công" });
                
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { success = false, message = "Đã xảy ra lỗi: " + ex.Message });
            }
        }
        [Route("xoa/{ma}")]
        [HttpDelete]
        public IActionResult Xoa(int ma)
        {
            try
            {
                // Lấy thông tin từ cơ sở dữ liệu
                var model = _tintucBus.GetTheoMa(ma);

                if (model == null)
                {
                    return NotFound(new { success = false, message = "Tin tức không tồn tại" });
                }
                bool result = _tintucBus.Delete(ma);

                if (result)
                {
                    return Ok(new { success = true, message = "Xóa thành công" });
                }
                else
                {
                    return NotFound(new { success = false, message = "Không thể xoá" });
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { success = false, message = "Đã xảy ra lỗi: " + ex.Message });
            }
        }


    }


}