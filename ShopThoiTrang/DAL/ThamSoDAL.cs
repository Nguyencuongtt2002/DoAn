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
    public partial class ThamSoDAL : IThamSoDAL
    {
        private IDatabaseHelper _dbHelper;
        public ThamSoDAL(IDatabaseHelper dbHelper)
        {
            _dbHelper = dbHelper;
        }
        public ThamSoModel GetTheoMa(int ma)
        {
            string msgError = "";
            try
            {
                var dt = _dbHelper.ExecuteSProcedureReturnDataTable(out msgError, "sp_getbyid_ThamSo",
                "@p_MaThamSo", ma);
                if (!string.IsNullOrEmpty(msgError))
                    throw new Exception(msgError);
                return dt.ConvertTo<ThamSoModel>().FirstOrDefault();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public List<ThamSoModel> GetALL()
        {
            string msgError = "";
            try
            {
                var dt = _dbHelper.ExecuteSProcedureReturnDataTable(out msgError, "sp_getall_ThamSo");
                if (!string.IsNullOrEmpty(msgError))
                    throw new Exception(msgError);
                return dt.ConvertTo<ThamSoModel>().ToList();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public bool Create(ThamSoModel them)
        {
            string msgError = "";
            try
            {
                var result = _dbHelper.ExecuteScalarSProcedureWithTransaction(out msgError, "sp_create_ThamSo",
                "@p_TenThamSo", them.TenThamSo,
                "@p_KyHieu", them.KyHieu,
                "@p_NoiDung", them.NoiDung,
                "@p_Anh",them.Anh);
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
        public bool Update(ThamSoModel sua)
        {
            string msgError = "";
            try
            {
                var result = _dbHelper.ExecuteScalarSProcedureWithTransaction(out msgError, "sp_update_ThamSo",
                "@p_MaThamSo", sua.MaThamSo,
                "@p_TenThamSo", sua.TenThamSo,
                "@p_KyHieu", sua.KyHieu,
                "@p_NoiDung", sua.NoiDung,
                "@p_Anh", sua.Anh);
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
                var result = _dbHelper.ExecuteScalarSProcedureWithTransaction(out msgError, "sp_delete_ThamSo",
                "@p_MaThamSo", ma);
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