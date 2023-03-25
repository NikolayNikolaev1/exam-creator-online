namespace ExamCreatorOnline.Api.Controllers
{
    using Data.Models;
    using Microsoft.AspNetCore.Mvc;
    using Services;
    using Services.DTO.Users;

    [Route("api/[controller]")]
    [ApiController]
    public class UserController : BaseController
    {
        private IUserService userService;

        public UserController(IUserService userService)
            : base(userService)
        {
            this.userService = userService;
        }

        [HttpPost("~/api/Login")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult> Login([FromBody] UserLogingDTO userDTO)
        {
            if (userDTO == null)
            {
                return BadRequest(userDTO);
            }

            UserDTO user = await this.userService.LoginAsync(userDTO);

            if (user == null)
            {
                return NotFound();
            }

            return Ok(user);
        }

        [HttpPost("~/api/Register")]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        public async Task<ActionResult> Register([FromBody] UserRegisteringDTO userDTO)
        {
            if (userDTO == null)
            {
                return BadRequest(userDTO);
            }
            if (!await IsUserAuthorized(userDTO.CreatorId, Role.Owner))
            {
                return StatusCode(StatusCodes.Status401Unauthorized);
            }

            Role role = await this.userService.FindRoleAsync(userDTO.CreatorId);

            if (role != Role.Owner)
            {
                return StatusCode(StatusCodes.Status401Unauthorized);
            }

            if (await this.userService.ExistsEmailAsync(userDTO.Email))
            {
                ModelState.AddModelError("CustomError", "User email already registered!");
                return BadRequest(ModelState);
            }

            int userId = await this.userService.CreateUserAsync(userDTO);

            return CreatedAtRoute("GetUser", new { id = userId }, userDTO);
        }

        [HttpGet("{id:int}", Name = "GetUser")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(UserDTO))]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult> Get(int id)
        {

            if (!await this.userService.ExistsIdAsync(id))
            {
                return NotFound(id);
            }

            return Ok(await this.userService.FindByIdAsync(id));
        }

        private async Task<bool> IsUserAuthorized(int userId, Role authRole)
        {
            if (!await this.userService.ExistsIdAsync(userId))
            {
                return false;
            }

            Role role = await this.userService.FindRoleAsync(userId);

            if (role != authRole)
            {
                return false;
            }

            return true;
        }
    }
}
