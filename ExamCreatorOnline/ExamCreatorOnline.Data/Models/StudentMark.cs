namespace ExamCreatorOnline.Data.Models
{
    public class StudentMark
    {
        public int StudentId { get; set; }

        public User Student { get; set; }

        public int MarkId { get; set; }

        public Mark Mark { get; set; }
    }
}
