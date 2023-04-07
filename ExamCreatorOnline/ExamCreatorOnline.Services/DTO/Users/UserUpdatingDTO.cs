namespace ExamCreatorOnline.Services.DTO.Users
{
    using Core.Mapping;
    using Data.Models;

    public class UserUpdatingDTO : IMapFrom<User>
    {

        public string FirstName { get; set; }

        public string LastName { get; set; }

        public int UserId { get; set; }
    }
}
