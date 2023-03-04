namespace ExamCreatorOnline.Services
{
    using DTO.Exams;

    public interface IExamService
    {
        Task AddStudentsAsync(int examId, IEnumerable<int> studentIds);

        Task AddQuestionsAsync(int examId, IEnumerable<int> questionIds);

        Task<IEnumerable<ExamDTO>> AllAsync();

        Task<int> CreateAsync(ExamCreatingDTO examDTO);

        Task DeleteAsync(int id);

        Task<bool> ExistsIdAsync(int id);

        Task<bool> ExistsNameAsync(int facilityId, string name);

        Task<ExamDTO> FindIdAsync(int id);

        Task RemoveStudentsAsync(int examId, IEnumerable<int> studentIds);

        Task RemoveQuestionsAsync(int examId, IEnumerable<int> questionIds);

        Task UpdateAsync(int id, ExamUpdatingDTO examDTO);
    }
}
