namespace ExamCreatorOnline.Services
{
    public interface IExamService
    {
        Task AddStudentsAsync(int examId, IEnumerable<int> studentIds);

        Task AddQuestionsAsync(int examId, IEnumerable<int> questionids);

        Task<int> CreateAsync(string name, int avgPts, int goodPts, int veryGoodPts, int excelentPts, int facId);

        Task<bool> ExistsAsync(string name);

        Task RemoveStudentsAsync(int examId, IEnumerable<int> studentIds);

        Task RemoveQuestionsAsync(int examId, IEnumerable<int> questionIds);
    }
}
