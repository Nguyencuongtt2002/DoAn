using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Model
{
    public class NguoiDungModel
    {
        public int MaNguoiDung { get; set; }
        public string? TaiKhoan { get; set; }
        public string? MatKhau { get; set; }
        public string? Email { get; set; }
        public string? HoTen { get; set; }
        public DateTime? NgaySinh { get; set; }
        public string? GioiTinh { get; set; }
        public string? DiaChi { get; set; }
        public string? SoDienThoai { get; set; }
        public byte[]? AnhDaiDien { get; set; }
        public string? VaiTro { get; set; }
        public IFormFile? File { get; set; }
        public string? Token { get; set; }
        public int? MaDonHang { get; set; }
        public bool? EmailConfirmed { get; set; }
        public string? ConfirmationLink { get; set; }
    }
}
