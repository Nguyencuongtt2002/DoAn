using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Model
{
    public class SlideModel
    {
        public int MaSlide { get; set; }
        public string? Anh { get; set; }
        public IFormFile? File { get; set; }
    }
}
