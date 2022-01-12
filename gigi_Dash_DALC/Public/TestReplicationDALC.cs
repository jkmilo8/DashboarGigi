using Dapper;
using System;
using System.Linq;
using ggi_Dash_Common.Public.Enum;
using ggi_Dash_Common.Public.General;
using ggi_Dash_Common.Public.Model;


namespace ggi_Dash_DALC.Public
{
    public class TestReplicationDALC:BaseDALC
    {
        public Result<MODStore> GetStore(string startDate, string endDate, string storeNumber)
        {
            Result<MODStore> result = new Result<MODStore>();
            try
            {
                string sql = "[GetStoreData]";
                SetConection(DataBaseSelect.TestReplication);

                Open();

                result.ListObject = Conn.Query<MODStore>(sql, new
                {
                    StoreNumber = String.IsNullOrEmpty(storeNumber) ? null : storeNumber,
                    StartDate = startDate,
                    EndDate = endDate                    
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
