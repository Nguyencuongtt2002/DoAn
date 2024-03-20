using Model;

namespace BLL
{
    public interface IMenuBus
    {
        List<MenuModel> GetALLMenu(int pageIndex, int pageSize, out int total, string TenMenu);
        bool Create(MenuModel them);
        bool Update(MenuModel sua);
        bool Delete(int ma);

    }
}