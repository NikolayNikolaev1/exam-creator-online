namespace ExamCreatorOnline.Services
{
    using DTO.Facility;

    public interface IFacilityService
    {
        Task CreateAsync(FacilityCreatingDTO facilityDTO);

        Task<bool> ExistsIdAsync(int id);

        Task<FacilityDTO> FindByIdAsync(int id);

        Task UpdateAsync(int id, FacilityUpdatingDTO examDTO);
    }
}
