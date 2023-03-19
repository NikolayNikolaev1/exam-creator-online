namespace ExamCreatorOnline.Services.DTO.Exams
{
    public class StudentManagingDTO
    {
        public IEnumerable<int> StudentIds { get; set; }

        public int LecturerId { get; set; }
    }
}
