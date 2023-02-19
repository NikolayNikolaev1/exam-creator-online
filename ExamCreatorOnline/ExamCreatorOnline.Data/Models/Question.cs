namespace ExamCreatorOnline.Data.Models
{
    public class Question
    {
        public int Id { get; set; }

        public string Text { get; set; }

        public int Points { get; set; }

        public int ExamId { get; set; }

        public Exam Exam { get; set; }

        public IEnumerable<Answear> Answears { get; set; } = new List<Answear>();

        public IEnumerable<Mark> Marks { get; set; } = new List<Mark>();
    }
}
