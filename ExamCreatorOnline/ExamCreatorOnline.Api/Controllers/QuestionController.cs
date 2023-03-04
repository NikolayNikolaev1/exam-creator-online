namespace ExamCreatorOnline.Api.Controllers
{
    using Microsoft.AspNetCore.Mvc;
    using Services;
    using Services.DTO.Questions;

    [Route("api/[controller]")]
    [ApiController]
    public class QuestionController : ControllerBase
    {
        private IQuestionService questionService;

        public QuestionController(IQuestionService questionService)
        {
            this.questionService = questionService;
        }

        [HttpPost()]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult> Create([FromBody] QuestionCreatingDTO questionDTO)
        {
            if (questionDTO == null)
            {
                return BadRequest();
            }

            if (await this.questionService.ExistsTextAsync(questionDTO.ExamId, questionDTO.Text))
            {
                ModelState.AddModelError("CustomError", "Question text already exists!");
                return BadRequest(ModelState);
            }

            await this.questionService.CreateAsync(questionDTO);

            return Ok();
        }

        [HttpGet("id:int")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(QuestionDTO))]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult> Get(int id)
        {

            if (!await this.questionService.ExistsIdAsync(id))
            {
                return NotFound();
            }

            return Ok(await this.questionService.FindIdAsync(id));
        }

        [HttpPut("id:int")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult> Update(int id, [FromBody] QuestionUpdatingDTO questionDTO)
        {
            if (!await this.questionService.ExistsIdAsync(id))
            {
                return NotFound();
            }

            QuestionDTO question = await this.questionService.FindIdAsync(id);

            if (questionDTO == null)
            {
                return BadRequest();
            }

            if (await this.questionService.ExistsTextAsync(question.ExamId, questionDTO.Text))
            {
                ModelState.AddModelError("CustomError", "Question text already exists!");
                return BadRequest(ModelState);
            }

            await this.questionService.UpdateAsync(id, questionDTO);

            return Ok();
        }

        [HttpDelete("id:int")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> Delete(int id)
        {
            if (!await this.questionService.ExistsIdAsync(id))
            {
                return NotFound();
            }

            await this.questionService.DeleteAsync(id);

            return NoContent();
        }
    }
}
