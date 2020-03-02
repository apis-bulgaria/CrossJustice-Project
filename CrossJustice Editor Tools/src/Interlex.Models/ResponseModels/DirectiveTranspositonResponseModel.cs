using System;
using System.Collections.Generic;
using System.Text;

namespace CrossJustice.Models.ResponseModels
{
    public class DirectiveTranspositonResponseModel
    {
        public string Celex { get; set; }
        public int CountryId { get; set; }
        public string Content { get; set; }
        public bool IsLockedByCurrentUser { get; set; }
    }
}
