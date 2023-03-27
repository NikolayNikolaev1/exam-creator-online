namespace ExamCreatorOnline.Services.DTO.Exams
{
    using AutoMapper;
    using Core.Mapping;
    using Data.Models;
    using ExamCreatorOnline.Services.DTO.Users;
    using Questions;

    public class ExamDTO : IMapFrom<Exam>, IHaveCustomMapping
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public string Description { get; set; }

        public int AveragePoints { get; set; }

        public int GoodPoints { get; set; }

        public int VeryGoodPoints { get; set; }

        public int ExcelentPoints { get; set; }

        public int FacilityId { get; set; }

        public int LecturerId { get; set; }

        public IEnumerable<int> StudentIds { get; set; }

        public IEnumerable<QuestionDTO> Questions { get; set; }

        public void ConfigureMapping(Profile mapper)
            => mapper
            .CreateMap<Exam, ExamDTO>()
            .ForMember(e => e.StudentIds, cfg => cfg.MapFrom(e => e.Students.Select(s => s.Student.Id)));
    }
}
