using gigi_Dash_Common.Public.Model;
using System.Linq;
using System.Web.Mvc;

namespace gigi_Dash.Code
{
    public class FilterUserAttribute : AuthorizeAttribute
    {
        protected override void HandleUnauthorizedRequest(AuthorizationContext filterContext)
        {

            string currentAction = "", currentController = "";
            if (string.IsNullOrEmpty(Roles))
            {
                currentAction = filterContext.RequestContext.RouteData.GetRequiredString("action");
                currentController = filterContext.RequestContext.RouteData.GetRequiredString("controller");
            }
            else
            {
                currentAction = Roles.Split('_')[1];
                currentController = Roles.Split('_')[0];
            }

            if (MODUserLogin.Menus == null)
            {
                filterContext.Result = new ViewResult { ViewName = "~/Views/Shared/Unlogin.cshtml" };
            }
            else if (!MODUserLogin.Menus.Any(x => (x.Action == currentAction) && (x.Controller == currentController)))
            {
                filterContext.Result = new ViewResult { ViewName = "~/Views/Shared/Unauthorized.cshtml" };
            }
        }

    }
}