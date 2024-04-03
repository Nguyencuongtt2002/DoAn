using DAL;
using Model;
using System;
using System.Collections.Generic;
using System.Drawing;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;

namespace BLL
{
    public class AnhBus : IAnhBus
    {
        private IAnhDAL _res;
        public AnhBus(IAnhDAL res)
        {
            _res = res;
        }
       
        public List<AnhModel> GetALL()
        {
            return _res.GetALL();
        }
       
    }
}