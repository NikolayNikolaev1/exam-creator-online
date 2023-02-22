namespace ExamCreatorOnline.Services.Implementations
{
    using Data;
    using Data.Models;
    using Microsoft.EntityFrameworkCore;

    public class UserService : IUserService
    {
        private ExamCreatorDbContext dbContext;

        public UserService(ExamCreatorDbContext dbContext)
        {
            this.dbContext = dbContext;
        }

        public async Task CreateSystemOwnerAsync(string email, string password, string facilityName)
        {
            User owner = new User
            {
                Email = email,
                Password = password,
                RoleId = 1
            };

            Facility facility = new Facility
            {
                Name = facilityName
            };


            await this.dbContext.AddAsync(owner);
            await this.dbContext.AddAsync(facility);
            await this.dbContext.SaveChangesAsync();

            this.dbContext.Entry(owner).GetDatabaseValues();
            this.dbContext.Entry(facility).GetDatabaseValues();

            int ownerId = owner.Id;
            int facilityId = facility.Id;

            this.dbContext.Users.Where(u => u.Email == owner.Email).First().FacilityId = facilityId;
            this.dbContext.Facility.Where(f => facility.Name == facility.Name).First().OwnerId = owner.Id;
            await this.dbContext.SaveChangesAsync();
        }

        public async Task CreateUserAsync(string email, string password, int roleId, int facilityId)
        {
            User user = new User
            {
                Email = email,
                Password = password,
                RoleId = roleId,
                FacilityId = facilityId
            };

            await this.dbContext.AddAsync(user);
            await this.dbContext.SaveChangesAsync();
        }

        public async Task<bool> UserExistsAsync(string email)
            => await this.dbContext
            .Users
            .AnyAsync(u => u.Email == email);
    }
}
