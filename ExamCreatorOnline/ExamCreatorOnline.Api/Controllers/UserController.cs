namespace ExamCreatorOnline.Api.Controllers
{
    using Data.Models;
    using ExamCreatorOnline.Api.Models;
    using Microsoft.AspNetCore.Mvc;
    using Services;

    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private IUserService userService;

        public UserController(IUserService userService)
        {
            this.userService = userService;
        }

        [HttpPost]
        public async Task<ActionResult<User>> Create([FromBody]SystemUserDTO userDTO)
        {
            if (userDTO == null)
            {
                return BadRequest(userDTO);
            }

            await this.userService.CreateSystemOwnerAsync(userDTO.Email, userDTO.Password, userDTO.FacultyName);


            return Ok();
        }
    }
}
