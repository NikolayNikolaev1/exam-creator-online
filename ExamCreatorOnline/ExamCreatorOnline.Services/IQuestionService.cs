namespace ExamCreatorOnline.Services
{
    public interface IQuestionService
    {
        Task CreateAsync(string text, int points, int examId);

        Task UpdateAsync(int id, string text, int points);
    }
}
