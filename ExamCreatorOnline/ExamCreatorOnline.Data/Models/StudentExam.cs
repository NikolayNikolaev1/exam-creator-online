namespace ExamCreatorOnline.Data.Models
{
    public class StudentExam
    {
        public int StudentId { get; set; }

        public User Student { get; set; }

        public int ExamId { get; set; }

        public Exam Exam { get; set; }
    }
}
