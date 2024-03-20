using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Model
{
    public class SanPhamModel
    {
        public int MaSanPham { get; set; }
        public string? TenSP { get; set; }
        public string? AnhDaiDien { get; set; }
        public string MoTa { get; set; }
        public DateTime? NgayTao { get; set; }
        public int? MaSize { get; set; }
        public int MaLoaiSanPham { get; set; }
        public string? TenLoaiSanPham { get; set; }
        public string? TenSize { get; set; }
        public int MaThuongHieu { get; set; }
        public string? TenThuongHieu { get; set; }
        public int? TongSoLuong { get; set; }
        public int? DonGia { get; set; }
        public int? PhanTram { get; set; }
        public int? GiaMoiKhiGiam { get; set; }
        public List<ThongSoModel>? listjson_thongso { get; set; }
        public IFormFile? File { get; set; }
    }
}
