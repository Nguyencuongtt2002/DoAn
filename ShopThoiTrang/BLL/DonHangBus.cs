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
        public DonHangModel GetTheoMa(int? ma)
        {
            return _res.GetTheoMa(ma);
        }
        public DonHangModel GetNew()
        {
            return _res.GetNew();
        }
        public List<ChiTietDonHangModel> GetCTDonHangTheoDonHang(int? MaDonHang)
        {
            return _res.GetCTDonHangTheoDonHang(MaDonHang);
        }
        public bool CreateDonHang(DonHangModel model)
        {
            return _res.CreateDonHang(model);
        }
        public List<DonHangModel> LichSuMuaHang(int MaNguoiDung)
        {
            return _res.LichSuMuaHang(MaNguoiDung);
        }
        public bool CapNhatDonHang(DonHangModel model)
        {
            return _res.CapNhatDonHang(model);
        }
        public bool CapNhatDonHangKhiGiao(DonHangModel model)
        {
            return _res.CapNhatDonHangKhiGiao(model);
        }
        public bool DuyetDonHang(DonHangModel model)
        {
            return _res.DuyetDonHang(model);
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