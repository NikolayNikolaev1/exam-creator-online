namespace ExamCreatorOnline.Api.Controllers
{
    using Microsoft.AspNetCore.Mvc;
    using Services;
    using Services.DTO.Questions;

    [Route("api/[controller]")]
    [ApiController]
    public class QuestionController : BaseController
    {
        private IQuestionService questionService;

        public QuestionController(IQuestionService questionService, IUserService userService)
            : base(userService)
        {
            this.questionService = questionService;
        }

        [HttpPost()]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        public async Task<ActionResult<int>> Create([FromBody] QuestionCreatingDTO questionDTO)
        {
            if (questionDTO == null)
            {
                return BadRequest(questionDTO);
            }

            if (await this.questionService.ExistsTextAsync(questionDTO.ExamId, questionDTO.Text))
            {
                ModelState.AddModelError("CustomError", "Question text already exists!");
                return BadRequest(ModelState);
            }

            int questionId = await this.questionService.CreateAsync(questionDTO);

            return Ok(questionId);
        }

        [HttpGet("{id:int}")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(QuestionDTO))]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult> Get(int id)
        {

            if (!await this.questionService.ExistsIdAsync(id))
            {
                return NotFound(id);
            }

            return Ok(await this.questionService.FindByIdAsync(id));
        }

        [HttpPut("{id:int}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult> Update(int id, [FromBody] QuestionUpdatingDTO questionDTO)
        {
            if (!await this.questionService.ExistsIdAsync(id))
            {
                return NotFound(id);
            }

            QuestionDTO question = await this.questionService.FindByIdAsync(id);

            if (questionDTO == null)
            {
                return BadRequest(questionDTO);
            }

            if (await this.questionService.ExistsTextAsync(question.ExamId, questionDTO.Text)
                && question.Text != questionDTO.Text)
            {
                ModelState.AddModelError("CustomError", "Question text already exists!");
                return BadRequest(ModelState);
            }

            await this.questionService.UpdateAsync(id, questionDTO);

            return Ok();
        }

        [HttpDelete("{id:int}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> Delete(int id)
        {
            if (!await this.questionService.ExistsIdAsync(id))
            {
                return NotFound(id);
            }

            await this.questionService.DeleteAsync(id);

            return NoContent();
        }
    }
}
