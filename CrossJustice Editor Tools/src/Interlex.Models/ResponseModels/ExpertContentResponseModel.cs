namespace CrossJustice.Models.ResponseModels
{
    using System.Collections.Generic;

    public class ExpertContentResponseModel : CaseMetaContentResponseModel
    {
        public List<FileResponseModel> Files { get; set; }
    }
}