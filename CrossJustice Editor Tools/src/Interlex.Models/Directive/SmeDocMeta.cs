using System;
using System.Collections.Generic;
using System.Text;

namespace CrossJustice.Models.Directive
{
    public class SmeDocMeta
    {
        public string Title { get; set; }
        public string ShortTitle { get; set; }
        public string SubTitle { get; set; }
        public DateTime? PublicationDate { get; set; }
        public DateTime? ActDate { get; set; }
        public DateTime? LastChangeDate { get; set; }
        public string Language { get; set; }
        public string Country { get; set; }

        public string Idenitifier { get; set; }
        public int DocLangId { get; set; }
        public string DocNumber { get; set; }
        public string ShortLang { get; set; }
        public int LangId { get; set; }
        public int DocType { get; set; }
        public bool IsBlob { get; set; } = false;
        public bool IsConsolidatedEuLegislation => this.Country == "EU" && this.DocType == 2 /*legi*/ && this.DocNumber.StartsWith("0");
    }

}
