namespace ExamCreatorOnline.Services
{
    using DTO.Questions;

    public interface IQuestionService
    {
        Task<int> CreateAsync(QuestionCreatingDTO questionDTO);

        Task<bool> ExistsIdAsync(int id);

        Task<bool> ExistsTextAsync(int examId, string text);

        Task<QuestionDTO> FindByIdAsync(int id);

        Task DeleteAsync(int id);

        Task UpdateAsync(int id, QuestionUpdatingDTO questionDTO);
    }
}
