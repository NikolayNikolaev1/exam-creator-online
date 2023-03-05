namespace ExamCreatorOnline.Services.DTO.Exams
{
    using Core.Mapping;
    using Data.Models;
    using System.ComponentModel.DataAnnotations;

    public class ExamUpdatingDTO : IMapFrom<Exam>
    {
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
        public int UserId { get; set; }
    }
}
