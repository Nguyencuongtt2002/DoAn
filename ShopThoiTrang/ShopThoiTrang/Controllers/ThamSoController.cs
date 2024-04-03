using BLL;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Model;

namespace ShopThoiTrang.Controllers
{
    [Authorize]
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
                var Model = new ThamSoModel
                {
                    TenThamSo = model.TenThamSo,
                    KyHieu = model.KyHieu,
                    NoiDung = model.NoiDung, // Nội dung
                    Anh = imagePath, // Đường dẫn tương đối của ảnh
                };

                // Gọi phương thức Create từ BLL để thêm mới vào cơ sở dữ liệu
                _Bus.Create(Model);

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
        public IActionResult Update([FromForm] ThamSoModel model)
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

                    var Model = _Bus.GetTheoMa(model.MaThamSo);

                    // Xoá file ảnh cũ nếu có
                    if (!string.IsNullOrEmpty(Model.Anh))
                    {
                        string oldFilePath = Path.Combine(_path, Model.Anh);
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
                    model.Anh = uniqueFileName;
                }

                // Gọi phương thức cập nhật từ BLL với thông tin mới
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
                    return NotFound(new { success = false, message = "Giới thiệu không tồn tại" });
                }

                // Xoá file ảnh từ thư mục lưu trữ
                if (!string.IsNullOrEmpty(model.Anh))
                {
                    string filePath = Path.Combine(_path, model.Anh);
                    if (System.IO.File.Exists(filePath))
                    {
                        System.IO.File.Delete(filePath);
                    }
                }

                // Xoá từ cơ sở dữ liệu
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