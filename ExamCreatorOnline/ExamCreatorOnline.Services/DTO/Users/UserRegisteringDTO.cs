namespace ExamCreatorOnline.Services.DTO.Users
{
    using Core.Mapping;
    using Data.Models;
    using System.ComponentModel.DataAnnotations;

    public class UserRegisteringDTO : IMapFrom<User>
    {
        [Required]
        [EmailAddress]
        public string Email { get; set; }

        [Required]
        public string Password { get; set; }

        [Required]
        public string FirstName { get; set; }

        [Required]
        public string LastName { get; set; }

        [Required]
        public int RoleId { get; set; }

        [Required]
        public int FacilityId { get; set; }

        [Required]
        public int CreatorId { get; set; }
    }
}
