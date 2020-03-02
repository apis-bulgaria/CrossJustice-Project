namespace CrossJustice.Services
{
    using System;
    using System.Collections.Generic;
    using System.IO;
    using System.IO.Compression;
    using System.Linq;
    using System.Text;
    using System.Threading.Tasks;
    using CrossJustice.Models.Directive;
    using CrossJustice.Models.RequestModels;
    using Data;
    using Exceptions;
    using Microsoft.EntityFrameworkCore;
    using Models.ResponseModels;

    public class DataService
    {
        private readonly AppDbContext context; // use repo
        private readonly CurrentUserService currentUserService;

        public DataService(AppDbContext context, CurrentUserService currentUserService)
        {
            this.context = context;
            this.currentUserService = currentUserService;
        }

        public List<LanguageModel> GetEuLanguages()
        {
            var res = this.context.Languages.Select(x => new LanguageModel
            {
                Id = x.Id,
                TwoLetter = x.TwoLetter,
                NameEn = x.NameEn,
                Name = x.Name
            }).ToList();
            return res;
        }

        public async Task<IList<DirectiveResponseModel>> GetDirectiveList()
        {
            return await this.context.Directives.Select(x => new DirectiveResponseModel
            {
                Id = x.Id,
                Celex = x.Celex,
                Caption = x.Caption,
                //Content = x.Content
            }).ToListAsync();
        }

        public async Task<DirectiveResponseModel> GetDirective(int id)
        {
            return await this.context.Directives.Where(x => x.Id == id).Select(x => new DirectiveResponseModel
            {
                Id = x.Id,
                Celex = x.Celex,
                Caption = x.Caption,
                Content = x.Content
            }).SingleOrDefaultAsync();
        }

        public async Task<DirectiveTranspositonResponseModel> GetDirectiveTransposition(string celex, int countryId)
        {
            if (!this.currentUserService.IsSuperAdmin())
            {
                var allowedCountries = this.GetAllowedCountries();
                if (!allowedCountries.Contains(countryId))
                {
                    throw new NotAuthorizedException("User doesn't have rights to view this jurisdiction.");
                }
            }

            return await this.context.DirectiveTranspositions.Where(x => x.Celex == celex && x.CountryId == countryId)
                .Select(x => new DirectiveTranspositonResponseModel
                {
                    Celex = x.Celex,
                    CountryId = x.CountryId,
                    Content = x.Content
                }).SingleOrDefaultAsync();
        }

        private List<int> GetAllowedCountries()
        {
            var orgClaim = this.currentUserService.GetCurrentUserOrgClaim();
            var ids = this.context.Jurisdictions
                .Where(x => x.OrganizationJurisdictions.Any(z => z.Organization.ShortName == orgClaim))
                .Select(x => x.Id);
            return ids.ToList();
        }

        public async Task SaveTransposition(SaveTranspositionModel model)
        {
            var dt = await this.context.DirectiveTranspositions.SingleOrDefaultAsync(x =>
                x.Celex == model.Celex && x.CountryId == model.CountryId);
            dt.Content = model.Content;
            this.InsertTranspositionLog(model, dt);
            this.context.SaveChanges();
        }

        private void InsertTranspositionLog(SaveTranspositionModel model, DirectiveTransposition dt)
        {
            var logModel = new DirectiveTranspositionLog
            {
                DirectiveTransposition = dt,
                UserId = this.currentUserService.GetCurrentUserIdClaim(),
                DateModified = DateTime.Now
            };
            var contentArchive = this.GetArchivedString(model.Content);
            logModel.ContentArchive = contentArchive;
            this.context.DirectiveTranspositionLogs.Add(logModel);
        }

        private byte[] GetArchivedString(string content)
        {
            var bytes = Encoding.UTF8.GetBytes(content);
            using var msi = new MemoryStream(bytes);
            using var mso = new MemoryStream();
            using (var gz = new GZipStream(mso, CompressionLevel.Optimal))
            {
                msi.CopyTo(gz);
            }

            return mso.ToArray();
        }

        public async Task<IList<CountryResponseModel>> GetCountries()
        {
            IQueryable<Jurisdiction> res = this.context.Jurisdictions;
            if (!this.currentUserService.IsSuperAdmin())
            {
                var orgClaim = this.currentUserService.GetCurrentUserOrgClaim();
                res = res.Where(x => x.OrganizationJurisdictions.Any(z => z.Organization.ShortName == orgClaim));
            }

            return await res.OrderBy(x => x.JurName)
                .Select(x => new CountryResponseModel
                {
                    Id = x.Id,
                    Title = x.JurName,
                    Code = x.JurCode
                }).ToListAsync();
        }
    }
}