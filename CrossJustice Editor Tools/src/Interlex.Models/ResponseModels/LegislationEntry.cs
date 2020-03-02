namespace CrossJustice.Models.ResponseModels
{
    public class LegislationEntry
    {
        public string Title { get; set; }
        public string TitleEn { get; set; }
        public string Url { get; set; }
        public string Eli { get; set; }

        public bool Include { get; set; }
    }
}