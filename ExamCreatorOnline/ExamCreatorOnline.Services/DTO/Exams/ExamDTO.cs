﻿namespace ExamCreatorOnline.Services.DTO.Exams
{
    using Core.Mapping;
    using Data.Models;
    using Facility;
    using Questions;

    public class ExamDTO : IMapFrom<Exam>
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public string Description { get; set; }

        public int AveragePoints { get; set; }

        public int GoodPoints { get; set; }

        public int VeryGoodPoints { get; set; }

        public int ExcelentPoints { get; set; }

        public FacilityDTO Facility { get; set; }

        public LecturerDTO Lecturer { get; set; }

        public IEnumerable<QuestionDTO> Questions { get; set; }
    }
}
