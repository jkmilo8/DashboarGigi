using System.Linq;
using System.Xml.Linq;

namespace ggi_Dash_Common.Public.General
{
    public class XML_Messages
    {
        /// <summary>
        /// Metodo que busca un mensaje del sistema por código.
        /// </summary>
        /// <param name="_code">Identificador unico del mensaje.</param>
        /// <param name="_lang">Idioma en el cual se solicita el mensaje</param>
        /// <returns>Cadena de caracteres correspondiente al mensaje</returns>
        public static string GetXmlMessage(int _code, string _lang)
        {
            string message = string.Empty;
            XDocument _xml = XML_Common.LoadXmlFile(string.Format(@"XmlMessagesDirectoryProduction-{0}", _lang.ToUpper()));

            var query = from msg in _xml.Elements("messages").Elements()
                        where msg.Attribute("code").Value == _code.ToString()
                        select msg;

            if (query.SingleOrDefault() != null)
            {
                message = query.Single().Value;
            }
            return message;
        }
    }
}
