﻿using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Model
{
    public class GioiThieuModel
    {
        public int MaGioiThieu { get; set; }
        public string? TieuDe { get; set; }
        public string NoiDung { get; set; }
        public byte[]? HinhAnh { get; set; }
        public IFormFile? File { get; set; }
    }
}
