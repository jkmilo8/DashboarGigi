using Dapper;
using System;
using System.Linq;
using ggi_Dash_Common.Public.Enum;
using ggi_Dash_Common.Public.General;
using ggi_Dash_Common.Public.Model;


namespace ggi_Dash_DALC.Public
{
    public class AbilaDALC : BaseDALC
    {
        public Result<MODStaff> GetStaff(string startDate, string endDate, string storeNumber, string storeRegion)
        {
            Result<MODStaff> result = new Result<MODStaff>();
            try
            {
                string sql = "[GetEmployeeHoursRatePay]";
                SetConection(DataBaseSelect.Abila);

                Open();

                result.ListObject = Conn.Query<MODStaff>(sql, new
                {
                    Store = String.IsNullOrEmpty(storeNumber) ? null : storeNumber,
                    StartDate = startDate,
                    EndDate = endDate, 
                    StoreRegion = String.IsNullOrEmpty(storeRegion) ? 0 : Int32.Parse(storeRegion)
                },
                    commandType: System.Data.CommandType.StoredProcedure);

                if (result.ListObject.Count() > 0)
                    result.typeMessage = TypeMessage.success;
                else
                    result.typeMessage = TypeMessage.warning;
            }
            catch (Exception ex)
            {
                result.typeMessage = TypeMessage.danger;
                result.Message = ex.Message;
            }
            finally
            {
                Close();
            }

            return result;
        }

        public Result<MODEarnToRev> GetEarningsToRevenue(string startDate, string endDate, string storeNumber, string storeRegion)
        {
            Result<MODEarnToRev> result = new Result<MODEarnToRev>();
            try
            {
                string sql = "[GetEarningsToRevenue]";
                SetConection(DataBaseSelect.Abila);

                Open();

                result.ListObject = Conn.Query<MODEarnToRev>(sql, new
                {
                    StoreNumber = String.IsNullOrEmpty(storeNumber) ? null : storeNumber,
                    StartDate = startDate,
                    EndDate = endDate,
                    StoreRegion = String.IsNullOrEmpty(storeRegion) ? 0 : Int32.Parse(storeRegion)
                },
                    commandType: System.Data.CommandType.StoredProcedure);

                if (result.ListObject.Count() > 0)
                    result.typeMessage = TypeMessage.success;
                else
                    result.typeMessage = TypeMessage.warning;
            }
            catch (Exception ex)
            {
                result.typeMessage = TypeMessage.danger;
                result.Message = ex.Message;
            }
            finally
            {
                Close();
            }

            return result;
        }

    }
}
