using System;
using System.Collections.Generic;
using System.Text;

namespace CrossJustice.Models.RequestModels
{
    public class SaveTranspositionModel
    {
        public string Celex { get; set; }
        public int CountryId { get; set; }
        public string Content { get; set; }
    }
}
