namespace ExamCreatorOnline.Api.Controllers
{
    using Data.Models;
    using Microsoft.AspNetCore.Mvc;
    using Services;
    using Services.DTO.Exams;

    [Route("api/[controller]")]
    [ApiController]
    public class ExamController : BaseController
    {
        private readonly IExamService examService;

        public ExamController(IExamService examService, IUserService userService)
            : base(userService)
        {
            this.examService = examService;
        }

        [HttpPost()]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        public async Task<ActionResult> Create([FromBody] ExamCreatingDTO examDTO)
        {
            if (examDTO == null)
            {
                return BadRequest(examDTO);
            }

            if (!await base.IsUserAuthorizedAsync(examDTO.LecturerId, Role.Lecturer))
            {
                return StatusCode(StatusCodes.Status401Unauthorized);
            }

            if (await this.examService.ExistsNameAsync(examDTO.FacilityId, examDTO.Name))
            {
                ModelState.AddModelError("CustomError", "Exam name already exists!");
                return BadRequest(ModelState);
            }

            int examId = await this.examService.CreateAsync(examDTO);

            return CreatedAtRoute("GetExam", new { id = examId }, examDTO);
        }

        [HttpGet("{id:int}", Name = "GetExam")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(ExamDTO))]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult> Get(int id)
        {

            if (!await this.examService.ExistsIdAsync(id))
            {
                return NotFound();
            }

            return Ok(await this.examService.FindByIdAsync(id));
        }

        [HttpGet()]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(IEnumerable<ExamDTO>))]
        public async Task<ActionResult> GetList()
        {
            return Ok(await this.examService.AllAsync());
        }

        [HttpPut("{id:int}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult> Update(int id, [FromBody] ExamUpdatingDTO examDTO)
        {
            if (!await this.examService.ExistsIdAsync(id))
            {
                return NotFound(id);
            }

            ExamDTO exam = await this.examService.FindByIdAsync(id);

            if (!await base.IsUserAuthorizedAsync(examDTO.LecturerId, Role.Lecturer, id))
            {
                return StatusCode(StatusCodes.Status401Unauthorized);
            }

            if (examDTO == null)
            {
                return BadRequest(examDTO);
            }

            if (await this.examService.ExistsNameAsync(exam.Facility.Id, examDTO.Name))
            {
                ModelState.AddModelError("CustomError", "Exam name already exists!");
                return BadRequest(ModelState);
            }

            await this.examService.UpdateAsync(id, examDTO);

            return Ok();
        }

        [HttpDelete("{id:int}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> Delete(int id)
        {
            if (!await this.examService.ExistsIdAsync(id))
            {
                return NotFound(id);
            }

            await this.examService.DeleteAsync(id);

            return NoContent();
        }
    }
}
