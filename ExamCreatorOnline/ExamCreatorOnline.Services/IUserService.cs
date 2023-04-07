namespace ExamCreatorOnline.Services
{
    using Data.Models;
    using DTO.Users;

    public interface IUserService
    {
        Task<int> CreateUserAsync(UserRegisteringDTO userDTO);

        Task<bool> ExistsEmailAsync(string email);

        Task<bool> ExistsIdAsync(int id);

        Task<UserDTO> FindByIdAsync(int id);

        Task<Role> FindRoleAsync(int userId);

        Task<bool> HasExamIdAsync(int userId, int examId);

        Task<bool> IsFacilityOwnerAsync(int userId, int facilityId);

        Task<UserDTO> LoginAsync(UserLogingDTO userDTO);

        Task UpdateAsync(int id, UserUpdatingDTO userDTO);
    }
}