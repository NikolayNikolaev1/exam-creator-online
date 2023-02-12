namespace ExamCreatorOnline.Data.Models
{
    public class User
    {
        public int Id { get; set; }

        public string Email { get; set; }

        public string Password { get; set; }

        public int FacilityId { get; set; }

        public Facility Facility { get; set; }

        public IEnumerable<StudentExam> Exams { get; set; } = new List<StudentExam>();

        public IEnumerable<StudentExam> ExamsLeading { get; set; } = new List<StudentExam>();
    }
}
