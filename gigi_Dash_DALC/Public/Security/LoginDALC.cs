using Dapper;
using System;
using System.Linq;
using System.Configuration;
using ggi_Dash_Common.Public.Model;
using ggi_Dash_Common.Public.General;
using ggi_Dash_Common.Public.Enum;
using System.Collections.Generic;

namespace ggi_Dash_DALC.Public.Security
{
    public class LoginDALC : BaseDALC
    {
        public Result<string> GetDocument(int personaId)
        {
            Result<string> result = new Result<string>();
            try
            {
                string sql = "pspPayrollUtilities";
                SetConection(DataBaseSelect.TestReplication);
                Open();

                result.Object = Conn.QueryFirstOrDefault<string>(sql, new
                {
                    action = Utilities.getDocument,
                    id = personaId
                },
                    commandType: System.Data.CommandType.StoredProcedure);

                Close();

                if (!string.IsNullOrEmpty(result.Object))
                    result.typeMessage = TypeMessage.success;

            }
            catch (Exception ex)
            {
                result.typeMessage = TypeMessage.danger;
                result.Message = ex.Message;
            }
            return result;
        }

        /// <summary>
        /// Metodo que valida la autenticación del usuario
        /// </summary>
        /// <param name="key">Guid en cadena de caracteres que identifica el login</param>
        /// <param name="_lang">Idioma en el que se espera la respuesta.</param>
        /// <returns> Result<MOD_Login>, información de login</returns>
        public Result<MODLogin> GetloginNew(string key)
        {
            Result<MODLogin> result = new Result<MODLogin>();
            try
            {
                string sql = "pspGetCMSUserDataByKeyLoggin";
                SetConection(DataBaseSelect.TestReplication);
                Open();

                MODLogin _login = Conn.Query(sql,
                new { action = 1, keyloggin = new Guid(key) }, commandType: System.Data.CommandType.StoredProcedure).Select(x => new MODLogin
                {
                    Keylogin = new Guid(x.Keylogin),
                    PersonId = x.peronalId,
                    userid = x.userId,
                    DateBegin = x.DateBegin,
                    DateEnd = x.DateEnd,
                    Status = x.Status,
                    Land = x.Land,
                    Email = x.email,
                    FullName = x.FullName
                }).FirstOrDefault();

                result.Object = _login;
                if (String.Empty != result.Object.Keylogin.ToString() && result.Object.Keylogin.ToString() != "0")
                    result.typeMessage = TypeMessage.success;
                else
                {
                    result.typeMessage = TypeMessage.warning;
                    result.Message = "700";
                }
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

        /// <summary>
        /// Metodo encargado de proporcionar los menus que se deben cargar para el usuario solicitado.
        /// Este metodo adicional a los menu proporciona los permisos necesarios para poder interactuar con el sistema.  La opcion de typeOption que lleguen en 5 son permisos
        /// y las que lleguen en 4 son menus para visualizar, realmente todos son permisos pero las que llegan en cuatro conforman el menu de navegación del usuario.
        /// </summary>
        /// <param name="Identifier">Número unico que identica al usuario.</param>
        /// <returns> Result<MOD_UserProfile>, Información de los menus. </returns>
        public Result<MODMenuBE> GetMenusNew(int Identifier, string lang)
        {

            Result<MODMenuBE> result = new Result<MODMenuBE>();

            var langID = GetLangBy(lang);
            SetConection(DataBaseSelect.TestReplication);
            Open();
            try
            {
                string sql = "pspCMSGetModuleMenu";
                var param = new { action = 2, UserId = Identifier, langId = langID, moduleId = ConfigurationManager.AppSettings["IdModuleProduction"].ToString() };
                var _UserProfiles = Conn.Query<MODMenuBE>(sql, param, commandType: System.Data.CommandType.StoredProcedure);
                param = new { action = 3, UserId = Identifier, langId = langID, moduleId = ConfigurationManager.AppSettings["IdModuleProduction"].ToString() };
                var _UserPermisos = Conn.Query<MODPermisosBE>(sql, param, commandType: System.Data.CommandType.StoredProcedure);
                Close();

                result.ListObject = _UserProfiles.ToList();
                result.ListObject = result.ListObject.OrderBy(x => x.Order).ToList();

                result.Lists = new List<System.Collections.ICollection>();
                result.Lists.Add(_UserPermisos.ToList());
                result.typeMessage = TypeMessage.success;
            }
            catch (Exception ex)
            {
                result.typeMessage = TypeMessage.danger;
                result.Message = ex.Message;
            }
            return result;
        }

        public Guid GetLangBy(string acronym)
        {
            Guid result = new Guid();
            try
            {
                string sql = "pspCMSCrudLang";
                SetConection(DataBaseSelect.TestReplication);
                Open();
                var langs = Conn.Query<dynamic>(sql, new { action = 1 }, commandType: System.Data.CommandType.StoredProcedure);
                var lang = langs.Where(x => x.Acronym.Trim() == acronym).FirstOrDefault();
                if (lang != null)
                    result = new Guid(lang.IdLang);
                Close();

            }
            catch (Exception exp) { Console.WriteLine(exp.Message); }
            return result;
        }

        public Result<bool> Unlogin(Guid sessionId)
        {
            Result<bool> result = new Result<bool>();
            try
            {
                string sql = string.Empty;
                sql = string.Format(@"Siembra_Unlogin");
                Open();
                var resl = Conn.Query<int>(sql, new { sessionId = sessionId }, commandType: System.Data.CommandType.StoredProcedure).FirstOrDefault();
                Close();

                if (resl == 1)
                {
                    result.Object = true;
                    return result;

                }
                else
                {
                    result.Object = false;
                    result.typeMessage = TypeMessage.warning;
                    return result;
                }
            }
            catch (Exception ex)
            {
                result.Object = false;
                result.typeMessage = TypeMessage.danger;
                result.Message = ex.Message;
                return result;
            }
        }
    }
}
