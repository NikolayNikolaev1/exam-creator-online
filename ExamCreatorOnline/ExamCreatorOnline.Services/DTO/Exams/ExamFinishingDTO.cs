namespace ExamCreatorOnline.Services.DTO.Exams
{
    public class ExamFinishingDTO
    {
        public MarkDTO[] Marks { get; set; }

        public int StudentId { get; set; }

        public int ExamId { get; set; }
    }

    public class MarkDTO
    {
        public int QuestionId { get; set; }

        public int AnswearId { get; set; }
    }
}
