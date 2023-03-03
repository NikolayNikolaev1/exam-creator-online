namespace ExamCreatorOnline.Api.Models
{
    using System.ComponentModel.DataAnnotations;

    public class ExamDTO
    {
        public int Id { get; set; }

        [Required]
        public string Name { get; set; }

        [Required]
        [Range(1, Double.MaxValue)]
        public int AveragePoints { get; set; }

        [Required]
        [Range(1, Double.MaxValue)]
        public int GoodPoints { get; set; }

        [Required]
        [Range(1, Double.MaxValue)]
        public int VeryGoodPoints { get; set; }

        [Required]
        [Range(1, Double.MaxValue)]
        public int ExcellentPoints { get; set; }

        [Required]
        public int FacilityId { get; set; }

        [Required]
        public int LecturerId { get; set; }
    }
}
