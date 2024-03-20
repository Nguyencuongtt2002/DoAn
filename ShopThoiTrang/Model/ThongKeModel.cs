using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Model
{
    public class ThongKeModel
    {
        public int? STT { get; set; }
        public DateTime? ThoiGian { get; set; }
        public int? DoanhThuTheoThang { get; set; }
        public int? DoanhThu { get; set; }
        public int? MaSanPham {  get; set; }
        public string? TenSanPham { get; set; }
        public string? Nam {  get; set; }
        public int? DoanhThuTheoNam { get; set; }
        public int? SoLuongBan { get; set; }
        public string? HoTen {  get; set; }
        public int? TongSanPham { get; set; }
        public int? TongNguoiDung { get; set; }
        public int? TongDoanhThu { get; set; }

    }
}
