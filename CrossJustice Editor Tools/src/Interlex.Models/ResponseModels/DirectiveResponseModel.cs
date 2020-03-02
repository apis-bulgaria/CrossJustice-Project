using System;
using System.Collections.Generic;
using System.Text;

namespace CrossJustice.Models.ResponseModels
{
    public class DirectiveResponseModel
    {
        public int Id { get; set; }
        public string Celex { get; set; }
        public string Caption { get; set; }
        public string Content { get; set; }
    }
}
