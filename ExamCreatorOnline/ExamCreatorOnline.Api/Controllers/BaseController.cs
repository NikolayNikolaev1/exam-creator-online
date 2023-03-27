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
            this.userService = userService;
        }

        protected IUserService UserService { get; set; }

        protected async Task<bool> IsUserAuthorizedAsync(int userId, Role authRole, int propertyId = -1)
        {
            if (!await this.userService.ExistsIdAsync(userId))
            {
                return false;
            }


            if (await this.userService.FindRoleAsync(userId) != authRole)
            {
                return false;
            }


            if (authRole == Role.Lecturer &&
                propertyId != -1 &&
                !await this.userService.HasExamIdAsync(userId, propertyId))
            {
                return false;
            }

            if (authRole == Role.Owner &&
                propertyId != -1 &&
                !await this.userService.IsFacilityOwnerAsync(userId, propertyId))
            {
                return false;
            }

            return true;
        }
    }
}
