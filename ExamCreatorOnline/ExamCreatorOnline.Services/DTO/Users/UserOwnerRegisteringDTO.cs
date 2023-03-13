namespace ExamCreatorOnline.Services.DTO.Users
{
    using Core.Mapping;
    using Data.Models;
    using System.ComponentModel.DataAnnotations;

    public class UserOwnerRegisteringDTO : IMapFrom<User>
    {
        [Required]
        public string Email { get; set; }

        [Required]
        public string Password { get; set; }

        [Required]
        public string FacilityName { get; set; }
    }
}
