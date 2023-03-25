namespace ExamCreatorOnline.Services.DTO.Users
{
    using AutoMapper;
    using Core.Mapping;
    using Data.Models;
    using Exams;

    public class UserDTO : IMapFrom<User>
        //IHaveCustomMapping
    {
        public int Id { get; set; }

        public string Email { get; set; }

        public string FirstName { get; set; }

        public string LastName { get; set; }

        public string Role { get; set; }

        public int FacilityId { get; set; }

        //public IEnumerable<ExamDTO> Exams { get; set; }

        public IEnumerable<ExamDTO> Examings { get; set; }

        //public void ConfigureMapping(Profile mapper)
        //    => mapper
        //    .CreateMap<User, UserDTO>()
        //    .ForMember(u => u.Examings, cfg => cfg.MapFrom(u => u.Examinings))
        //    .ForMember(u => u.Exams, cfg => cfg.MapFrom(u => u.Exams.Where(e => e.StudentId == u.Id)));
    }
}
