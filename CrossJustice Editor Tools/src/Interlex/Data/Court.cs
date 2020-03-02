﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CrossJustice.Data
{
    public class Court
    {
        public string Name { get; set; }
        public int JurId { get; set; }

        public Jurisdiction Jurisdiction { get; set; }
    }
}
