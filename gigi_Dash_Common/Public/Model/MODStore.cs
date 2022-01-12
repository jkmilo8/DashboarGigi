
namespace ggi_Dash_Common.Public.Model
{
    public class MODStore
    {
        public string StoreName { set; get; }
        public string City{ set; get; }
        public int StoreNumber { set; get; }        
        public double StoreReceipts { set; get; }
        
        public MODStore()
        {
            StoreName = "";
            City = "";
            StoreNumber = 0;
            StoreReceipts = 0.0;
        }
    }
}
