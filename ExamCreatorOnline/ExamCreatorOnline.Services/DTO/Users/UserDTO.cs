namespace ExamCreatorOnline.Services.DTO.Users
{
    using Core.Mapping;
    using Data.Models;
    using Exams;

    public class UserDTO : IMapFrom<User>
    {
        public int Id { get; set; }

        public string Email { get; set; }

        public string Role { get; set; }

        public IEnumerable<ExamDTO> Exams { get; set; }
    }
}
