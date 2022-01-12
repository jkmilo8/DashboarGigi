using gigi_Dash_Business.Public.Implements;
using gigi_Dash_Common.Public.General;
using gigi_Dash_Common.Public.Interface;
using gigi_Dash_Common.Public.Model;
using gigi_Dash_Common.Public.Enum;
using gigi_Dash.Code;
using System.Configuration;
using System;
using System.Linq;
using System.Web.Mvc;
using System.Collections.Generic;

namespace gigi_Dash.Controllers
{
    public partial class HomeController : BaseControllerSBF
    {
        [HttpGet]
        //[FilterUser(Roles = "Home_Index")]
        public virtual ActionResult Index()
        {
            return View();
        }

        [HttpPost]
        //[FilterUser(Roles = "Home_Index")]
        public virtual ActionResult Index(FormCollection collection)
        {
            try
            {
                return View();
            }
            catch (Exception ex)
            {
                TempData["_msgType"] = TypeMessage.danger;
                TempData["_msg"] = ex.Message;
                return View();
            }

        }

        [AllowAnonymous]
        public virtual ActionResult Unlogin()
        {
            IGigi context = new GigiImp();
            HttpContext.Session.Abandon();
            HttpContext.Session.RemoveAll();
            HttpContext.Session.Clear();
            return Redirect(ConfigurationManager.AppSettings["urlHome"].ToString());
        }

        [HttpGet]
        [AllowAnonymous]
        public virtual ActionResult Login(string keyLogin)
        {
            try
            {
                if (string.IsNullOrEmpty(keyLogin))
                {
                    TempData["ErrorCode"] = 704;
                    TempData["ErrorTitle"] = XML_Messages.GetXmlMessage(4006, ConfigurationManager.AppSettings["land"].ToString()).Split('-')[0];
                    TempData["ErrorBody"] = XML_Messages.GetXmlMessage(4006, ConfigurationManager.AppSettings["land"].ToString()).Split('-')[1];
                    return View();
                }
                else
                {
                    IGigi context = new GigiImp();
                    Result<MODLogin> result = new Result<MODLogin>();
                    //Result<MODLogin> result = context.Getlogin(keyLogin);

                    result.typeMessage = TypeMessage.success;

                    if (result.typeMessage == TypeMessage.success)
                    {
                        MODUserLogin.KeyLogin = "123456";
                        MODUserLogin.Email = "jkmilo8";
                        MODUserLogin.Name = "Juan Camilo";
                        MODUserLogin.FarmIdentifier = 1;
                        MODUserLogin.IdentifierSession = new Guid(keyLogin);
                        MODUserLogin.BlockIdentifier = 0;
                        MODUserLogin.Identifier = 1;
                        MODUserLogin.IdentifierUser = 1;
                        MODUserLogin.Land = "es";
                        MODUserLogin.Document = "1014186597";

                        Result<MODMenuBE> resultMenPer = context.GetNewMenus(result.Object.userid, result.Object.Land);
                        //MODUserLogin.Menus = resultMenPer.ListObject.ToList();


                        //    MODUserLogin.KeyLogin = keyLogin;
                        //    MODUserLogin.Email = result.Object.Email;
                        //    MODUserLogin.Name = result.Object.FullName;
                        //    MODUserLogin.FarmIdentifier = result.Object.FarmId;
                        //    MODUserLogin.IdentifierSession = new Guid(result.Object.Keylogin.ToString());
                        //    MODUserLogin.BlockIdentifier = 0;
                        //    MODUserLogin.Identifier = result.Object.PersonId;
                        //    MODUserLogin.IdentifierUser = result.Object.userid;
                        //    MODUserLogin.Land = result.Object.Land;
                        //    MODUserLogin.Document = context.GetDocument(result.Object.PersonId).Object;

                        //    Result<MODMenuBE> resultMenPer = context.GetNewMenus(result.Object.userid, result.Object.Land);
                        //    MODUserLogin.Menus = resultMenPer.ListObject.ToList();

                        //    List<MODPermisosBE> permisosList = new List<MODPermisosBE>();
                        //    foreach (var permition in resultMenPer.Lists)
                        //        foreach (MODPermisosBE permi in permition)
                        //            permisosList.Add(permi);

                        //    MODUserLogin.Permisions = permisosList;
                        return RedirectToAction("Index");
                    }
                    else if (result.typeMessage == TypeMessage.danger)
                    {
                        TempData["ErrorCode"] = 703;
                        TempData["ErrorBody"] = result.Message;
                    }
                    else
                    {
                        TempData["ErrorCode"] = result.Message.Split('-')[0];
                        TempData["ErrorTitle"] = result.Message.Split('-')[1];
                        TempData["ErrorBody"] = result.Message.Split('-')[2];
                    }
                }
            }
            catch (Exception ex)
            {
                TempData["ErrorCode"] = 702;
                TempData["ErrorBody"] = ex.Message;
            }
            return View();
        }
    }
}