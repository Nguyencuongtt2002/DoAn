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
    public partial class AnhDAL : IAnhDAL
    {
        private IDatabaseHelper _dbHelper;
        public AnhDAL(IDatabaseHelper dbHelper)
        {
            _dbHelper = dbHelper;
        }
        public List<AnhModel> GetALL()
        {
            string msgError = "";
            try
            {
                var dt = _dbHelper.ExecuteSProcedureReturnDataTable(out msgError, "sp_getall_Anh");
                if (!string.IsNullOrEmpty(msgError))
                    throw new Exception(msgError);
                return dt.ConvertTo<AnhModel>().ToList();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        
    }
}