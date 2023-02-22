namespace ExamCreatorOnline.Services
{
    public interface IUserService
    {
        Task CreateSystemOwnerAsync(string email, string password, string facilityName);

        Task CreateUserAsync(string email, string password, int roleId, int facilityId);

        Task<bool> UserExistsAsync(string email);
    }
}