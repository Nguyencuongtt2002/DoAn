using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Model
{
    public class AnhModel
    {
        public int? MaAnh { get; set; }
        public string? TenHinhAnh { get; set; }
        public byte[]? HinhAnh { get; set; }
        public IFormFile? File { get; set; }
    }
}
