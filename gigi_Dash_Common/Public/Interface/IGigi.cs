using ggi_Dash_Common.Public.General;
using ggi_Dash_Common.Public.Model;
namespace ggi_Dash_Common.Public.Interface
{
    public interface IGgi
    {
        Result<string> GetDocument(int personaId);
        Result<MODLogin> Getlogin(string key);
        //Result<MODMenuBE> GetMenus2(int Identifier);
        Result<MODMenuBE> GetNewMenus(int Identifier, string lang);
    }
}
