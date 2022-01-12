using gigi_Dash_Business.Public.Gigi;
using gigi_Dash_Common.Public.General;
using gigi_Dash_Common.Public.Interface;
using gigi_Dash_Common.Public.Model;
using gigi_DashApp.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Diagnostics;
using System.Linq;


namespace gigi_DashApp.Controllers
{
    public class HomeController : Controller
    {
        private readonly ILogger<HomeController> _logger;

        public HomeController(ILogger<HomeController> logger)
        {
            _logger = logger;
        }

        public IActionResult Index()
        {
            return View();
        }
                
        public IActionResult Privacy()
        {
            return View();
        }

        [HttpGet]        
        public ActionResult GaugeChart()
        {
            DateTime starD = DateTime.Now; 
            DateTime edate = DateTime.Now; 
            int storeNumber = 52310;
            GigiBuss context = new GigiBuss();

            Result<MODStore> resultStore = context.GetStore(starD, edate, storeNumber);

            return Json(resultStore.Lists);
        }                

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}
