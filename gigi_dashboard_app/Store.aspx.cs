using ggi_Dash_Business.Public.Ggi;
using ggi_Dash_Common.Public.Enum;
using ggi_Dash_Common.Public.General;
using ggi_Dash_Common.Public.Model;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.IO;
using System.Net;
using System.Text;
using System.Web;
using System.Web.Script.Services;
using System.Web.Services;

namespace ggi_dashboard_app
{
    public partial class Store : System.Web.UI.Page
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
        public static String GetStoreList(string dateFrom, string dateTo, string storeNumber)
        {
            GgiBuss context = new GgiBuss();

            Result<MODStore> rsStore = context.GetStore(dateFrom, dateTo, storeNumber);

            string json = String.Empty;

            if (rsStore.typeMessage == TypeMessage.success)
            {
                json = JsonConvert.SerializeObject(rsStore.ListObject, Newtonsoft.Json.Formatting.Indented);
            }
            else if (rsStore.typeMessage == TypeMessage.danger)
            {
                HttpContext.Current.Session["ErrorCode"] = 703;
                HttpContext.Current.Session["ErrorBody"] = rsStore.Message;
            }
            else
            {
                HttpContext.Current.Session["ErrorCode"] = rsStore.Message.Split('-')[0];
                HttpContext.Current.Session["ErrorTitle"] = rsStore.Message.Split('-')[1];
                HttpContext.Current.Session["ErrorBody"] = rsStore.Message.Split('-')[2];
            }

            return json;

        }

        [WebMethod(EnableSession = true)]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public static String ExportStore(string dateFrom, string dateTo, string storeNumber)
        {

            GgiBuss context = new GgiBuss();

            Result<MODStore> rsStore = context.GetStore(dateFrom, dateTo, storeNumber);

            string json = String.Empty;

            if (rsStore.typeMessage == TypeMessage.success)
            {
                json = JsonConvert.SerializeObject(rsStore.ListObject, Newtonsoft.Json.Formatting.Indented);
            }
            else if (rsStore.typeMessage == TypeMessage.danger)
            {
                HttpContext.Current.Session["ErrorCode"] = 703;
                HttpContext.Current.Session["ErrorBody"] = rsStore.Message;
            }
            else
            {
                HttpContext.Current.Session["ErrorCode"] = rsStore.Message.Split('-')[0];
                HttpContext.Current.Session["ErrorTitle"] = rsStore.Message.Split('-')[1];
                HttpContext.Current.Session["ErrorBody"] = rsStore.Message.Split('-')[2];
            }

            return json;
        }

        #endregion
    }
}