using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ggi_Dash_Common.Public.Model
{
    public class MODPermisosBE
    {
        public int Id { get; set; }
        public int FatherId { get; set; }
        public string Controller { get; set; }
        public string Action { get; set; }
        public string permission { get; set; }
        public string Status { get; set; }
        public int Order { get; set; }
    }
}