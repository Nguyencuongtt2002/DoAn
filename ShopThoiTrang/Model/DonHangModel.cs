using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Model
{
    public class DonHangModel
    {
        public int MaDonHang { get; set; }
        public DateTime? NgayDat { get; set; }
        public DateTime? NgayGiao {  get; set; }
        public string? HoTen {  get; set; }
        public string? DiaChi { get; set; }
        public string? SoDienThoai { get; set; }
        public string? PhuongThucThanhToan { get; set; }
        public int? MaNguoiDung { get; set; }
        public int? TinhTrang { get; set; }
        public string? TenSP {  get; set; }
        public int? MaSanPham { get; set; }
        public int? SoLuong { get; set; }
        public int? GiaTien { get; set; }
        public int? TongTien { get; set; }
        public List<ChiTietDonHangModel>? p_list_json_chitiet_hoadon { get; set; }

    }
    public class ChiTietDonHangModel
    {
        public int MaChiTiet { get; set; }
        public int MaDonHang { get; set; }
        public int MaSanPham { get; set; }
        public int SoLuong { get; set; }
        public int GiaTien { get; set; }
        public int? TongTien { get; set; }
        public string? TenSP { get; set; }
        public int? TinhTrang { get; set; }
        public string? HoTen { get; set; }
        public string? DiaChi { get; set; }
        public string? SoDienThoai { get; set; }
    }

}
