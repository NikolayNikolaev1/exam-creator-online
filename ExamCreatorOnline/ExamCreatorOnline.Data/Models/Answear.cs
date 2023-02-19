namespace ExamCreatorOnline.Data.Models
{
    public class Answear
    {
        public int Id { get; set; }

        public string Text { get; set; }

        public bool IsCorrect { get; set; }

        public int QuestionId { get; set; }

        public Question Question { get; set; }

        public IEnumerable<Mark> Marks { get; set; } = new List<Mark>();
    }
}
