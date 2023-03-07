namespace ExamCreatorOnline.Data.Models
{
    public class Exam
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public bool IsOpen { get; set; } 

        public int AveragePoints { get; set; }

        public int GoodPoints { get; set; }

        public int VeryGoodPoints { get; set; }

        public int ExcelentPoints { get; set; }

        public int LecturerId { get; set; }

        public User Lecturer { get; set; }

        public int FacilityId { get; set; }

        public Facility Facility { get; set; }

        public IEnumerable<Question> Questions { get; set; } = new List<Question>();

        public IEnumerable<StudentExam> Students { get; set; } = new List<StudentExam>();
    }
}
