using BLL;
using Microsoft.AspNetCore.Mvc;
using Model;
using System.Drawing;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Authorization;
using OfficeOpenXml;
using OfficeOpenXml.Style;
using static Org.BouncyCastle.Bcpg.Attr.ImageAttrib;
namespace ShopThoiTrang.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class DonHangController : ControllerBase
    {
        private IDonHangBus _donhangBus;
        public DonHangController(IDonHangBus donhangBus )
        {
            _donhangBus = donhangBus;
            
        }
        [Route("get-all")]
        [HttpGet]
        public IEnumerable<DonHangModel> GetALL()
        {
            return _donhangBus.GetALL();
        }
        [AllowAnonymous]
        [Route("getctdonhangbydonhang")]
        [HttpPost]
        public IActionResult GetCTDonHangTheoDonHang([FromBody] ChiTietDonHangModel model)
        {
            try
            {
                var data = _donhangBus.GetCTDonHangTheoDonHang(model.MaDonHang, model.MaSanPham);
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
        [Route("getnew")]
        [HttpGet]
        public DonHangModel GetNew()
        {
            return _donhangBus.GetNew();
        }
        [AllowAnonymous]
        [Route("them")]
        [HttpPost]
        public DonHangModel CreateDonHang([FromBody] DonHangModel model)
        {
            _donhangBus.CreateDonHang(model);
            return model;
        }
        [AllowAnonymous]
        [Route("capnhat-donhang")]
        [HttpPost]
        public DonHangModel CapNhatDonHang([FromBody] DonHangModel model)
        {
            _donhangBus.CapNhatDonHang(model);
            return model;
        }
        [AllowAnonymous]
        [Route("lichsumuahang/{MaNguoiDung}")]
        [HttpGet]
        public IActionResult LichSuMuaHang(int MaNguoiDung)
        {
            try
            {
                var data = _donhangBus.LichSuMuaHang(MaNguoiDung);
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
        [Route("huydon")]
        [HttpPost]
        public DonHangModel HuyDonHang([FromBody] DonHangModel model)
        {
            _donhangBus.HuyDonHang(model);
            return model;
        }
        [Route("duyetdon/{ma}")]
        [HttpGet]
        public bool DuyetDonHang(int ma)
        {
            return _donhangBus.DuyetDonHang(ma);
        }
        

        [Route("excel")]
        [HttpPost]
        public IActionResult ExportToExcel([FromBody] ChiTietDonHangModel model)
        {
            try
            {
                var lienhe = _donhangBus.ThongTinLienHe();
                var donhang = _donhangBus.GetALL();
                // Lấy thông tin đơn hàng và chi tiết đơn hàng từ BLL
                var chiTietDonHang = _donhangBus.GetCTDonHangTheoDonHang(model.MaDonHang,model.MaSanPham);

                using (var package = new ExcelPackage())
                {
                    // Tạo một trang tính mới
                    var worksheet = package.Workbook.Worksheets.Add("Hoá Đơn");

                    // Thêm thông tin cửa hàng và hoá đơn vào các ô
                    worksheet.Cells["A2"].Value = "Cửa hàng MarkShop";
                    worksheet.Cells["A3"].Value = "Địa chỉ : " + lienhe[0].DiaChi;
                    worksheet.Cells["A4"].Value = "Email: " + lienhe[0].Email;
                    worksheet.Cells["A5"].Value = "Số điện thoại: " + lienhe[0].SoDienThoai;


                    worksheet.Cells["D2"].Value = "Thông tin khách hàng ";
                    worksheet.Cells["D3"].Value = "Tên khách hàng: " + donhang[0].HoTen;
                    worksheet.Cells["D4"].Value = "Địa chỉ: " + donhang[0].DiaChi;
                    worksheet.Cells["D5"].Value = "Số điện thoại: " + donhang[0].SoDienThoai;

                    worksheet.Cells["A7"].Value = "Mã ĐH";
                    worksheet.Cells["B7"].Value = "Tên sản phẩm";
                    worksheet.Cells["C7"].Value = "Số lượng";
                    worksheet.Cells["D7"].Value = "Giá";
                    worksheet.Cells["E7"].Value = "Thành tiền";

                    // Duyệt qua danh sách chi tiết đơn hàng và ghi dữ liệu vào worksheet
                    int rowIndex = 8; // Bắt đầu từ hàng thứ 9 sau các thông tin cửa hàng
                    foreach (var item in chiTietDonHang)
                    {
                        worksheet.Cells[rowIndex, 1].Value = item.MaDonHang;
                        worksheet.Cells[rowIndex, 2].Value = item.TenSP;
                        worksheet.Cells[rowIndex, 3].Value = item.SoLuong;
                        worksheet.Cells[rowIndex, 4].Value = item.GiaTien.ToString("#,##0") + " VNĐ";
                        worksheet.Cells[rowIndex, 5].Value = (item.SoLuong * item.GiaTien).ToString("#,##0") + " VNĐ";
                        rowIndex++;
                    }

                    // Định dạng và thiết kế các ô dữ liệu
                    worksheet.Cells["A1:F1"].Merge = true; // Gộp ô từ A1 đến E1
                    worksheet.Cells["A2:C2"].Merge = true;
                    worksheet.Cells["A3:C3"].Merge = true;
                    worksheet.Cells["A4:C4"].Merge = true;
                    worksheet.Cells["A5:C5"].Merge = true;

                    worksheet.Cells["D2:F2"].Merge = true;
                    worksheet.Cells["D3:F3"].Merge = true;
                    worksheet.Cells["D4:F4"].Merge = true;
                    worksheet.Cells["D5:F5"].Merge = true;

                    worksheet.Cells["A2:C2"].Style.Font.Bold = true; // Đặt in đậm cho font
                    worksheet.Cells["D2:F2"].Style.Font.Bold = true; // Đặt in đậm cho tiêu đề các cột
                    worksheet.Cells["A7:F7"].Style.HorizontalAlignment = ExcelHorizontalAlignment.Center;

                    // Đặt giá trị cho ô "Tổng hoá đơn" sau khi đã lặp qua danh sách chi tiết hoá đơn nhập
                    worksheet.Cells["A" + rowIndex].Value = "Tổng hoá đơn: " + donhang[0].TongTien?.ToString("#,##0") + " VNĐ";
                    worksheet.Cells["A" + rowIndex + ":D" + rowIndex].Merge = true; // Gộp ô từ A đến E tại hàng cuối cùng
                    worksheet.Cells["A" + rowIndex].Style.Font.Bold = true;

                    // Tự động điều chỉnh chiều rộng của các cột
                    worksheet.Cells.AutoFitColumns();

                    // Chuyển đổi package Excel thành một mảng byte
                    var fileBytes = package.GetAsByteArray();
                    return File(fileBytes, "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", "hoa-don.xlsx");
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { success = false, message = "Đã xảy ra lỗi: " + ex.Message });
            }
        }
    }
}