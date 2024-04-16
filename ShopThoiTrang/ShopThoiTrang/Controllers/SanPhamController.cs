using BLL;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;
using Model;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.AspNetCore.Authorization;
using System.Drawing;

namespace ShopThoiTrang.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class SanPhamController : ControllerBase
    {
        private ISanPhamBus _sanphamBus;
        private string _path;
        public SanPhamController(ISanPhamBus sanphamBus, IConfiguration configuration)
        {
            _sanphamBus = sanphamBus;
            _path = configuration["AppSettings:PATH_SanPham"];
        }
        [AllowAnonymous]
        [Route("getbyid/{ma}")]
        [HttpGet]
        public SanPhamModel GetTheoMa(int ma)
        {
            return _sanphamBus.GetTheoMa(ma);
        }
        [AllowAnonymous]
        [Route("getnew")]
        [HttpGet]
        public SanPhamModel  GetNew()
        {
            return _sanphamBus.GetNew();
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
                string TenSP = "";

                if (formData.Keys.Contains("tenSP") && !string.IsNullOrEmpty(Convert.ToString(formData["tenSP"])))
                {
                    TenSP = Convert.ToString(formData["tenSP"].ToString());
                }
                
                int total = 0;
                var data = _sanphamBus.GetALL(page, pageSize, out total, TenSP);

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
        [Route("getSPM/{SL}")]
        [HttpGet]
        public IEnumerable<SanPhamModel> SanPhamMoi(int SL)
        {
            return _sanphamBus.SanPhamMoi(SL);
        }
        [AllowAnonymous]
        [Route("getSPBC/{SL}")]
        [HttpGet]
        public IEnumerable<SanPhamModel> SanPhamBanChay(int SL)
        {
            return _sanphamBus.SanPhamBanChay(SL);
        }
        [AllowAnonymous]
        [Route("getSPGG/{SL}")]
        [HttpGet]
        public IEnumerable<SanPhamModel> SanPhamGiamGia(int SL)
        {
            return _sanphamBus.SanPhamGiamGia(SL);
        }
        [AllowAnonymous]
        [Route("san-pham-cung-loai")]
        [HttpPost]
        public IActionResult SanPhamCungLoai([FromBody] Dictionary<string, object> formData)
        {
            try
            {
                if (!formData.ContainsKey("maSanPham") || !formData.ContainsKey("maLoaiSanPham"))
                {
                    return BadRequest("Dữ liệu không hợp lệ");
                }
                var maSanPham = int.Parse(formData["maSanPham"].ToString());
                var maLoaiSanPham = int.Parse(formData["maLoaiSanPham"].ToString());
                var data = _sanphamBus.SanPhamCungLoai(maSanPham, maLoaiSanPham);
                var response = new
                {
                    success = true,
                    message = "Lấy dữ liệu thành công",
                    data = data
                };
                return Ok(response);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
        [AllowAnonymous]
        [Route("timkiem")]
        [HttpPost]
        public IActionResult TimKiem( [FromBody] Dictionary<string, object> formData)
        {
            try
            {
                var page = int.Parse(formData["page"].ToString());
                var pageSize = int.Parse(formData["pageSize"].ToString());
                int? maSanPham = null;
                if (formData.Keys.Contains("maSanPham") && !string.IsNullOrEmpty(Convert.ToString(formData["maSanPham"]))) { maSanPham = int.Parse(formData["maSanPham"].ToString()); }
                string tenSP = "";
                if (formData.Keys.Contains("tenSP") && !string.IsNullOrEmpty(Convert.ToString(formData["tenSP"]))) { tenSP = Convert.ToString(formData["tenSP"]); }
                string tenThuongHieu = "";
                if (formData.Keys.Contains("tenThuongHieu") && !string.IsNullOrEmpty(formData["tenThuongHieu"].ToString()))
                {
                    tenThuongHieu = formData["tenThuongHieu"].ToString();
                }
                string tenLoaiSanPham = "";
                if (formData.Keys.Contains("tenLoaiSanPham") && !string.IsNullOrEmpty(formData["tenLoaiSanPham"].ToString()))
                {
                    tenLoaiSanPham = formData["tenLoaiSanPham"].ToString();
                }

                int? minGia = null;
                if (formData.Keys.Contains("minGia") && !string.IsNullOrEmpty(Convert.ToString(formData["minGia"]))) { minGia = int.Parse(formData["minGia"].ToString()); }
                int? maxGia = null;
                if (formData.Keys.Contains("maxGia") && !string.IsNullOrEmpty(Convert.ToString(formData["maxGia"]))) { maxGia = int.Parse(formData["maxGia"].ToString()); }
                int? maLoaiSanPham = null;
                if (formData.Keys.Contains("maLoaiSanPham") && !string.IsNullOrEmpty(Convert.ToString(formData["maLoaiSanPham"]))) { maLoaiSanPham = int.Parse(formData["maLoaiSanPham"].ToString()); }
                int? maThuongHieu = null;
                if (formData.Keys.Contains("maThuongHieu") && !string.IsNullOrEmpty(Convert.ToString(formData["maThuongHieu"]))) { maThuongHieu = int.Parse(formData["maThuongHieu"].ToString()); };
                int total = 0;

                var data = _sanphamBus.TimKiem(page, pageSize, out total, maSanPham, tenSP, tenThuongHieu, tenLoaiSanPham, minGia, maxGia, maLoaiSanPham, maThuongHieu);

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
                throw new Exception(ex.Message);
            }
        }
        [Route("them")]
        [HttpPost]
        public IActionResult Create([FromForm] SanPhamModel model)
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
                var Model = new SanPhamModel
                {
                    TenSP = model.TenSP,
                    MoTa =model.MoTa,
                    MaLoaiSanPham = model.MaLoaiSanPham,
                    MaThuongHieu = model.MaThuongHieu,
                    MaSize = model.MaSize,
                    AnhDaiDien = imagePath, // Đường dẫn tương đối của ảnh
                };

                // Gọi phương thức Create từ BLL để thêm mới vào cơ sở dữ liệu
                _sanphamBus.Create(Model);

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
        public IActionResult Update([FromForm] SanPhamModel model)
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

                    var Model = _sanphamBus.GetTheoMa(model.MaSanPham);

                    // Xoá file ảnh cũ nếu có
                    if (!string.IsNullOrEmpty(Model?.AnhDaiDien))
                    {
                        string oldFilePath = Path.Combine(_path, Model.AnhDaiDien);
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
                    model.AnhDaiDien = uniqueFileName;
                }

                // Gọi phương thức cập nhật từ BLL với thông tin mới
                _sanphamBus.Update(model);

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
                var model = _sanphamBus.GetTheoMa(ma);

                if (model == null)
                {
                    return NotFound(new { success = false, message = "Sản phẩm không tồn tại" });
                }

                // Xoá file ảnh từ thư mục lưu trữ
                if (!string.IsNullOrEmpty(model.AnhDaiDien))
                {
                    string filePath = Path.Combine(_path, model.AnhDaiDien);
                    if (System.IO.File.Exists(filePath))
                    {
                        System.IO.File.Delete(filePath);
                    }
                }

                // Xoá từ cơ sở dữ liệu
                bool result = _sanphamBus.Delete(ma);

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