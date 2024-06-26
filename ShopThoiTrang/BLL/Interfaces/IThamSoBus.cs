﻿using Model;

namespace BLL
{
    public interface IThamSoBus
    {
        ThamSoModel GetTheoMa(int ma);
        ThamSoModel GetTheoKyHieu(string kyhieu);
        List<ThamSoModel> GetALL();
        bool Create(ThamSoModel them);
        bool Update(ThamSoModel sua);
        bool Delete(int ma);

    }
}