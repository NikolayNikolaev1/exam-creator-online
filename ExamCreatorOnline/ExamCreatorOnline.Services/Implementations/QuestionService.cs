namespace ExamCreatorOnline.Services.Implementations
{
    using Data;
    using Data.Models;

    public class QuestionService : IQuestionService
    {
        private ExamCreatorDbContext dbContext;

        public QuestionService(ExamCreatorDbContext dbContext)
        {
            this.dbContext = dbContext;
        }

        public async Task CreateAsync(string text, int points, int examId)
        {
            Question question = new Question
            {
                Text = text,
                Points = points,
                ExamId = examId
            };

            await this.dbContext.AddAsync(question);
            await this.dbContext.SaveChangesAsync();
        }

        public async Task UpdateAsync(int id, string text, int points)
        {
            Question question = this.dbContext.Questions.First(q => q.Id == id);
            question.Text = text;
            question.Points = points;

            await this.dbContext.SaveChangesAsync();
        }
    }
}
