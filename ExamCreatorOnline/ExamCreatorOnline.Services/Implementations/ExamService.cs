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

        public async Task<IEnumerable<int>> AddStudentsAsync(int examId, IEnumerable<int> studentIds)
        {
            foreach (int studentId in studentIds)
            {
                await this.dbContext.AddAsync(new StudentExam { ExamId = examId, StudentId = studentId });
            }

            this.dbContext.SaveChanges();

            var exam = this.dbContext.StudentsExams.Where(se => se.ExamId == examId);

            return exam.Select(s => s.StudentId).ToList();
        }

        public async Task<IEnumerable<ExamDTO>> AllAsync()
            => await this.dbContext
            .Exams
            .ProjectTo<ExamDTO>(this.mapper.ConfigurationProvider)
            .ToListAsync();

        public async Task<IEnumerable<int>> AllStudentIdsAsync(int examId)
        {
            Exam exam = await this.dbContext.Exams.FirstAsync(e => e.Id == examId);

            return exam.Students.Select(s => s.StudentId).ToList();
        }

        public async Task<int> CalculateScoreAsync(int examId, int studentId)
        {
            StudentExam studentExam = await this.dbContext
                .StudentsExams
                .FirstAsync(se => se.ExamId == examId && studentId == se.StudentId);

            int score = this.dbContext
                .StudentsMarks
                .Where(sm => sm.StudentId == studentId)
                .Select(sm => sm.Mark.Answear.IsCorrect ? sm.Mark.Question.Points : 0)
                .ToList()
                .Sum();

            studentExam.Score = score;

            await this.dbContext.SaveChangesAsync();

            return score;
        }

        public async Task<int> CreateAsync(ExamCreatingDTO examDTO)
        {
            Exam exam = new Exam
            {
                Name = examDTO.Name,
                Description = examDTO.Description,
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

        public async Task<ExamDTO> FindByIdAsync(int id)
            => await this.dbContext
            .Exams
            .ProjectTo<ExamDTO>(this.mapper.ConfigurationProvider)
            .FirstAsync(e => e.Id == id);

        public async Task FinishAsync(MarkDTO markDTO, int studentId)
        {
            Mark mark = this.dbContext
                .Marks
                .Any(m =>
                    m.QuestionId == markDTO.QuestionId &&
                    m.AnswearId == markDTO.AnswearId) ? this.dbContext.Marks.First(m =>
                    m.QuestionId == markDTO.QuestionId &&
                    m.AnswearId == markDTO.AnswearId) : new Mark
            {
                QuestionId = markDTO.QuestionId,
                AnswearId = markDTO.AnswearId
            };

            if (!await this.dbContext
                .Marks
                .AnyAsync(m =>
                    m.QuestionId == mark.QuestionId &&
                    m.AnswearId == mark.AnswearId))
            {
                await this.dbContext.AddAsync(mark);
                await this.dbContext.SaveChangesAsync();
            }

            StudentMark studentMark = new StudentMark
            {
                StudentId = studentId,
                MarkId = mark.Id,
            };

            await this.dbContext.AddAsync(studentMark);
            await this.dbContext.SaveChangesAsync();
        }

        public async Task OpenSync(int id)
        {
            var exam = await this.dbContext.Exams.FirstAsync(e => e.Id == id);
            exam.IsOpen = true;
            this.dbContext.SaveChangesAsync();
        }

        public async Task<IEnumerable<int>> RemoveStudentsAsync(int examId, IEnumerable<int> studentIds)
        {
            foreach (StudentExam se in this.dbContext.StudentsExams)
            {
                if (se.ExamId == examId && studentIds.Contains(se.StudentId))
                {
                    this.dbContext.StudentsExams.Remove(se);
                }
            }

            await this.dbContext.SaveChangesAsync();

            Exam exam = await this.dbContext.Exams.FirstAsync(e => e.Id == examId);

            return exam.Students.Select(s => s.StudentId).ToList();
        }

        public async Task UpdateAsync(int id, ExamUpdatingDTO examDTO)
        {
            Exam exam = await this.dbContext.Exams.FirstAsync(e => e.Id == id);

            exam.Name = examDTO.Name;
            exam.Description = examDTO.Description;
            exam.AveragePoints = examDTO.AveragePoints;
            exam.GoodPoints = examDTO.GoodPoints;
            exam.VeryGoodPoints = examDTO.VeryGoodPoints;
            exam.ExcelentPoints = examDTO.ExcelentPoints;

            await this.dbContext.SaveChangesAsync();
        }
    }
}
