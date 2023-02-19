namespace ExamCreatorOnline.Data.Models
{
    public class User
    {
        public int Id { get; set; }

        public string Email { get; set; }

        public string Password { get; set; }

        public int RoleId { get; set; }

        public Role Role { get; set; }
        // StudentSystem is the foreign key for the student-facility relation.
        public int? StudentSystemId { get; set; }

        public Facility StudentSystem { get; set; }
        // Foreign key for teacher-facility relation.
        public int? FacilityId { get; set; }

        public Facility Facility { get; set; }
        // Collection for student-exam relation.
        public IEnumerable<StudentExam> Exams { get; set; } = new List<StudentExam>();
        // Collection for teacher-exam relation.
        public IEnumerable<StudentExam> Examinings { get; set; } = new List<StudentExam>();

        public IEnumerable<StudentMark> Marks { get; set; } = new List<StudentMark>();
    }
}
