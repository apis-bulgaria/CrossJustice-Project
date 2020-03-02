namespace CrossJustice.Data
{
    public class DirectiveTranspositionLock
    {
        public string Celex { get; set; }
        public int CountryId { get; set; }
        public string UserId { get; set; }

        public virtual DirectiveTransposition DirectiveTransposition { get; set; }
        public virtual ApplicationUser User { get; set; }
    }
}