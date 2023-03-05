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

        public async Task CreateSystemOwnerAsync(string email, string password, string facilityName)
        {

            Facility facility = new Facility
            {
                Name = facilityName
            };

            await this.dbContext.AddAsync(facility);
            await this.dbContext.SaveChangesAsync();

            User owner = new User
            {
                Email = email,
                Password = password,
                FacilityId = facility.Id,
                Role = Role.Owner
            };

            await this.dbContext.AddAsync(owner);
            await this.dbContext.SaveChangesAsync();
        }

        public async Task<int> CreateUserAsync(UserRegisteringDTO userDTO)
        {
            User user = new User
            {
                Email = userDTO.Email,
                Password = userDTO.Password,
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

        public async Task<bool> HasCorrectCredentialsAsync(UserLogingDTO userDTO)
            => await this.dbContext
            .Users
            .AnyAsync(u => u.Email == userDTO.Email && u.Password == userDTO.Password);

        public async Task<bool> HasExamIdAsync(int userId, int examId)
            => await this.dbContext
            .Users
            .AnyAsync(u => u.Id == userId && u.Examinings.Any(e => e.Id == examId));
    }
}
