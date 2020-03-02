using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CrossJustice.Data
{
    public class DirectiveTransposition
    {
        public DirectiveTransposition()
        {
            this.DirectiveTranspositionLogs = new HashSet<DirectiveTranspositionLog>();
        }
        public string Celex { get; set; }
        public int CountryId { get; set; }
        public string Content { get; set; }
        
        public virtual ICollection<DirectiveTranspositionLog> DirectiveTranspositionLogs { get; set; }
        
        public virtual DirectiveTranspositionLock DirectiveTranspositionLock { get; set; }


    }
}
