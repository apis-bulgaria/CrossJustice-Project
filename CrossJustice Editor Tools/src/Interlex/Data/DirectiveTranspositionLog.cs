namespace CrossJustice.Data
{
    using System;

    public class DirectiveTranspositionLog
        {
            public int Id { get; set; }
            public string UserId { get; set; }
            public string DirectiveTranspositionCelex { get; set; }
            public int DirectiveTranspositionCountryId { get; set; }
            
            public DateTime DateModified { get; set; }

            public byte[] ContentArchive { get; set; }

            public virtual DirectiveTransposition DirectiveTransposition { get; set; }
            public virtual ApplicationUser User { get; set; }
        }
}