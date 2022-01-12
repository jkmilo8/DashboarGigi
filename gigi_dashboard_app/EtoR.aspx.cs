using ggi_Dash_Business.Public.Ggi;
using ggi_Dash_Common.Public.Enum;
using ggi_Dash_Common.Public.General;
using ggi_Dash_Common.Public.Model;
using Newtonsoft.Json;
using System;
using System.Web;
using System.Web.Script.Services;
using System.Web.Services;

namespace ggi_dashboard_app
{
    public partial class EtoR : System.Web.UI.Page
    {
        #region Eventos

        protected void Page_Load(object sender, EventArgs e)
        {
            try
            {

            }
            catch (Exception ex)
            {
             
            }
        }

        #endregion

        #region Metodos

        [WebMethod(EnableSession = true)]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public static String GetEtoRList(string dateFrom, string dateTo, string storeNumber, string storeRegion)
        {
            GgiBuss context = new GgiBuss();            
            string json = String.Empty;

            if (!String.IsNullOrEmpty(storeNumber) && !String.IsNullOrEmpty(storeRegion))
            {
                json = "Invalid";                
            }
            else
            {
                Result<MODEarnToRev> rsStaff = context.GetEarningsToRevenue(dateFrom, dateTo, storeNumber, storeRegion);
                if (rsStaff.typeMessage == TypeMessage.success)
                {
                    json = JsonConvert.SerializeObject(rsStaff.ListObject, Newtonsoft.Json.Formatting.Indented);
                    
                }
                else
                {
                    json = "Empty";
                }
            }
            return json;
        }

        [WebMethod(EnableSession = true)]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public static String ExportEtoR(string dateFrom, string dateTo, string storeNumber, string storeRegion)
        {

            GgiBuss context = new GgiBuss();
            string json = String.Empty;

            if (!String.IsNullOrEmpty(storeNumber) && !String.IsNullOrEmpty(storeRegion))
            {
                json = "Invalid";
            }
            else
            {
                Result<MODEarnToRev> rsStaff = context.GetEarningsToRevenue(dateFrom, dateTo, storeNumber, storeRegion);
                if (rsStaff.typeMessage == TypeMessage.success)
                {
                    json = JsonConvert.SerializeObject(rsStaff.ListObject, Newtonsoft.Json.Formatting.Indented);

                }
                else
                {
                    json = "Empty";
                }
            }            
            return json;
        }

        #endregion
    }
}