using BLL;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Model;

namespace ShopThoiTrang.Controllers
{
    [Authorize(Roles = "Admin")]
    [Route("api/[controller]")]
    [ApiController]
    public class AnhController : ControllerBase
    {
        private IAnhBus _Bus;
        public AnhController(IAnhBus Bus)
        {
            _Bus = Bus;
        }
        [AllowAnonymous]
        [Route("get-all")]
        [HttpGet]
        public IEnumerable<AnhModel> GetALL()
        {
            return _Bus.GetALL();
        }
        
    }


}