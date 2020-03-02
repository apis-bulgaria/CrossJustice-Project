using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CrossJustice.Data
{
    public class Directive
    {
        public int Id { get; set; }
        public string Celex { get; set; }
        public string Caption { get; set; }
        public string Content { get; set; }
    }
}
