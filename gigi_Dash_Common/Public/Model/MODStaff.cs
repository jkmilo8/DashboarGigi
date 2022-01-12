
namespace ggi_Dash_Common.Public.Model
{
    public class MODStaff
    {
        public int StoreNumber { set; get; }
        public string LastName { set; get; }
        public string FirstName { set; get; }
        public int EmployeeID { set; get; }
        public double HourlyRate { set; get; }
        public double TotalHours { set; get; }
        public double TotalPay { set; get; }

        public MODStaff()
        {
            StoreNumber = 0;
            LastName = "";
            FirstName = "";
            EmployeeID = 0;
            HourlyRate = 0.0;
            TotalHours = 0.0;
            TotalPay = 0.0;
        }
    }
}
