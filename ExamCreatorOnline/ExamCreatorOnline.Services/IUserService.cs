namespace ExamCreatorOnline.Services
{
    using Data.Models;
    using DTO.Users;

    public interface IUserService
    {
        Task CreateSystemOwnerAsync(string email, string password, string facilityName);

        Task<int> CreateUserAsync(UserRegisteringDTO userDTO);

        Task<bool> ExistsEmailAsync(string email);

        Task<bool> ExistsIdAsync(int id);

        Task<UserDTO> FindByIdAsync(int id);

        Task<Role> FindRoleAsync(int userId);

        Task<bool> HasCorrectCredentialsAsync(UserLogingDTO userDTO);

        Task<bool> HasExamIdAsync(int userId, int examId);
    }
}