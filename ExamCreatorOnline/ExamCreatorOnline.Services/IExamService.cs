namespace ExamCreatorOnline.Services
{
    using DTO.Exams;

    public interface IExamService
    {
        Task<IEnumerable<int>> AddStudentsAsync(int examId, IEnumerable<int> studentIds);

        Task<IEnumerable<ExamDTO>> AllAsync();

        Task<IEnumerable<int>> AllStudentIdsAsync(int examId);

        Task<int> CreateAsync(ExamCreatingDTO examDTO);

        Task DeleteAsync(int id);

        Task<bool> ExistsIdAsync(int id);

        Task<bool> ExistsNameAsync(int facilityId, string name);

        Task<ExamDTO> FindByIdAsync(int id);

        Task<IEnumerable<int>> RemoveStudentsAsync(int examId, IEnumerable<int> studentIds);

        Task UpdateAsync(int id, ExamUpdatingDTO examDTO);
    }
}
