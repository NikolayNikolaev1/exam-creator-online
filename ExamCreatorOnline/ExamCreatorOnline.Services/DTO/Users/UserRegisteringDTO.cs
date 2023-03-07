namespace ExamCreatorOnline.Services.DTO.Users
{
    using Core.Mapping;
    using Data.Models;

    public class UserRegisteringDTO : IMapFrom<User>
    {
        public string Email { get; set; }

        public string Password { get; set; }

        public int RoleId { get; set; }

        public int FacilityId { get; set; }

        public int CreatorId { get; set; }
    }
}
