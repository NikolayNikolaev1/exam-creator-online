namespace ExamCreatorOnline.Services
{
    public interface IAnswearService
    {
        Task CreateAsync(string text, bool isCorrect, int questionId);

        Task UpdateAsync(int id, string text, bool isCorrect);
    }
}
