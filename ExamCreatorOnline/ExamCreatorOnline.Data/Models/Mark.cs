namespace ExamCreatorOnline.Data.Models
{
    public class Mark
    {
        public int Id { get; set; }

        public int QuestionId { get; set; }

        public Question Question { get; set; }

        public int AnswearId { get; set; }

        public Answear Answear { get; set; }

        public IEnumerable<StudentMark> Students { get; set; } = new List<StudentMark>();
    }
}
