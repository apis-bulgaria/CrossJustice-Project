﻿using System;
using System.Collections.Generic;
using System.Text;

namespace CrossJustice.Models.RequestModels
{
    public class CaseListRequestModel
    {
        public string Filter { get; set; }
        public string PageNumber { get; set; }
        public string Count { get; set; }
        public string Organization { get; set; }
        public string JurisdictionCode { get; set; }
    }
}