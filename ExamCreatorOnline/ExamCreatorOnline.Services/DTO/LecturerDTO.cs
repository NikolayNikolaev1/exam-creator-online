namespace ExamCreatorOnline.Services.DTO
{
    using Core.Mapping;
    using Data.Models;

    public class LecturerDTO : IMapFrom<User>
    {
        public int Id { get; set; }

        public string Email { get; set; }
    }
}
