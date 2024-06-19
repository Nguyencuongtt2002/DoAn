using BLL;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Model;

namespace ShopThoiTrang.Controllers
{
    [Authorize(Roles = "Admin,Nhân viên")]
    [Route("api/[controller]")]
    [ApiController]
    public class ThamSoController : ControllerBase
    {
        private IThamSoBus _Bus;
        private string _path;
        public ThamSoController(IThamSoBus Bus, IConfiguration configuration)
        {
            _Bus = Bus;
            _path = configuration["AppSettings:PATH_THAMSO"];
        }
        [Route("getbyid/{ma}")]
        [HttpGet]
        public ThamSoModel GetTheoMa(int ma)
        {
            return _Bus.GetTheoMa(ma);
        }
        [AllowAnonymous]
        [Route("getbykyhieu/{kyhieu}")]
        [HttpGet]
        public ThamSoModel GetTheoKyHieu(string kyhieu)
        {
            return _Bus.GetTheoKyHieu(kyhieu);
        }
        [AllowAnonymous]
        [Route("get-all")]
        [HttpGet]
        public IEnumerable<ThamSoModel> GetALL()
        {
            return _Bus.GetALL();
        }
        [Route("them")]
        [HttpPost]
        public IActionResult Create([FromForm] ThamSoModel model)
        {
            try
            {
                if (model.File != null && model.File.Length > 0) // Kiểm tra xem người dùng đã tải lên tệp không
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
                    // Tạo đối tượng Model mới với các thông tin
                    var Model = new ThamSoModel
                    {
                        TenThamSo = model.TenThamSo,
                        KyHieu = model.KyHieu,
                        NoiDung = model.NoiDung, // Nội dung
                        Anh = System.IO.File.ReadAllBytes(filePath), // Đường dẫn tương đối của ảnh
                    };

                    _Bus.Create(Model);
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
                    // Nếu không có tệp ảnh được tải lên, gán giá trị cho Anh là mảng byte rỗng
                    var Model = new ThamSoModel
                    {
                        TenThamSo = model.TenThamSo,
                        KyHieu = model.KyHieu,
                        NoiDung = model.NoiDung, // Nội dung
                        Anh = new byte[0], // Mảng byte rỗng
                    };

                    _Bus.Create(Model);

                    return Ok(new { success = true, message = "Tạo mới thành công" });
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
        public IActionResult Update([FromForm] ThamSoModel model)
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

                    model.Anh = System.IO.File.ReadAllBytes(filePath);
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

                _Bus.Update(model);

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
                var model = _Bus.GetTheoMa(ma);

                if (model == null)
                {
                    return NotFound(new { success = false, message = "Tin tức không tồn tại" });
                }

                bool result = _Bus.Delete(ma);

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