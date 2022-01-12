using System;
using System.Collections;
using System.Collections.Generic;
using ggi_Dash_Common.Public.Enum;

namespace ggi_Dash_Common.Public.General
{
    [Serializable]

    public class Result<T>
    {
        /// <summary>
        /// Mensaje resultante de la solicitud
        /// </summary>
        public int ErrorCode { get; set; }
        /// <summary>
        /// Mensaje resultante de la solicitud
        /// </summary>
        private string message = string.Empty;
        /// <summary>
        /// Mensaje resultante de la solicitud
        /// </summary>
        public string Message { get { return message.Replace("\r", " ").Replace("\n", " "); } set { message = value; } }

        /// <summary>
        /// Enumerado que identifica el tipo de resultado obtenido
        /// </summary>
        /// 
        //public TypeMessage typeMessage { get; set; }

        /// <summary>
        /// Resultado en lista
        /// </summary>
        public IEnumerable<T> ListObject { get; set; }

        /// <summary>
        /// Resultado en multiples listas si es requerido.
        /// </summary>
        public List<ICollection> Lists { get; set; }

        /// <summary>
        /// Resultado en el tipo establecido.
        /// </summary>
        public T Object { get; set; }

        /// <summary>
        /// Resultado Establecido en texto plano.
        /// </summary>
        public string InternalText { get; set; }

        /// <summary>
        /// Validador de contenido en la lista.
        /// </summary>
        public bool HasListObject { get { return ListObject == null ? false : true; } }

        /// <summary>
        /// Validador de contenido en la listas.
        /// </summary>
        public bool HasLists { get { return Lists == null ? false : true; } }

        /// <summary>
        /// Contar cuantas listas posee el archivo.
        /// </summary>
        public int CountLists { get { return HasLists ? Lists.Count : 0; } }

        /// <summary>
        /// Validador de contenido 
        /// </summary>
        public bool HasObject { get { return Object == null ? false : true; } }

        /// <summary>
        /// Enumerado que identifica el tipo de resultado obtenido
        /// </summary>
        /// 
        public TypeMessage typeMessage { get; set; }
    }
}
