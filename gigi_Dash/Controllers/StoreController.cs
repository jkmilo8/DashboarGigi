using gigi_Dash_Business.Public.Gigi;
using gigi_Dash_Common.Public.General;
using gigi_Dash_Common.Public.Model;
using System;
using System.Linq;
using System.Web.Mvc;

namespace gigi_Dash.Controllers
{
    public class StoreController : Controller
    {
        // GET: Store
        public ActionResult Index()
        {
            return View();
        }

        [HttpGet]
        public ActionResult GaugeChart()
        {
            string sdate = DateTime.Now.ToString();
            string edate = DateTime.Now.ToString();
            string storeNum = "52310";

            GigiBuss context = new GigiBuss();

            Result<MODStore> stores = context.GetStore(sdate, edate, storeNum);

            return Json(stores.ListObject, JsonRequestBehavior.AllowGet);
        }

    }
}