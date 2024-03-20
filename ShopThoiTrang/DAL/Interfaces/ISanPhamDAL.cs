using Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL
{
    public partial interface ISanPhamDAL
    {
        SanPhamModel GetTheoMa(int ma);
        SanPhamModel GetNew();
        List<SanPhamModel> SanPhamMoi(int SL);
        List<SanPhamModel> SanPhamBanChay(int SL);
        List<SanPhamModel> SanPhamGiamGia(int SL);
        List<SanPhamModel> SanPhamCungLoai(int MaSanPham, int MaLoaiSanPham);
        List<SanPhamModel> GetALL(int? page, int? pageSize, out int total ,string? TenSP);
        List<SanPhamModel> TimKiem(int? page, int? pageSize, out int total, int? MaSanPham, string TenSP, string TenThuongHieu, string TenLoaiSanPham, int? MinGia, int? MaxGia, int? MaLoaiSanPham, int? MaThuongHieu);
        bool Create(SanPhamModel model);
        bool Update(SanPhamModel model);
        bool Delete(int ma);
    }
}
