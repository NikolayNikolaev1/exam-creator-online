namespace ExamCreatorOnline.Services.DTO
{
    using Core.Mapping;
    using Data.Models;
    using System.ComponentModel.DataAnnotations;

    public class LecturerDTO : IMapFrom<User>
    {
        public int Id { get; set; }

        [Required]
        public string Email { get; set; }
    }
}
