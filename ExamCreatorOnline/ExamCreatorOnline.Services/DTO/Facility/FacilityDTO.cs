namespace ExamCreatorOnline.Services.DTO.Facility
{
    using Core.Mapping;
    using Data.Models;
    using Users;

    public class FacilityDTO : IMapFrom<Facility>
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public string Description { get; set; }

        public IEnumerable<UserDTO> Members { get; set; }
    }
}
