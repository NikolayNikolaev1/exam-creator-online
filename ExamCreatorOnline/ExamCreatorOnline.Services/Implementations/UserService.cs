namespace ExamCreatorOnline.Services.Implementations
{
    using AutoMapper;
    using AutoMapper.QueryableExtensions;
    using Data;
    using Data.Models;
    using DTO.Users;
    using Microsoft.EntityFrameworkCore;

    public class UserService : IUserService
    {
        private readonly ExamCreatorDbContext dbContext;
        private readonly IMapper mapper;

        public UserService(ExamCreatorDbContext dbContext, IMapper mapper)
        {
            this.dbContext = dbContext;
            this.mapper = mapper;
        }

        public async Task<int> CreateUserAsync(UserRegisteringDTO userDTO)
        {
            User user = new User
            {
                Email = userDTO.Email,
                Password = userDTO.Password,
                FirstName = userDTO.FirstName,
                LastName = userDTO.LastName,
                Role = (Role)userDTO.RoleId,
                FacilityId = userDTO.FacilityId
            };

            await this.dbContext.AddAsync(user);
            await this.dbContext.SaveChangesAsync();

            return user.Id;
        }

        public async Task<bool> ExistsEmailAsync(string email)
            => await this.dbContext
            .Users
            .AnyAsync(u => u.Email == email);

        public async Task<bool> ExistsIdAsync(int id)
            => await this.dbContext.Users.AnyAsync(u => u.Id == id);

        public async Task<UserDTO> FindByIdAsync(int id)
            => await this.dbContext
            .Users
            .ProjectTo<UserDTO>(this.mapper.ConfigurationProvider)
            .FirstAsync(u => u.Id == id);

        public async Task<Role> FindRoleAsync(int userId)
        {
            User user = await this.dbContext.Users.FirstAsync(u => u.Id == userId);

            return user.Role;
        }

        public async Task<UserDTO> LoginAsync(UserLogingDTO userDTO)
        {
            User user = await this.dbContext
            .Users
            .FirstOrDefaultAsync(u => u.Email == userDTO.Email && u.Password == userDTO.Password);

            return user != null 
                ? await this.dbContext
                    .Users
                    .ProjectTo<UserDTO>(this.mapper.ConfigurationProvider)
                    .FirstAsync(u => u.Id == user.Id) 
                : null;

        }

        public async Task<bool> HasExamIdAsync(int userId, int examId)
            => await this.dbContext
            .Users
            .AnyAsync(u => u.Id == userId && u.Examinings.Any(e => e.Id == examId));

        public async Task<bool> IsFacilityOwnerAsync(int userId, int facilityId)
            => await this.dbContext
                .Users.AnyAsync(u => u.Id == userId && u.FacilityId == facilityId);

        public async Task UpdateAsync(int id, UserUpdatingDTO userDTO)
        {
            User user = await this.dbContext.Users.FirstAsync(u => u.Id == id);
            user.FirstName = userDTO.FirstName;
            user.LastName = userDTO.LastName;

            await this.dbContext.SaveChangesAsync();
        }
    }
}
