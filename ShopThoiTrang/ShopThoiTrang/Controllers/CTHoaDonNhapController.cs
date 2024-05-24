using BLL;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Model;
using OfficeOpenXml.Style;
using OfficeOpenXml;

namespace ShopThoiTrang.Controllers
{
    [Authorize(Roles = "Admin")]
    [Route("api/[controller]")]
    [ApiController]
    public class CTHoaDonNhapController : ControllerBase
    {
        private ICTHoaDonNhapBus _cthdnBus;
        private IHoaDonNhapBus _hdnBus;
        public CTHoaDonNhapController(ICTHoaDonNhapBus cthdnBus , IHoaDonNhapBus hdnBus)
        {
            _cthdnBus = cthdnBus;
            _hdnBus = hdnBus;
        }
        [Route("get-all")]
        [HttpGet]
        public IEnumerable<CTHoaDonNhapModel> GetALL()
        {
            return _cthdnBus.GetALL();
        }
        [Route("them")]
        [HttpPost]
        public IActionResult Create([FromBody] CTHoaDonNhapModel them)
        {
            try
            {
                _cthdnBus.Create(them);
                return Ok(new { message = "Đã thêm thành công", results = true, status = 200 });
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Đã xảy ra lỗi:" + ex.Message);
            }
        }
        [Route("update")]
        [HttpPut]
        public IActionResult Update([FromBody] CTHoaDonNhapModel sua)
        {
            try
            {
                _cthdnBus.Update(sua);
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
            return _cthdnBus.Delete(ma);
        }
        [Route("getcthdnbyhdn/{ma}")]
        [HttpGet]
        public IActionResult GetCTHDNTheoHDN(int ma)
        {
            try
            {
                var data = _cthdnBus.GetCTHDNTheoHDN(ma);
                return Ok(new
                {
                    success = true,
                    message = "Lấy dữ liệu thành công",
                    data = data
                });
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

        [Route("excel/{id}")]
        [HttpGet]
        public IActionResult ExportToExcel(int id )
        {
            try
            {
                var lienhe = _hdnBus.ThongTinLienHe();
                var hoadonnhap = _hdnBus.GetTheoMa(id);
                var chitiethoadonnhap = _cthdnBus.GetCTHDNTheoHDN(id);
                using (var package = new ExcelPackage())
                {
                    // Tạo một trang tính mới
                    var worksheet = package.Workbook.Worksheets.Add("Hoá Đơn");

                    // Thêm thông tin cửa hàng và hoá đơn vào các ô
                    worksheet.Cells["A2"].Value = "Cửa hàng MarkShop";
                    worksheet.Cells["A3"].Value = "Địa chỉ : " + lienhe[0].DiaChi;
                    worksheet.Cells["A4"].Value = "Email: " + lienhe[0].Email;
                    worksheet.Cells["A5"].Value = "Số điện thoại: " + lienhe[0].SoDienThoai;


                    worksheet.Cells["D2"].Value = "Thông tin hóa đơn ";
                    worksheet.Cells["D3"].Value = "Tên người nhập:"+hoadonnhap.HoTen;
                    worksheet.Cells["D4"].Value = "Nhà cung cấp:"+hoadonnhap.TenNhaCungCap;
                    worksheet.Cells["D5"].Value = "Tổng số luong: " + hoadonnhap.TongSoLuong;
                    worksheet.Cells["D6"].Value = "Tổng tiền: " + hoadonnhap.TongTien;

                    worksheet.Cells["A8"].Value = "STT";
                    worksheet.Cells["B8"].Value = "Tên sản phẩm";
                    worksheet.Cells["C8"].Value = "Số lượng";
                    worksheet.Cells["D8"].Value = "Giá";
                    worksheet.Cells["E8"].Value = "Thành tiền";

                    // Duyệt qua danh sách chi tiết đơn hàng và ghi dữ liệu vào worksheet
                    int rowIndex = 9; // Bắt đầu từ hàng thứ 9 sau các thông tin cửa hàng
                    foreach (var item in chitiethoadonnhap)
                    {
                        worksheet.Cells[rowIndex, 1].Value = rowIndex - 8;
                        worksheet.Cells[rowIndex, 2].Value = item.TenSP;
                        worksheet.Cells[rowIndex, 3].Value = item.SoLuong;
                        worksheet.Cells[rowIndex, 4].Value = item.GiaTien?.ToString("#,##0") + " VNĐ";
                        worksheet.Cells[rowIndex, 5].Value = (item.SoLuong * item.GiaTien)?.ToString("#,##0") + " VNĐ";
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
                    worksheet.Cells["D6:F6"].Merge = true;

                    worksheet.Cells["A2:C2"].Style.Font.Bold = true; // Đặt in đậm 
                    worksheet.Cells["D2:F2"].Style.Font.Bold = true; // Đặt in đậm 
                    worksheet.Cells["A8:E8"].Style.Font.Bold = true; // Đặt in đậm cho tiêu đề các cột
                    worksheet.Cells["A8:F8"].Style.HorizontalAlignment = ExcelHorizontalAlignment.Center;

                    // Đặt giá trị cho ô "Tổng hoá đơn" sau khi đã lặp qua danh sách chi tiết hoá đơn nhập
                    worksheet.Cells["A" + rowIndex].Value = "Tổng hoá đơn: " + hoadonnhap.TongTien?.ToString("#,##0") + " VNĐ";
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