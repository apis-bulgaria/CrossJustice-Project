using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CrossJustice.Data
{
    public class Jurisdiction
    {
        public Jurisdiction()
        {
            Courts = new HashSet<Court>();
            CourtsEng = new HashSet<CourtEng>();
            Sources = new HashSet<Source>();
        }

        public int Id { get; set; }
        public string JurCode { get; set; }
        public string JurName { get; set; }

        public ICollection<Court> Courts { get; set; }
        public ICollection<CourtEng> CourtsEng { get; set; }
        public ICollection<Source> Sources { get; set; }
        
        public virtual ICollection<OrganizationJurisdiction> OrganizationJurisdictions { get; set; }

    }
}
