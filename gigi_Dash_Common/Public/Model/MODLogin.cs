using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ggi_Dash_Common.Public.Model
{
   public class MODLogin
    {
        public Guid Keylogin { get; set; }

        public int userid { get; set; }

        public int PersonId { get; set; }

        public DateTime DateBegin { get; set; }

        public DateTime DateEnd { get; set; }

        public int Status { get; set; }

        public string Land { get; set; }

        public string Email { get; set; }

        public string Documento { get; set; }

        public string FullName { get; set; }

        public int FarmId { get; set; }
    }
}
