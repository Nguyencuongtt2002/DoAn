using BLL;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Model;

namespace ShopThoiTrang.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class GioiThieuController : ControllerBase
    {
        private IGioiThieuBus _gioithieuBus;
        private string _path;
        public GioiThieuController(IGioiThieuBus gioithieuBus, IConfiguration configuration)
        {
            _gioithieuBus = gioithieuBus;
            _path = configuration["AppSettings:PATH_GIOITHIEU"];
        }
        [Route("getbyid/{ma}")]
        [HttpGet]
        public GioiThieuModel GetTheoMa(int ma)
        {
            return _gioithieuBus.GetTheoMa(ma);
        }
        [AllowAnonymous]
        [Route("get-all")]
        [HttpGet]
        public IEnumerable<GioiThieuModel> GetALL()
        {
            return _gioithieuBus.GetALL();
        }
        [Route("them")]
        [HttpPost]
        public IActionResult Create([FromForm] GioiThieuModel model)
        {
            try
            {
                // Khởi tạo biến imagePath
                string imagePath = null;

                // Kiểm tra xem có dữ liệu file ảnh được gửi lên không và có dung lượng lớn hơn 0 không
                if (model.File != null && model.File.Length > 0)
                {
                    // Tạo tên file duy nhất bằng cách kết hợp GUID và tên file gốc
                    string uniqueFileName = Guid.NewGuid().ToString() + "_" + model.File.FileName;

                    // Kết hợp đường dẫn thư mục lưu trữ ảnh và tên file duy nhất để tạo đường dẫn đầy đủ
                    string filePath = Path.Combine(_path, uniqueFileName);

                    // Lưu file ảnh vào thư mục được chỉ định
                    using (var stream = new FileStream(filePath, FileMode.Create))
                    {
                        model.File.CopyTo(stream); // Copy dữ liệu file vào stream
                    }

                    // Tạo đường dẫn tương đối của ảnh từ thư mục gốc
                    imagePath = uniqueFileName;
                }

                // Tạo đối tượng Model mới với các thông tin
                var Model = new GioiThieuModel
                {
                    TieuDe= model.TieuDe,
                    NoiDung = model.NoiDung, // Nội dung
                    HinhAnh = imagePath, // Đường dẫn tương đối của ảnh
                };

                // Gọi phương thức Create từ BLL để thêm mới vào cơ sở dữ liệu
                _gioithieuBus.Create(Model);

                // Trả về kết quả thành công
                return Ok(new { success = true, message = "Tạo mới thành công" });
            }
            catch (Exception ex)
            {
                // Nếu có lỗi xảy ra, trả về mã lỗi 500 và thông báo lỗi
                return StatusCode(500, new { success = false, message = "Đã xảy ra lỗi: " + ex.Message });
            }
        }
        [Route("update")]
        [HttpPut]
        public IActionResult Update([FromForm] GioiThieuModel model)
        {
            try
            {
                // Kiểm tra xem người dùng có tải lên một ảnh mới không
                if (Request.Form.Files.Count > 0)
                {
                    // Lấy file ảnh từ yêu cầu
                    var uploadedFile = Request.Form.Files[0];
                    // Tạo tên file duy nhất cho ảnh mới
                    string uniqueFileName = Guid.NewGuid().ToString() + "_" + uploadedFile.FileName;
                    // Kết hợp đường dẫn thư mục lưu trữ ảnh và tên file duy nhất để tạo đường dẫn đầy đủ
                    string filePath = Path.Combine(_path, uniqueFileName);

                    var Model = _gioithieuBus.GetTheoMa(model.MaGioiThieu);

                    // Xoá file ảnh cũ nếu có
                    if (!string.IsNullOrEmpty(Model.HinhAnh))
                    {
                        string oldFilePath = Path.Combine(_path, Model.HinhAnh);
                        if (System.IO.File.Exists(oldFilePath))
                        {
                            System.IO.File.Delete(oldFilePath);
                        }
                    }

                    // Lưu ảnh mới vào thư mục được chỉ định
                    using (var stream = new FileStream(filePath, FileMode.Create))
                    {
                        uploadedFile.CopyTo(stream);
                    }

                    // Cập nhật đường dẫn ảnh mới vào đối tượng Model
                    model.HinhAnh = uniqueFileName;
                }

                // Gọi phương thức cập nhật từ BLL với thông tin mới
                _gioithieuBus.Update(model);

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
                var model = _gioithieuBus.GetTheoMa(ma);

                if (model == null)
                {
                    return NotFound(new { success = false, message = "Giới thiệu không tồn tại" });
                }

                // Xoá file ảnh từ thư mục lưu trữ
                if (!string.IsNullOrEmpty(model.HinhAnh))
                {
                    string filePath = Path.Combine(_path, model.HinhAnh);
                    if (System.IO.File.Exists(filePath))
                    {
                        System.IO.File.Delete(filePath);
                    }
                }

                // Xoá từ cơ sở dữ liệu
                bool result = _gioithieuBus.Delete(ma);

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