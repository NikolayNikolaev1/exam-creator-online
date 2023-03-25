namespace ExamCreatorOnline.Services.DTO.Facility
{
    using System.ComponentModel.DataAnnotations;

    public class FacilityCreatingDTO
    {
        [Required]
        public string Name { get; set; }

        [Required]
        public string Email { get; set; }

        [Required]
        public string Password { get; set; }

        [Required]
        public int AdminId { get; set; }
    }
}
