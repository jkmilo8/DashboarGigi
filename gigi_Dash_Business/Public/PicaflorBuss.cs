using Sunshine_Bouquet_Common.Public.General;
using Sunshine_Bouquet_Common.Public.Model;
using Sunshine_Bouquet_DALC.Public;
using System;

namespace Sunshine_Bouquet_Business.Public
{
    public class PicaflorBuss
    {
        private PicaflorDALC picaflorDALC = new PicaflorDALC();
        public Result<MODPicaflorHead> GetPicaflorHead(int productionLine, DateTime dateProduction, int farmId)
        {
            return picaflorDALC.GetPicaflorHead(productionLine, dateProduction, farmId);
        }
        public Result<MODPicaflorRecipe> GetRecipes(int workOrderId)
        {
            return picaflorDALC.GetRecipes(workOrderId);
        }
        public Result<MODPicaflorFarm> GetPicaflorFarms()
        {
            return picaflorDALC.GetPicaflorFarms();
        }
        public Result<MODPicaflorNotes> GetNotes(int workOrderId)
        {
            return picaflorDALC.GetNotes(workOrderId);
        }
    }
}
