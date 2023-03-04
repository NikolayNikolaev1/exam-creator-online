namespace ExamCreatorOnline.Services.Implementations
{
    using AutoMapper;
    using AutoMapper.QueryableExtensions;
    using Data;
    using Data.Models;
    using DTO.Questions;
    using Microsoft.EntityFrameworkCore;

    public class QuestionService : IQuestionService
    {
        private readonly ExamCreatorDbContext dbContext;
        private readonly IMapper mapper;

        public QuestionService(ExamCreatorDbContext dbContext, IMapper mapper)
        {
            this.dbContext = dbContext;
            this.mapper = mapper;
        }

        public async Task CreateAsync(QuestionCreatingDTO questionDTO)
        {
            Question question = new Question
            {
                Text = questionDTO.Text,
                Points = questionDTO.Points,
                ExamId = questionDTO.ExamId
            };

            await this.dbContext.AddAsync(question);
            await this.dbContext.SaveChangesAsync();
        }

        public async Task DeleteAsync(int id)
        {
            Question question = await this.dbContext.Questions.FirstAsync(q => q.Id == id);

            this.dbContext.Remove(question);
            await this.dbContext.SaveChangesAsync();
        }

        public async Task<bool> ExistsIdAsync(int id)
            => await this.dbContext.Questions.AnyAsync(q => q.Id == id);

        public async Task<bool> ExistsTextAsync(int examId, string text)
            => await this.dbContext
            .Exams
            .AnyAsync(e => e.Id == examId && e.Questions.Any(q => q.Text == text));

        public async Task<QuestionDTO> FindIdAsync(int id)
            => await this.dbContext
            .Questions
            .ProjectTo<QuestionDTO>(this.mapper.ConfigurationProvider)
            .FirstAsync(q => q.Id == id);

        public async Task UpdateAsync(int id, QuestionUpdatingDTO questionDTO)
        {
            Question question = await this.dbContext.Questions.FirstAsync(q => q.Id == id);
            question.Text = questionDTO.Text;
            question.Points = questionDTO.Points;

            await this.dbContext.SaveChangesAsync();
        }
    }
}
