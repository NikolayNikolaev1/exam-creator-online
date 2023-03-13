namespace ExamCreatorOnline.Services.DTO.Exams
{
    using Core.Mapping;
    using Data.Models;
    using System.ComponentModel.DataAnnotations;

    public class ExamUpdatingDTO : IMapFrom<Exam>
    {
        [Required]
        //[Range(3, 15)]
        public string Name { get; set; }

        //[Range(1, 50)]
        public string Description { get; set; }

        [Required]
        //[Range(1, Double.MaxValue)]
        public int AveragePoints { get; set; }

        [Required]
        //[Range(1, Double.MaxValue)]
        public int GoodPoints { get; set; }

        [Required]
        //[Range(1, Double.MaxValue)]
        public int VeryGoodPoints { get; set; }

        [Required]
        //[Range(1, Double.MaxValue)]
        public int ExcelentPoints { get; set; }

        [Required]
        public int LecturerId { get; set; }
    }
}
