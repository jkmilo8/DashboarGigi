using MvcSiteMapProvider;
using gigi_Dash_Common.Public.Model;
using System.Collections.Generic;

namespace gigi_Dash.Code
{
    public class Menus : DynamicNodeProviderBase
    {
        public override IEnumerable<DynamicNode> GetDynamicNodeCollection(ISiteMapNode node)
        {
            foreach (MODMenuBE item in MODUserLogin.Menus)
            {
                if (string.IsNullOrEmpty(item.Controller)) item.Controller = "Home";
                if (string.IsNullOrEmpty(item.Action)) item.Action = "Index";

                DynamicNode dynamicNode = new DynamicNode(item.Id.ToString(), item.FatherId.ToString(), item.Name, item.Description, item.Controller, item.Action);
                dynamicNode.ImageUrl = item.Icon.Replace("undefined", "");

                yield return dynamicNode;
            }
        }
    }
}