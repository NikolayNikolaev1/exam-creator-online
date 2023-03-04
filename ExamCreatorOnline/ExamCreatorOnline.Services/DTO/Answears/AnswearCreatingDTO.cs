namespace ExamCreatorOnline.Services.DTO.Answears
{
    using Core.Mapping;
    using Data.Models;
    using System.ComponentModel.DataAnnotations;

    public class AnswearCreatingDTO : IMapFrom<Answear>
    {
        [Required]
        public string Text { get; set; }

        [Required]
        public bool IsCorrect { get; set; }

        [Required]
        public int QuestionId { get; set; }

    }
}
