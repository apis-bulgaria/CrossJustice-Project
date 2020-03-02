using Microsoft.AspNetCore.Mvc;

namespace CrossJustice.Controllers
{
    using System;
    using CrossJustice.Models.Directive;
    using CrossJustice.Models.RequestModels;
    using Microsoft.AspNetCore.Authorization;
    using Newtonsoft.Json;
    using Services;
    using System.Linq;
    using System.Threading.Tasks;
    using Exceptions;
    using Models.ResponseModels;

    [Route("api/[controller]")]
    [Authorize]
    [ApiController]
    public class DataController : ControllerBase
    {
        private readonly DataService service;
        private readonly CaseService caseService;

        public DataController(DataService service, CaseService caseService)
        {
            this.service = service;
            this.caseService = caseService;
        }

        [HttpGet("GetEuLanguages")]
        public IActionResult GetEuLanguages()
        {
            var suggestions = this.service.GetEuLanguages();
            return this.Ok(suggestions);
        }

        [HttpGet("GetDirectiveList")]
        [ResponseCache(NoStore = true)]
        public async Task<IActionResult> GetDirectiveList()
        {
            var data = await this.service.GetDirectiveList();
            return this.Ok(data);
        }

        [HttpGet("GetCountries")]
        [ResponseCache(NoStore = true)]
        public async Task<IActionResult> GetCountries()
        {
            var data = await this.service.GetCountries();
            return this.Ok(data);
        }

        [HttpGet("GetDirective/{id:int}")]
        public async Task<IActionResult> GetDirective(int id)
        {
            var data = await this.service.GetDirective(id);
            var smeDoc = JsonConvert.DeserializeObject<SmeDoc>(data.Content);
            return this.Ok(smeDoc);
        }

        [HttpGet("GetDirectiveTransposition/{celex}/{country}")]
        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public async Task<IActionResult> GetDirectiveTransposition(string celex, int country)
        {
            var data = await this.service.GetDirectiveTransposition(celex, country);
            return this.Ok(data);
        }

        [HttpGet("LockDirectiveTransposition/{celex}/{country}")]
        public async Task<IActionResult> LockDirectiveTransposition(string celex, int country)
        {
            var result = await this.service.LockDirectiveTransposition(celex, country);
            return this.Ok(result);
        }

        [HttpGet("UnlockDirectiveTransposition/{celex}/{country}")]
        public async Task<IActionResult> UnlockDirectiveTransposition(string celex, int country)
        {
            try
            {
                await this.service.UnlockDirectiveTransposition(celex, country);
            }
            catch (NotAuthorizedException e)
            {
                return this.BadRequest("Not authorized!");
            }

            return this.Ok();
        }

        [HttpPost("SaveTransposition")]
        [ResponseCache(NoStore = true)]
        public async Task<IActionResult> SaveTransposition(SaveTranspositionModel model)
        {
            try
            {
                await this.service.SaveTransposition(model);
            }
            catch (NotAuthorizedException e)
            {
                return this.BadRequest(e.Message);
            }

            return this.Ok();
        }

        [HttpPost("SaveLegislationEntry")]
        [ResponseCache(NoStore = true)]
        public async Task<IActionResult> SaveLegislationEntry(SaveLegislationModel entry)
        {
            await this.caseService.SaveLegislationEntry(entry);
            return this.Ok();
        }
    }
}