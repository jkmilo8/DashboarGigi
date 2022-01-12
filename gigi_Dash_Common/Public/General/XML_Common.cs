using System.Configuration;
using System.Web;
using System.Xml.Linq;
using System;

namespace ggi_Dash_Common.Public.General
{
    public static class XML_Common
    {
        /// <summary>
        /// Metodo que se encarga de obtener la URL configurada en el archivo
        /// de configuración de la aplicación.
        /// </summary>
        /// <param name="_varString">Nombre de la variable de configuración</param>
        /// <returns>contenido en cadena de texto de la variable de configuración.</returns>
        public static string XmlLoad(string _varString)
        {
            Console.WriteLine(ConfigurationManager.AppSettings[_varString].ToString());
            return ConfigurationManager.AppSettings[_varString].ToString();
        }

        /// <summary>
        /// Metodo que carga el Xml solicitada en un objeto de tipo XDocument
        /// </summary>
        /// <param name="_varStg">Nombre de la variable de configuración</param>
        /// <returns>El objeto que contiene el Xml</returns>
        public static XDocument LoadXmlFile(string _varStg)
        {
            string file = XML_Common.XmlLoad(_varStg);
            string fullPathFile = HttpContext.Current.Server.MapPath(file);
            Console.WriteLine("--->" + fullPathFile);
            return XDocument.Load(fullPathFile);
        }
    }
}