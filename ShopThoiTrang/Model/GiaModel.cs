using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Model
{
    public class GiaModel
    {
        public int? MaGia { get; set; }
        public int? MaSanPham { get; set; }
        public DateTime? NgayBD { get; set; }
        public DateTime? NgayKT { get; set; }
        public int? DonGia { get; set; }
        public string? TenSP { get; set; }
    }
}
