namespace ExamCreatorOnline.Services.Implementations
{
    using Data;
    using Data.Models;

    public class AnswearService : IAnswearService
    {
        private ExamCreatorDbContext dbContext;

        public AnswearService(ExamCreatorDbContext dbContext)
        {
            this.dbContext = dbContext;
        }

        public async Task CreateAsync(string text, bool isCorrect, int questionId)
        {
            Answear answear = new Answear
            {
                Text = text,
                IsCorrect = isCorrect,
                QuestionId = questionId
            };

            await this.dbContext.AddAsync(answear);
            await this.dbContext.SaveChangesAsync();
        }

        public async Task UpdateAsync(int id, string text, bool isCorrect)
        {
            Answear answear = this.dbContext.Answears.First(a => a.Id == id);
            answear.Text = text;
            answear.IsCorrect = isCorrect;

            await this.dbContext.SaveChangesAsync();
        }
    }
}
