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
    public partial class LoaiSanPhamDAL : ILoaiSanPhamDAL
    {
        private IDatabaseHelper _dbHelper;
        public LoaiSanPhamDAL(IDatabaseHelper dbHelper)
        {
            _dbHelper = dbHelper;
        }
        public List<LoaiSanPhamModel> GetALL(int? pageIndex, int? pageSize, out int total, string? TenLoaiSanPham)
        {
            string msgError = "";
            total = 0;
            try
            {
                var dt = _dbHelper.ExecuteSProcedureReturnDataTable(out msgError, "sp_getall_LoaiSanPham",
                    "@p_pageindex", pageIndex,
                    "@p_pagesize", pageSize,
                    "@p_TenLoaiSanPham", TenLoaiSanPham);
                if (!string.IsNullOrEmpty(msgError))
                    throw new Exception(msgError);
                if (dt.Rows.Count > 0) total = (int)dt.Rows[0]["TotalCount"];
                return dt.ConvertTo<LoaiSanPhamModel>().ToList();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public bool Create(LoaiSanPhamModel them)
        {
            string msgError = "";
            try
            {
                var result = _dbHelper.ExecuteScalarSProcedureWithTransaction(out msgError, "sp_create_LoaiSanPham",
                "@p_TenLoaiSanPham", them.TenLoaiSanPham,
                "@p_GioiThieu", them.GioiThieu);
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
        public bool Update(LoaiSanPhamModel sua)
        {
            string msgError = "";
            try
            {
                var result = _dbHelper.ExecuteScalarSProcedureWithTransaction(out msgError, "sp_update_LoaiSanPham",
                "@p_MaLoaiSanPham", sua.MaLoaiSanPham,
                "@p_TenLoaiSanPham", sua.TenLoaiSanPham,
                "@p_GioiThieu", sua.GioiThieu);
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
                var result = _dbHelper.ExecuteScalarSProcedureWithTransaction(out msgError, "sp_delete_LoaiSanPham",
                "@p_MaLoaiSanPham", ma);
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