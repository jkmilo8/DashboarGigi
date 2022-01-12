using ggi_Dash_Common.Public.General;
using ggi_Dash_Common.Public.Model;
using ggi_Dash_DALC.Public;
using System.Collections.Generic;
using System.Linq;
using System;


namespace ggi_Dash_Business.Public.Ggi
{
    public class GgiBuss
    {
        private TestReplicationDALC RepDALC = new TestReplicationDALC();
        private AbilaDALC AbilaDALC = new AbilaDALC();
        public Result<MODStore> GetStore(string startDate, string endDate, string storeNumber)
        {
            return RepDALC.GetStore(startDate, endDate, storeNumber);
        }

        public Result<MODStaff> GetStaff(string startDate, string endDate, string storeNumber, string storeRegion)
        {
            return AbilaDALC.GetStaff(startDate, endDate, storeNumber, storeRegion);
        }
        public Result<MODEarnToRev> GetEarningsToRevenue(string startDate, string endDate, string storeNumber, string storeRegion)
        {
            return AbilaDALC.GetEarningsToRevenue(startDate, endDate, storeNumber, storeRegion);
        }
    }
}
