namespace ExamCreatorOnline.Services.Implementations
{
    using Data;
    using Data.Models;

    public class ExamService : IExamService
    {
        private ExamCreatorDbContext dbContext;

        public ExamService(ExamCreatorDbContext dbContext)
        {
            this.dbContext = dbContext;
        }

        public Task AddQuestionsAsync(int examId, IEnumerable<int> questionids)
        {
            throw new NotImplementedException();
        }

        public Task AddStudentsAsync(int examId, IEnumerable<int> studentIds)
        {
            throw new NotImplementedException();
        }

        public async Task<int> CreateAsync(
            string name,
            int avgPts,
            int goodPts,
            int veryGoodPts,
            int excelentPts,
            int facultyId)
        {
            Exam exam = new Exam
            {
                Name = name,
                AveragePoints = avgPts,
                GoodPoints = goodPts,
                VeryGoodPoints = veryGoodPts,
                ExcelentPoints = excelentPts,
                FacilityId = facultyId
            };

            await this.dbContext.AddAsync(exam);
        }

        public Task<bool> ExistsAsync(string name)
        {
            throw new NotImplementedException();
        }

        public Task RemoveQuestionsAsync(int examId, IEnumerable<int> questionIds)
        {
            throw new NotImplementedException();
        }

        public Task RemoveStudentsAsync(int examId, IEnumerable<int> studentIds)
        {
            throw new NotImplementedException();
        }
    }
}
