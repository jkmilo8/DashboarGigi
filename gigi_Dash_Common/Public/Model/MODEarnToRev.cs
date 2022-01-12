
namespace ggi_Dash_Common.Public.Model
{
    public class MODEarnToRev
    {
        public int Region { set; get; }
        public string StoreNumber { set; get; }
        public double StoreReceipts { set; get; }
        public double TotalPay { set; get; }
        public double E2R { set; get; }

        public MODEarnToRev()
        {
            Region = 0;
            StoreNumber = "";
            StoreReceipts = 0.0;
            TotalPay = 0.0;
            E2R = 0.0;
        }
    }
}
