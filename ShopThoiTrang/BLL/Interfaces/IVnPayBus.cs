using Microsoft.AspNetCore.Http;
using Model;

namespace BLL
{
    public interface IVnPayBus
    {
        string CreatePaymentUrl(PaymentInformationModel model, HttpContext context);
        VnPaymentModel PaymentExecute(IQueryCollection collections);
    }
}
