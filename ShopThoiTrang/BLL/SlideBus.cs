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
    public class SlideBus : ISlideBus
    {
        private ISlideDAL _res;
        public SlideBus(ISlideDAL res)
        {
            _res = res;
        }
        public SlideModel GetTheoMa(int ma)
        {
            return _res.GetTheoMa(ma);
        }
        public List<SlideModel> GetALL()
        {
            return _res.GetALL();
        }
        public bool Create(SlideModel them)
        {
            return _res.Create(them);
        }
        public bool Update(SlideModel sua)
        {
            return _res.Update(sua);
        }
        public bool Delete(int ma)
        {
            return _res.Delete(ma);
        }
    }
}