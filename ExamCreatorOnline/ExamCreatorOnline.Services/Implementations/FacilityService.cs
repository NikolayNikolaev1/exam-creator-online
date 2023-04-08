namespace ExamCreatorOnline.Services.Implementations
{
    using AutoMapper;
    using AutoMapper.QueryableExtensions;
    using Data;
    using Data.Models;
    using DTO.Facility;
    using Microsoft.EntityFrameworkCore;

    public class FacilityService : IFacilityService
    {
        private readonly ExamCreatorDbContext dbContext;
        private readonly IMapper mapper;

        public FacilityService(ExamCreatorDbContext dbContext, IMapper mapper)
        {
            this.dbContext = dbContext;
            this.mapper = mapper;
        }

        public async Task CreateAsync(FacilityCreatingDTO facilityDTO)
        {
            Facility facility = new Facility
            {
                Name = facilityDTO.Name,
                Description = facilityDTO.Description
            };

            await this.dbContext.AddAsync(facility);
            await this.dbContext.SaveChangesAsync();

            User owner = new User
            {
                Email = facilityDTO.Email,
                Password = facilityDTO.Password,
                FirstName = facilityDTO.FirstName,
                LastName = facilityDTO.LastName,
                FacilityId = facility.Id,
                Role = Role.Owner
            };

            await this.dbContext.AddAsync(owner);
            await this.dbContext.SaveChangesAsync();
        }

        public async Task<bool> ExistsIdAsync(int id)
            => await this.dbContext.Facility.AnyAsync(f => f.Id == id);

        public async Task<FacilityDTO> FindByIdAsync(int id)
            => await this.dbContext
            .Facility
            .ProjectTo<FacilityDTO>(this.mapper.ConfigurationProvider)
            .FirstAsync(f => f.Id == id);

        public async Task UpdateAsync(int id, FacilityUpdatingDTO facilityDTO)
        {
            Facility facility = await this.dbContext.Facility.FirstAsync(f => f.Id == id);

            facility.Name = facilityDTO.Name;
            facility.Description = facilityDTO.Description;

            await this.dbContext.SaveChangesAsync();
        }
    }
}
