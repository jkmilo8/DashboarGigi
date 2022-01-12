using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(gigi_Dash.Startup))]
namespace gigi_Dash
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
