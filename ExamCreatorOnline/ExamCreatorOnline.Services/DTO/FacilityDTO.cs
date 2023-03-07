namespace ExamCreatorOnline.Services.DTO
{
    using Core.Mapping;
    using Data.Models;
    using System.ComponentModel.DataAnnotations;

    public class FacilityDTO : IMapFrom<Facility>
    {
        public int Id { get; set; }

        [Required]
        public string Name { get; set; }
    }
}
