namespace ExamCreatorOnline.Services.DTO.Answears
{
    using Core.Mapping;
    using Data.Models;

    public class AnswearDTO : IMapFrom<Answear>
    {
        public int Id { get; set; }

        public string Text { get; set; }

        public int QuestionId { get; set; }
    }
}
