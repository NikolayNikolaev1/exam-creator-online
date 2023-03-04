namespace ExamCreatorOnline.Services.Implementations
{
    using AutoMapper;
    using AutoMapper.QueryableExtensions;
    using Data;
    using Data.Models;
    using DTO.Exams;
    using Microsoft.EntityFrameworkCore;

    public class ExamService : IExamService
    {
        private readonly ExamCreatorDbContext dbContext;
        private readonly IMapper mapper;

        public ExamService(ExamCreatorDbContext dbContext, IMapper mapper)
        {
            this.dbContext = dbContext;
            this.mapper = mapper;
        }

        public async Task AddQuestionsAsync(int examId, IEnumerable<int> questionIds)
        {
            Exam exam = await this.dbContext.Exams.FirstAsync(e => e.Id == examId);
            IEnumerable<Question> questions = this.dbContext
                .Questions
                .Where(eq => questionIds.Any(q => q == eq.Id));
            exam.Questions.ToList().AddRange(questions);

            await this.dbContext.SaveChangesAsync();
        }

        public async Task AddStudentsAsync(int examId, IEnumerable<int> studentIds)
        {
            Exam exam = await this.dbContext.Exams.FirstAsync(e => e.Id == examId);
            IEnumerable<User> students = this.dbContext
                .Users
                .Where(u => studentIds.Any(s => s == u.Id));
            students.ToList().ForEach(delegate (User s)
            {
                exam.Students.ToList().Add(new StudentExam { ExamId = examId, StudentId = s.Id });
            });

            await this.dbContext.SaveChangesAsync();
        }

        public async Task<IEnumerable<ExamDTO>> AllAsync()
            => await this.dbContext
            .Exams
            .ProjectTo<ExamDTO>(this.mapper.ConfigurationProvider)
            .ToListAsync();

        public async Task<int> CreateAsync(ExamCreatingDTO examDTO)
        {
            Exam exam = new Exam
            {
                Name = examDTO.Name,
                IsOpen = false,
                AveragePoints = examDTO.AveragePoints,
                GoodPoints = examDTO.GoodPoints,
                VeryGoodPoints = examDTO.VeryGoodPoints,
                ExcelentPoints = examDTO.ExcelentPoints,
                FacilityId = examDTO.FacilityId,
                LecturerId = examDTO.LecturerId
            };

            await this.dbContext.AddAsync(exam);
            await this.dbContext.SaveChangesAsync();

            return exam.Id;
        }

        public async Task DeleteAsync(int id)
        {
            Exam exam = await this.dbContext.Exams.FirstAsync(e => e.Id == id);

            this.dbContext.Remove(exam);
            await this.dbContext.SaveChangesAsync();
        }

        public async Task<bool> ExistsIdAsync(int id)
            => await this.dbContext.Exams.AnyAsync(e => e.Id == id);

        public async Task<bool> ExistsNameAsync(int facilityId, string name)
            => await this.dbContext
            .Facility
            .AnyAsync(f => f.Id == facilityId && f.Exams.Any(e => e.Name == name));

        public async Task<ExamDTO> FindIdAsync(int id)
            => await this.dbContext
            .Exams
            .ProjectTo<ExamDTO>(this.mapper.ConfigurationProvider)
            .FirstAsync(e => e.Id == id);

        public Task RemoveQuestionsAsync(int examId, IEnumerable<int> questionIds)
        {
            throw new NotImplementedException();
        }

        // TODO: exam-question ondelete.cascade
        //public Task RemoveQuestionsAsync(int examId, IEnumerable<int> questionIds)
        //{
        //    Exam exam = this.dbContext.Exams.First(e => e.Id == examId);
        //    exam.Questions.
        //}

        public async Task RemoveStudentsAsync(int examId, IEnumerable<int> studentIds)
        {
            foreach (StudentExam se in this.dbContext.StudentsExams)
            {
                if (se.ExamId == examId && studentIds.Contains(se.StudentId))
                {
                    this.dbContext.StudentsExams.Remove(se);
                }
            }

            await this.dbContext.SaveChangesAsync();
        }

        public async Task UpdateAsync(int id, ExamUpdatingDTO examDTO)
        {
            Exam exam = await this.dbContext.Exams.FirstAsync(e => e.Id == id);

            exam.Name = examDTO.Name;
            exam.AveragePoints = examDTO.AveragePoints;
            exam.GoodPoints = examDTO.GoodPoints;
            exam.VeryGoodPoints = examDTO.VeryGoodPoints;
            exam.ExcelentPoints = examDTO.ExcellentPoints;

            await this.dbContext.SaveChangesAsync();
        }
    }
}
