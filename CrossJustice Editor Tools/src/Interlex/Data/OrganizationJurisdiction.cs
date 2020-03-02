namespace CrossJustice.Data
{
    public class OrganizationJurisdiction
    {
        public string OrganizationId { get; set; }
        public int JurisdictionId { get; set; }

        public virtual Jurisdiction Jurisdiction { get; set; }
        public virtual Organization Organization { get; set; }
    }
}