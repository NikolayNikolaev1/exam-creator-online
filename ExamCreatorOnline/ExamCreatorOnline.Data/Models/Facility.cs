namespace ExamCreatorOnline.Data.Models
{
    public class Facility
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public IEnumerable<User> Members { get; set; } = new List<User>();

        public IEnumerable<Exam> Exams { get; set; } = new List<Exam>();
    }
}
