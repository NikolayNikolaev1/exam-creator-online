namespace ExamCreatorOnline.Api.Controllers
{
    using Data.Models;
    using Microsoft.AspNetCore.Mvc;
    using Services;

    public class BaseController : ControllerBase
    {
        private IUserService userService;

        public BaseController(IUserService userService)
        {
            this.UserService = userService;
        }

        protected IUserService UserService 
        { 
            get 
            { 
                return this.userService; 
            } 
            set 
            { 
                this.userService = value; 
            } 
        }

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
