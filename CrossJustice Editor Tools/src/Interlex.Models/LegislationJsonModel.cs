namespace CrossJustice.Models
{
    using RequestModels;

    public class LegislationJsonModel
    {
        public string Title { get; set; }
        public string TitleEn { get; set; }
        public string Eli { get; set; }
        public string ActUrl { get; set; }
        public Nomenclature Jurisdiction { get; set; }
    }
}