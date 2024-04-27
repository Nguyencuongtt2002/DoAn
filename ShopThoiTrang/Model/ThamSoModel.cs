using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Model
{
    public class ThamSoModel
    {
        public int MaThamSo { get; set; }
        public string? TenThamSo { get; set; }
        public string? KyHieu { get; set; }
        public string? NoiDung { get; set; }
        public byte[]? Anh { get; set; }
        public IFormFile? File { get; set; }

       
    }

}