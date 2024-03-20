using Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL
{
    public partial interface ISlideDAL
    {
        SlideModel GetTheoMa(int ma);
        List<SlideModel> GetALL();
        bool Create(SlideModel them);
        bool Update(SlideModel sua);
        bool Delete(int ma);

    }
}
