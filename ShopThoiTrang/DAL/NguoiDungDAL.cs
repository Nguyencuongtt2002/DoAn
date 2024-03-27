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
    public partial class NguoiDungDAL : INguoiDungDAL
    {
        private IDatabaseHelper _dbHelper;
        public NguoiDungDAL(IDatabaseHelper dbHelper)
        {
            _dbHelper = dbHelper;
        }
        public NguoiDungModel DangNhap(string TaiKhoan, string MatKhau)
        {
            string msgError = "";
            try
            {
                var dt = _dbHelper.ExecuteSProcedureReturnDataTable(out msgError, "sp_dangnhap_NguoiDung",
                     "@p_TaiKhoan", TaiKhoan,
                     "@p_MatKhau", MatKhau);
                if (!string.IsNullOrEmpty(msgError))
                    throw new Exception(msgError);
                return dt.ConvertTo<NguoiDungModel>().FirstOrDefault();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public NguoiDungModel GetTheoMa(int ma)
        {
            string msgError = "";
            try
            {
                var dt = _dbHelper.ExecuteSProcedureReturnDataTable(out msgError, "sp_getbyid_NguoiDung",
                "@p_MaNguoiDung", ma);
                if (!string.IsNullOrEmpty(msgError))
                    throw new Exception(msgError);
                return dt.ConvertTo<NguoiDungModel>().FirstOrDefault();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public NguoiDungModel CheckTaiKhoan(string TaiKhoan , string Email)
        {
            string msgError = "";
            try
            {
                var dt = _dbHelper.ExecuteSProcedureReturnDataTable(out msgError, "sp_kiemtrataikhoan_NguoiDung",
                "@p_TaiKhoan", TaiKhoan,
                "@p_Email",Email);
                if (!string.IsNullOrEmpty(msgError))
                    throw new Exception(msgError);
                return dt.ConvertTo<NguoiDungModel>().FirstOrDefault();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public List<NguoiDungModel> GetALL(int? pageIndex, int? pageSize, out int total)
        {
            string msgError = "";
            total = 0;
            try
            {
                var dt = _dbHelper.ExecuteSProcedureReturnDataTable(out msgError, "sp_getall_NguoiDung",
                    "@p_pageindex", pageIndex,
                    "@p_pagesize", pageSize);
                if (!string.IsNullOrEmpty(msgError))
                    throw new Exception(msgError);
                if (dt.Rows.Count > 0) total = (int)dt.Rows[0]["TotalCount"];
                return dt.ConvertTo<NguoiDungModel>().ToList();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public bool Create(NguoiDungModel model)
        {
            string msgError = "";
            try
            {
                var result = _dbHelper.ExecuteScalarSProcedureWithTransaction(out msgError, "sp_create_NguoiDung",
                "@p_TaiKhoan", model.TaiKhoan,
                "@p_MatKhau",model.MatKhau,
                "@p_Email",model.Email,
                "@p_HoTen",model.HoTen,
                "@p_NgaySinh",model.NgaySinh,
                "@p_GioiTinh",model.GioiTinh,
                "@p_DiaChi",model.DiaChi,
                "@p_SoDienThoai",model.SoDienThoai,
                "@p_AnhDaiDien",model.AnhDaiDien,
                "@p_VaiTro",model.VaiTro);
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
        public bool Update(NguoiDungModel model)
        {
            string msgError = "";
            try
            {
                var result = _dbHelper.ExecuteScalarSProcedureWithTransaction(out msgError, "sp_update_NguoiDung",
                "@p_MaNguoiDung",model.MaNguoiDung,
                "@p_MatKhau", model.MatKhau,
                "@p_Email", model.Email,
                "@p_HoTen", model.HoTen,
                "@p_NgaySinh", model.NgaySinh,
                "@p_GioiTinh", model.GioiTinh,
                "@p_DiaChi", model.DiaChi,
                "@p_SoDienThoai", model.SoDienThoai,
                "@p_AnhDaiDien", model.AnhDaiDien,
                "@p_VaiTro", model.VaiTro);
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
                var result = _dbHelper.ExecuteScalarSProcedureWithTransaction(out msgError, "sp_delete_NguoiDung",
                "@p_MaNguoiDung", ma);
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
        public bool ResetMatKhau(NguoiDungModel model)
        {
            string msgError = "";
            try
            {
                var result = _dbHelper.ExecuteScalarSProcedureWithTransaction(out msgError, "sp_resetpassword_NguoiDung",
                "@p_TaiKhoan", model.TaiKhoan,
                "@p_MatKhau", model.MatKhau);
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