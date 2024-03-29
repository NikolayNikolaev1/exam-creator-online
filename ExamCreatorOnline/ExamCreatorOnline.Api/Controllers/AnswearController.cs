﻿namespace ExamCreatorOnline.Api.Controllers
{
    using Microsoft.AspNetCore.Mvc;
    using Services;
    using Services.DTO.Answears;

    [Route("api/[controller]")]
    public class AnswearController : ControllerBase
    {
        private readonly IAnswearService answearService;

        public AnswearController(IAnswearService answearService)
        {
            this.answearService = answearService;
        }

        [HttpPost()]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(AnswearDTO))]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult> Create([FromBody] AnswearCreatingDTO answearDTO)
        {
            if (answearDTO == null)
            {
                return BadRequest(answearDTO);
            }

            if (await this.answearService.ExistsTextAsync(answearDTO.QuestionId, answearDTO.Text))
            {
                ModelState.AddModelError("CustomError", "Answear text already exists!");
                return BadRequest(ModelState);
            }

            int answearId = await this.answearService.CreateAsync(answearDTO);

            return Ok(await this.answearService.FindByIdAsync(answearId));
        }

        [HttpPut("{id:int}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult> Update(int id, [FromBody] AnswearUpdatingDTO answearDTO)
        {
            if (!await this.answearService.ExistsIdAsync(id))
            {
                return NotFound(id);
            }

            AnswearDTO answear = await this.answearService.FindByIdAsync(id);

            if (answearDTO == null)
            {
                return BadRequest(answearDTO);
            }

            if (await this.answearService.ExistsTextAsync(answear.QuestionId, answearDTO.Text)
                && answear.Text != answearDTO.Text)
            {
                ModelState.AddModelError("CustomError", "Answear text already exists!");
                return BadRequest(ModelState);
            }

            await this.answearService.UpdateAsync(id, answearDTO);

            return Ok();
        }


        [HttpDelete("{id:int}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> Delete(int id)
        {
            if (!await this.answearService.ExistsIdAsync(id))
            {
                return NotFound(id);
            }

            await this.answearService.DeleteAsync(id);

            return NoContent();
        }
    }
}
