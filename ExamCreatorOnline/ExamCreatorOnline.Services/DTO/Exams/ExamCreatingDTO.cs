namespace ExamCreatorOnline.Services.DTO.Exams
{
    using Core.Mapping;
    using Data.Models;
    using System.ComponentModel.DataAnnotations;

    public class ExamCreatingDTO : IMapFrom<Exam>
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
        public int ExcelentPoints { get; set; }

        [Required]
        public int FacilityId { get; set; }

        [Required]
        public int LecturerId { get; set; }
    }
}
