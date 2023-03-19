namespace ExamCreatorOnline.Services
{
    using DTO.Answears;

    public interface IAnswearService
    {
        Task CreateAsync(AnswearCreatingDTO answearDTO);

        Task<bool> ExistsIdAsync(int id);

        Task<bool> ExistsTextAsync(int questionId, string text);

        Task DeleteAsync(int id);

        Task<AnswearDTO> FindByIdAsync(int id);

        Task UpdateAsync(int id, AnswearUpdatingDTO answearDTO);
    }
}
