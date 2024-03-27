using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Model
{
    public class PaymentInformationModel
    {
        public int OrderId { get; set; }
        public string Name { get; set; }
        public double Amount { get; set; }
        public string OrderDescription { get; set; }
        public string OrderType { get; set; }
        public string Url { get; set; }
    }
}
