using BLL;
using DAL;
using Microsoft.AspNetCore.Http;
using Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BLL
{
    public class VnPayBus : IVnPayBus
    {
        private IVnPayDAL _res;
        public VnPayBus(IVnPayDAL res)
        {
            _res = res;
        }
        public string CreatePaymentUrl(PaymentInformationModel model, HttpContext context)
        {
            return _res.CreatePaymentUrl(model, context);
        }
        public VnPaymentModel PaymentExecute(IQueryCollection collections)
        {
            return _res.PaymentExecute(collections);
        }
    }
}