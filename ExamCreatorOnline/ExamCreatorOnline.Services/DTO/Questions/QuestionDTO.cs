namespace ExamCreatorOnline.Services.DTO.Questions
{
    using Answears;
    using Core.Mapping;
    using Data.Models;

    public class QuestionDTO : IMapFrom<Question>
    {
        public int Id { get; set; }

        public string Text { get; set; }

        public int Points { get; set; }

        public int ExamId { get; set; }

        public IEnumerable<AnswearDTO> Answears { get; set; }
    }
}
