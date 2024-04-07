using DAL.Helper;
using DAL;
using Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL
{
    public partial class SanPhamDAL : ISanPhamDAL
    {
        private IDatabaseHelper _dbHelper;
        public SanPhamDAL(IDatabaseHelper dbHelper)
        {
            _dbHelper = dbHelper;
        }
        public SanPhamModel GetTheoMa(int ma)
        {
            string msgError = "";
            try
            {
                var dt = _dbHelper.ExecuteSProcedureReturnDataTable(out msgError, "sp_getbyid_SanPham",
                "@p_MaSanPham", ma);
                if (!string.IsNullOrEmpty(msgError))
                    throw new Exception(msgError);
                return dt.ConvertTo<SanPhamModel>().FirstOrDefault();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public SanPhamModel  GetNew()
        {
            string msgError = "";
            try
            {
                var dt = _dbHelper.ExecuteSProcedureReturnDataTable(out msgError, "sp_getnew_SanPham");
                if (!string.IsNullOrEmpty(msgError))
                    throw new Exception(msgError);
                return dt.ConvertTo<SanPhamModel>().FirstOrDefault();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public List<SanPhamModel> SanPhamMoi(int SL)
        {
            string msgError = "";
            try
            {
                var dt = _dbHelper.ExecuteSProcedureReturnDataTable(out msgError, "sp_lay_san_pham_moi",
                     "@p_SoLuong",SL);
                if (!string.IsNullOrEmpty(msgError))
                    throw new Exception(msgError);
                return dt.ConvertTo<SanPhamModel>().ToList();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public List<SanPhamModel> SanPhamBanChay(int SL)
        {
            string msgError = "";
            try
            {
                var dt = _dbHelper.ExecuteSProcedureReturnDataTable(out msgError, "sp_lay_san_pham_ban_chay",
                     "@p_SoLuong", SL);
                if (!string.IsNullOrEmpty(msgError))
                    throw new Exception(msgError);
                return dt.ConvertTo<SanPhamModel>().ToList();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public List<SanPhamModel> SanPhamGiamGia(int SL)
        {
            string msgError = "";
            try
            {
                var dt = _dbHelper.ExecuteSProcedureReturnDataTable(out msgError, "sp_lay_san_pham_giam_gia",
                     "@p_SoLuong", SL);
                if (!string.IsNullOrEmpty(msgError))
                    throw new Exception(msgError);
                return dt.ConvertTo<SanPhamModel>().ToList();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public List<SanPhamModel> SanPhamCungLoai(int MaSanPham, int MaLoaiSanPham)
        {
            string msgError = "";
            try
            {
                var dt = _dbHelper.ExecuteSProcedureReturnDataTable(out msgError, "sp_get_SanPham_cungloai",
                     "@p_MaSanPham", MaSanPham,
                     "@p_MaLoaiSanPham",MaLoaiSanPham);
                if (!string.IsNullOrEmpty(msgError))
                    throw new Exception(msgError);
                return dt.ConvertTo<SanPhamModel>().ToList();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public List<SanPhamModel> GetALL(int? page, int? pageSize, out int total, string? TenSP)
        {
            string msgError = "";
            total = 0;
            try
            {
                var dt = _dbHelper.ExecuteSProcedureReturnDataTable(out msgError, "sp_getall_SanPham",
                    "@p_pageindex", page,
                    "@p_pagesize", pageSize,
                    "@p_TenSP",TenSP);
                if (!string.IsNullOrEmpty(msgError))
                    throw new Exception(msgError);
                if (dt.Rows.Count > 0) total = (int)dt.Rows[0]["TotalCount"];
                return dt.ConvertTo<SanPhamModel>().ToList();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public List<SanPhamModel> TimKiem(int? page, int? pageSize, out int total, int? MaSanPham, string? TenSP, string TenThuongHieu, string TenLoaiSanPham, int? MinGia, int? MaxGia, int? MaLoaiSanPham, int? MaThuongHieu)
        {
            string msgError = "";
            total = 0;
            try
            {
                var dt = _dbHelper.ExecuteSProcedureReturnDataTable(out msgError, "sp_search_SanPham",
                    "@p_pageindex", page,
                    "@p_pagesize", pageSize,
                    "@p_MaSanPham", MaSanPham,
                    "@p_TenSP", TenSP,
                    "@p_TenThuongHieu", TenThuongHieu,
                    "@p_TenLoaiSanPham", TenLoaiSanPham,
                    "@p_MinGia", MinGia,
                    "@p_MaxGia", MaxGia,
                    "@p_MaThuongHieu", MaLoaiSanPham,
                    "@p_MaLoaiSanPham", MaThuongHieu);
                if (!string.IsNullOrEmpty(msgError))
                    throw new Exception(msgError);
                if (dt.Rows.Count > 0) total = (int)dt.Rows[0]["TotalCount"];
                return dt.ConvertTo<SanPhamModel>().ToList();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public bool Create(SanPhamModel model)
        {
            string msgError = "";
            try
            {
                var result = _dbHelper.ExecuteScalarSProcedureWithTransaction(out msgError, "sp_create_SanPham",
                "@p_TenSP",model.TenSP,
                "@p_MoTa",model.MoTa,
                "@p_MaLoaiSanPham",model.MaLoaiSanPham,
                "@p_MaThuongHieu",model.MaThuongHieu,
                "@p_MaSize",model.MaSize,
                "@p_AnhDaiDien",model.AnhDaiDien);
                if ((result != null && !string.IsNullOrEmpty(result.ToString())) || !string.IsNullOrEmpty(msgError))
                {
                    throw new Exception(Convert.ToString(result) + msgError);
                }
                return true;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public bool Update(SanPhamModel model)
        {
            string msgError = "";
            try
            {
                var result = _dbHelper.ExecuteScalarSProcedureWithTransaction(out msgError, "sp_update_SanPham",
                "@p_MaSanPham",model.MaSanPham,
                "@p_TenSP", model.TenSP,
                "@p_MoTa", model.MoTa,
                "@p_MaLoaiSanPham", model.MaLoaiSanPham,
                "@p_MaThuongHieu", model.MaThuongHieu,
                "@p_MaSize", model.MaSize,
                "@p_AnhDaiDien", model.AnhDaiDien,
                "@p_SoLuong",model.SoLuong);
                if ((result != null && !string.IsNullOrEmpty(result.ToString())) || !string.IsNullOrEmpty(msgError))
                {
                    throw new Exception(Convert.ToString(result) + msgError);
                }
                return true;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public bool Delete(int ma)
        {
            string msgError = "";
            try
            {
                var result = _dbHelper.ExecuteScalarSProcedureWithTransaction(out msgError, "sp_delete_SanPham",
                "@p_MaSanPham", ma);
                if ((result != null && !string.IsNullOrEmpty(result.ToString())) || !string.IsNullOrEmpty(msgError))
                {
                    throw new Exception(Convert.ToString(result) + msgError);
                }
                return true;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

    }
}