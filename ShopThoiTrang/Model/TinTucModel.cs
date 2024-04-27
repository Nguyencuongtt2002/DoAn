using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Model
{
    public class TinTucModel
    { 
        public int MaTinTuc { get; set; }
        public string? TieuDe {  get; set; }
        public string? NoiDung { get; set; }
        public DateTime? NgayDang { get; set; }
        public byte[]? AnhTinTuc { get; set; }
        public int? MaNguoiDung { get; set; }
        public string? HoTen {  get; set; }
        public List<CTTinTucModel>? listjson_NoiDungCT { get; set; }
        public IFormFile? File { get; set; }
    }
  
}