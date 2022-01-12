using gigi_Dash_Common.Public.Interface;
using gigi_Dash_Business.Public.Implements;
using gigi_Dash_Common.Public.General;
using DevExpress.Web.Mvc;
using System.Reflection;
using System.Web.Mvc;

namespace gigi_Dash.Code
{
    public abstract class BaseControllerSBF : Controller
    {
        private IGigi _client;
        public IGigi client
        { get
            {
            if (_client == null)
                _client = new GigiImp();
            return _client;
            }
        }
    }
}