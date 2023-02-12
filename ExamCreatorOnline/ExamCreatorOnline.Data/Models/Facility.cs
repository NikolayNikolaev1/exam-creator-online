namespace ExamCreatorOnline.Data.Models
{
    public class Facility
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public int OwnerId { get; set; }

        public User Owner { get; set; }

        public IEnumerable<User> Teachers { get; set; } = new List<User>();

        public IEnumerable<User> Students { get; set; } = new List<User>();

        public IEnumerable<Exam> Exams { get; set; } = new List<Exam>();
    }
}
