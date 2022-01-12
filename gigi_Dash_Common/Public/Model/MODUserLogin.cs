using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web;

namespace ggi_Dash_Common.Public.Model
{
    public static class MODUserLogin
    {
        public static string Name
        {
            get
            {
                return HttpContext.Current.Session["name"].ToString();
            }
            set
            {
                HttpContext.Current.Session.Add("name", value);
            }
        }
        public static string Land
        {
            get
            {
                return HttpContext.Current.Session["land"].ToString();
            }
            set
            {
                HttpContext.Current.Session.Add("land", value);
            }
        }
        public static string Email
        {
            get
            {
                return HttpContext.Current.Session["email"].ToString();
            }
            set
            {
                HttpContext.Current.Session.Add("email", value);
            }
        }
        public static string Document
        {
            get
            {
                return HttpContext.Current.Session["documento"].ToString();
            }
            set
            {
                HttpContext.Current.Session.Add("documento", value);
            }
        }
        public static int Identifier
        {
            get
            {
                return int.Parse(HttpContext.Current.Session["identifier"].ToString());
            }
            set
            {
                HttpContext.Current.Session.Add("identifier", value);
            }
        }
        public static int FarmIdentifier
        {
            get
            {
                return int.Parse(HttpContext.Current.Session["farmIdentifier"].ToString());
            }
            set
            {
                HttpContext.Current.Session.Add("farmIdentifier", value);
            }
        }
        public static int BlockIdentifier
        {
            get
            {
                return int.Parse(HttpContext.Current.Session["BlockIdentifier"].ToString());
            }
            set
            {
                HttpContext.Current.Session.Add("BlockIdentifier", value);
            }
        }
        public static int IdentifierUser
        {
            get
            {
                return int.Parse(HttpContext.Current.Session["identifierUser"].ToString());
            }
            set
            {
                HttpContext.Current.Session.Add("identifierUser", value);
            }
        }
        public static Guid IdentifierSession
        {
            get
            {
                return Guid.Parse(HttpContext.Current.Session["IdentifierSession"].ToString());
            }
            set
            {
                HttpContext.Current.Session.Add("IdentifierSession", value);
            }
        }
        public static List<MODMenuBE> Menus
        {
            get
            {
                return (List<MODMenuBE>)HttpContext.Current.Session["MenusGuati"];
            }
            set
            {
                HttpContext.Current.Session.Add("MenusGuati", value);
            }
        }
        public static List<MODPermisosBE> Permisions
        {
            get
            {
                return (List<MODPermisosBE>)HttpContext.Current.Session["Permisions"];
            }
            set
            {
                HttpContext.Current.Session.Add("Permisions", value);
            }
        }
        public static string text
        {
            get
            {
                return HttpContext.Current.Session["text"].ToString();
            }
            set
            {
                HttpContext.Current.Session.Add("text", value);
            }
        }
        public static string KeyLogin
        {
            get
            {
                return HttpContext.Current.Session["KeyLogin"].ToString();
            }
            set
            {
                HttpContext.Current.Session.Add("KeyLogin", value);
            }
        }
    }
}