using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Model
{
    public class HoaDonNhapModel
    {
        public int? MaHDN { get; set; }
        public DateTime? NgayNhap { get; set; }
        public int? MaNhaCungCap { get; set; }
        public int? MaNguoiDung { get; set; }
        public string? HoTen {  get; set; }
        public string? TenNhaCungCap { get; set; }
        public int? TongTien { get; set; }
        public int? TongSoLuong { get; set; }
    }
}