namespace ExamCreatorOnline.Services.Implementations
{
    using AutoMapper;
    using AutoMapper.QueryableExtensions;
    using Data;
    using Data.Models;
    using DTO.Answears;
    using Microsoft.EntityFrameworkCore;

    public class AnswearService : IAnswearService
    {
        private readonly ExamCreatorDbContext dbContext;
        private readonly IMapper mapper;

        public AnswearService(ExamCreatorDbContext dbContext, IMapper mapper)
        {
            this.dbContext = dbContext;
            this.mapper = mapper;
        }

        public async Task CreateAsync(AnswearCreatingDTO answearDTO)
        {
            Answear answear = new Answear
            {
                Text = answearDTO.Text,
                IsCorrect = answearDTO.IsCorrect,
                QuestionId = answearDTO.QuestionId
            };

            await this.dbContext.AddAsync(answear);
            await this.dbContext.SaveChangesAsync();
        }

        public async Task<bool> ExistsIdAsync(int id)
            => await this.dbContext.Answears.AnyAsync(a => a.Id == id);

        public async Task<bool> ExistsTextAsync(int questionId, string text)
            => await this.dbContext
            .Questions
            .AnyAsync(q => q.Id == questionId && q.Answears.Any(a => a.Text == text));

        public async Task<AnswearDTO> FindIdAsync(int id)
            => await this.dbContext
            .Answears
            .ProjectTo<AnswearDTO>(this.mapper.ConfigurationProvider)
            .FirstAsync(a => a.Id == id);

        public async Task UpdateAsync(int id, AnswearUpdatingDTO answearDTO)
        {
            Answear answear = await this.dbContext.Answears.FirstAsync(a => a.Id == id);
            answear.Text = answearDTO.Text;
            answear.IsCorrect = answearDTO.IsCorrect;

            await this.dbContext.SaveChangesAsync();
        }
    }
}
