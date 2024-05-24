using BLL;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;
using Model;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.AspNetCore.Authorization;
using System.Drawing;

namespace ShopThoiTrang.Controllers
{
    [Authorize(Roles = "Admin")]
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

                    // Tạo đối tượng Model mới với các thông tin
                    var Model = new SanPhamModel
                    {
                        TenSP = model.TenSP,
                        MoTa = model.MoTa,
                        MaLoaiSanPham = model.MaLoaiSanPham,
                        MaThuongHieu = model.MaThuongHieu,
                        MaSize = model.MaSize,
                        AnhDaiDien = System.IO.File.ReadAllBytes(filePath), // Đường dẫn tương đối của ảnh
                    };

                    // Xoá file ảnh theo tên từ thư mục lưu trữ
                    if (!string.IsNullOrEmpty(uniqueFileName))
                    {
                        string filePathDelete = Path.Combine(_path, uniqueFileName);
                        if (System.IO.File.Exists(filePathDelete))
                        {
                            System.IO.File.Delete(filePathDelete);
                        }
                    }
                    _sanphamBus.Create(Model);

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
        public IActionResult Update([FromForm] SanPhamModel model)
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

                    model.AnhDaiDien = System.IO.File.ReadAllBytes(filePath);
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
                
                // Gọi phương thức cập nhật từ BLL với thông tin mới
                _sanphamBus.Update(model);

                return Ok(new { success = true, message = "Cập nhật thành công" });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { success = false, message = "Đã xảy ra lỗi: " + ex.Message });
            }
        }
       

    }
}