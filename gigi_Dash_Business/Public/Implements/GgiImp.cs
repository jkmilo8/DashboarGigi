using ggi_Dash_Common.Public.Interface;
using ggi_Dash_Common.Public.General;
using ggi_Dash_Common.Public.Model;
using ggi_Dash_Business.Public.Security;

namespace ggi_Dash_Business.Public.Implements
{
    public partial class GgiImp : IGgi
    {
        public Result<MODLogin> Getlogin(string key)
        {
            LoginBLL loginBLL = new LoginBLL();
            return loginBLL.GetloginNew(key);
        }

        public Result<string> GetDocument(int personaId)
        {
            LoginBLL loginBLL = new LoginBLL();
            return loginBLL.GetDocument(personaId);
        }

        public Result<MODMenuBE> GetNewMenus(int Identifier, string lang)
        {
            LoginBLL loginBLL = new LoginBLL();
            return loginBLL.GetMenusNew(Identifier, lang);
        }
    }
}
