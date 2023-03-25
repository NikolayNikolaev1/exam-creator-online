namespace ExamCreatorOnline.Services.DTO.Facility
{
    using Core.Mapping;
    using Data.Models;
    using System.ComponentModel.DataAnnotations;

    public class FacilityUpdatingDTO : IMapFrom<Facility>
    {
        [Required]
        public string Name { get; set; }

        public string Description { get; set; }
    }
}
