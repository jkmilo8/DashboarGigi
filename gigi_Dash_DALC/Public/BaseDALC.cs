using System.Data;
using System.Configuration;
using System.Data.SqlClient;
using ggi_Dash_Common.Public.Enum;

namespace ggi_Dash_DALC.Public
{
    public abstract class BaseDALC
    {
        public System.Data.Common.DbConnection Conn { get; set; }

        public void Open()
        {
            if (Conn.State != ConnectionState.Open)
            {
                Conn.Open();
            }
        }

        public void Close()
        {
            if (Conn.State == ConnectionState.Open)
            {
                Conn.Close();
            }
        }

        public void SetConection(DataBaseSelect conection)
        {
            if(Conn != null)
                Conn.Dispose();
            Conn = new SqlConnection(GetConection(conection));
        }

        string GetConection(DataBaseSelect conection)
        {
            if (conection == DataBaseSelect.TestReplication)
                return ConfigurationManager.ConnectionStrings["xConTestReplication"].ConnectionString;            
            else if (conection == DataBaseSelect.ggidata)
                return ConfigurationManager.ConnectionStrings["xConggidata"].ConnectionString;
            else if (conection == DataBaseSelect.Abila)
                return ConfigurationManager.ConnectionStrings["xConAbila"].ConnectionString;

            return "";
        }
    }
}
