namespace ExamCreatorOnline.Services
{
    using Data.Models;

    public interface IExamService
    {
        Task AddStudentsAsync(int examId, IEnumerable<int> studentIds);

        Task AddQuestionsAsync(int examId, IEnumerable<int> questionIds);

        Task<ICollection<Exam>> AllAsync();

        Task<int> CreateAsync(
            string name,
            int avgPts,
            int goodPts,
            int veryGoodPts,
            int excelentPts,
            int facId,
            int lecturerId);

        Task DeleteAsync(int id);

        Task<bool> ExistsIdAsync(int id);

        Task<bool> ExistsNameAsync(string name);

        Task<Exam> FindIdAsync(int id);

        Task RemoveStudentsAsync(int examId, IEnumerable<int> studentIds);

        Task RemoveQuestionsAsync(int examId, IEnumerable<int> questionIds);

        Task UpdateAsync(
            int examId,
            string name,
            int avgPts,
            int goodPts,
            int veryGoodPts,
            int excelentPts);
    }
}
