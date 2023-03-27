namespace ExamCreatorOnline.Api.Controllers
{
    using Data.Models;
    using Microsoft.AspNetCore.Mvc;
    using Services;
    using Services.DTO.Facility;

    [Route("api/[controller]")]
    [ApiController]
    public class FacilityController : BaseController
    {
        private readonly IFacilityService facilityService;

        public FacilityController(IFacilityService facilityService, IUserService userService)
            : base(userService)
        {
            this.facilityService = facilityService;
        }

        [HttpPost()]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        public async Task<ActionResult> Create([FromBody] FacilityCreatingDTO facilityDTO)
        {
            if (facilityDTO == null)
            {
                return BadRequest(facilityDTO);
            }


            if (!await base.IsUserAuthorizedAsync(facilityDTO.AdminId, Role.Admin))
            {
                return StatusCode(StatusCodes.Status401Unauthorized);
            }

            if (await base.UserService.ExistsEmailAsync(facilityDTO.Email))
            {
                ModelState.AddModelError("CustomError", "User email already registered!");
                return BadRequest(ModelState);
            }

            await this.facilityService.CreateAsync(facilityDTO);


            return Ok();
        }


        [HttpGet("{id:int}", Name = "GetFacility")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(FacilityDTO))]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult> Get(int id)
        {
            if (!await this.facilityService.ExistsIdAsync(id))
            {
                return NotFound();
            }

            return Ok(await this.facilityService.FindByIdAsync(id));
        }

        [HttpPut("{id:int}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult> Update(int id, [FromBody] FacilityUpdatingDTO facilityDTO)
        {
            if (!await this.facilityService.ExistsIdAsync(id))
            {
                return NotFound(id);
            }

            FacilityDTO facility = await this.facilityService.FindByIdAsync(id);

            if (!await base.IsUserAuthorizedAsync(facilityDTO.OwnerId, Role.Owner, id))
            {
                return StatusCode(StatusCodes.Status401Unauthorized);
            }

            if (facilityDTO == null)
            {
                return BadRequest(facilityDTO);
            }

            await this.facilityService.UpdateAsync(id, facilityDTO);

            return Ok();
        }
    }
}
