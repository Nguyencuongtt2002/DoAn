﻿using Model;

namespace BLL
{
    public interface IGiamGiaBus
    {
        List<GiamGiaModel> GetALL(int? pageIndex, int? pageSize, out int total);
        bool Create(GiamGiaModel them);
        bool Update(GiamGiaModel sua);
        bool Delete(int ma);
        GiamGiaModel GetGiamGiaTheoSanPham(int MaSanPham);

    }
}