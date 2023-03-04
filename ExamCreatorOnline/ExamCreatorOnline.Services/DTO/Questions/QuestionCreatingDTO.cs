namespace ExamCreatorOnline.Services.DTO.Questions
{
    using Core.Mapping;
    using Data.Models;
    using System.ComponentModel.DataAnnotations;

    public class QuestionCreatingDTO: IMapFrom<Question>
    {
        [Required]
        public string Text { get; set; }

        [Required]
        [Range(1, double.MaxValue)]
        public int Points { get; set; }

        [Required]
        public int ExamId { get; set; }
    }
}
