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
    public class DonHangBus : IDonHangBus
    {
        private IDonHangDAL _res;
        public DonHangBus(IDonHangDAL res)
        {
            _res = res;
        }
        public List<DonHangModel> GetALL()
        {
            return _res.GetALL();
        }
        public List<ChiTietDonHangModel> GetCTDonHangTheoDonHang(int MaDonHang, int MaSanPham)
        {
            return _res.GetCTDonHangTheoDonHang(MaDonHang,MaSanPham);
        }
        public bool CreateDonHang(DonHangModel model)
        {
            return _res.CreateDonHang(model);
        }
        public List<DonHangModel> LichSuMuaHang(int MaNguoiDung)
        {
            return _res.LichSuMuaHang(MaNguoiDung);
        }
        public bool DuyetDonHang(int ma)
        {
            return _res.DuyetDonHang(ma);
        }
        public bool HuyDonHang(DonHangModel model)
        {
            return _res.HuyDonHang(model);
        }
        public List<LienHeModel> ThongTinLienHe()
        {
            return _res.ThongTinLienHe();
        }

    }
}