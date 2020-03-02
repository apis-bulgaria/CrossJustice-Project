namespace CrossJustice.Models.RequestModels
{
    using ResponseModels;

    public class SaveLegislationModel
    {
        public Nomenclature Jurisdiction { get; set; }

        public LegislationEntry LegislationEntry { get; set; }
    }
}