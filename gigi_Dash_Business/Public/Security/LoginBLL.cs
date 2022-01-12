using ggi_Dash_Common.Public.General;
using ggi_Dash_Common.Public.Model;
using ggi_Dash_DALC.Public.Security;
using System;

namespace ggi_Dash_Business.Public.Security
{
    public class LoginBLL
    {

        LoginDALC dalc = new LoginDALC();
        public Result<string> GetDocument(int personaId)
        {
            return dalc.GetDocument(personaId);
        }
        public Result<MODLogin> GetloginNew(string key)
        {
            return dalc.GetloginNew(key);
        }
        public Result<MODMenuBE> GetMenusNew(int Identifier, string lang)
        {
            return dalc.GetMenusNew(Identifier, lang);
        }
        public Result<bool> Unlogin(Guid sessionId)
        {
            return dalc.Unlogin(sessionId);
        }
    }
}
