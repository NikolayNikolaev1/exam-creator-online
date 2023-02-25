namespace ExamCreatorOnline.Services.Implementations
{
    using Data;
    using Data.Models;
    using Microsoft.EntityFrameworkCore;

    public class ExamService : IExamService
    {
        private ExamCreatorDbContext dbContext;

        public ExamService(ExamCreatorDbContext dbContext)
        {
            this.dbContext = dbContext;
        }

        public async Task AddQuestionsAsync(int examId, IEnumerable<int> questionIds)
        {
            Exam exam = this.dbContext.Exams.First(e => e.Id == examId);
            IEnumerable<Question> questions = this.dbContext
                .Questions
                .Where(eq => questionIds.Any(q => q == eq.Id));
            exam.Questions.ToList().AddRange(questions);

            await this.dbContext.SaveChangesAsync();
        }

        public async Task AddStudentsAsync(int examId, IEnumerable<int> studentIds)
        {
            Exam exam = this.dbContext.Exams.First(e => e.Id == examId);
            IEnumerable<User> students = this.dbContext
                .Users
                .Where(u => studentIds.Any(s => s == u.Id));
            students.ToList().ForEach(delegate (User s)
            {
                exam.Students.ToList().Add(new StudentExam { ExamId = examId, StudentId = s.Id });
            });

            await this.dbContext.SaveChangesAsync();
        }

        public async Task<int> CreateAsync(
            string name,
            int avgPts,
            int goodPts,
            int veryGoodPts,
            int excelentPts,
            int facultyId,
            int lecturerId)
        {
            Exam exam = new Exam
            {
                Name = name,
                IsOpen = false,
                AveragePoints = avgPts,
                GoodPoints = goodPts,
                VeryGoodPoints = veryGoodPts,
                ExcelentPoints = excelentPts,
                FacilityId = facultyId,
                LecturerId = lecturerId
            };

            await this.dbContext.AddAsync(exam);
            await this.dbContext.SaveChangesAsync();

            return exam.Id;
        }

        public async Task<bool> ExistsAsync(string name)
            => await this.dbContext.Exams.AnyAsync(e => e.Name == name);

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
    }
}
