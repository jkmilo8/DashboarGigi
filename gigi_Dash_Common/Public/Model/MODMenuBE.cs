using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ggi_Dash_Common.Public.Model
{
    public class MODMenuBE
    {
        public int Id { get; set; }

        public int? FatherId { get; set; }

        public string Controller { get; set; }

        public string Action { get; set; }

        public string Name { get; set; }

        public string Description { get; set; }

        public string Description2 { get; set; }

        public string Path { get; set; }

        public string Icon { get; set; }

        public int Order { get; set; }

        public int Status { get; set; }

        public int typeOption { get; set; }
    }
}