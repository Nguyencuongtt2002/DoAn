using BLL;
using DAL;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using Model;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace BLL
{
    public class NguoiDungBus : INguoiDungBus
    {
        private INguoiDungDAL _res;
        private string Secret;
        public NguoiDungBus(INguoiDungDAL res, IConfiguration configuration)
        {
            Secret = configuration["AppSettings:Secret"];
            _res = res;
        }
        public NguoiDungModel DangNhap(string TaiKhoan, string MatKhau)
        {
            var nguoidung = _res.DangNhap(TaiKhoan, MatKhau);

            if (nguoidung == null)
                return null;

            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(Secret);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new Claim[]
                {
                    new Claim(ClaimTypes.Name, nguoidung.HoTen.ToString()),
                    new Claim(ClaimTypes.Email, nguoidung.Email.ToString()),
                    new Claim(ClaimTypes.StreetAddress, nguoidung.DiaChi.ToString()),
                    new Claim(ClaimTypes.MobilePhone, nguoidung.SoDienThoai.ToString()),
                    new Claim(ClaimTypes.Role, nguoidung.VaiTro.ToString())
                }),
                Expires = DateTime.UtcNow.AddDays(1),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            nguoidung.Token = tokenHandler.WriteToken(token);

            return nguoidung;
        }
        public NguoiDungModel GetTheoMa(int ma)
        {
            return _res.GetTheoMa(ma);
        }
        public NguoiDungModel CheckTaiKhoan(string TaiKhoan, string Email)
        {
            return _res.CheckTaiKhoan(TaiKhoan,Email);
        }
        public List<NguoiDungModel> GetALL(int? pageIndex, int? pageSize, out int total)
        {
            return _res.GetALL(pageIndex, pageSize, out total);
        }
        public bool Create(NguoiDungModel model)
        {
            return _res.Create(model);
        }
        public bool Update(NguoiDungModel model)
        {
            return _res.Update(model);
        }
        public bool Delete(int ma)
        {
            return _res.Delete(ma);
        }
        public bool ResetMatKhau(NguoiDungModel model)
        {
            return _res.ResetMatKhau(model);
        }
        public bool ConfirmEmail(string token)
        {
            return _res.ConfirmEmail(token);
        }
    }
}