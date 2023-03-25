namespace ExamCreatorOnline.Api.Controllers
{
    using Data.Models;
    using Microsoft.AspNetCore.Mvc;
    using Services;

    public class BaseController : ControllerBase
    {
        private readonly IUserService userService;

        public BaseController(IUserService userService)
        {
            this.UserService = userService;
        }

        protected IUserService UserService { get; set; }

        protected async Task<bool> IsUserAuthorizedAsync(int userId, Role authRole, int examId = -1)
        {
            if (!await this.userService.ExistsIdAsync(userId))
            {
                return false;
            }


            if (await this.userService.FindRoleAsync(userId) != authRole)
            {
                return false;
            }


            if (examId != -1 && !await this.userService.HasExamIdAsync(userId, examId))
            {
                return false;
            }

            return true;
        }
    }
}
