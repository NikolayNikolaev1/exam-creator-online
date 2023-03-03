namespace ExamCreatorOnline.Api.Controllers
{
    using Data.Models;
    using Microsoft.AspNetCore.Mvc;
    using Models;
    using Services;

    [Route("api/[controller]")]
    [ApiController]
    public class ExamController : ControllerBase
    {
        private IExamService examService;

        public ExamController(IExamService examService)
        {
            this.examService = examService;
        }

        [HttpPost()]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult> Create([FromBody] ExamDTO examDTO)
        {
            if (examDTO == null)
            {
                return BadRequest();
            }

            if (await this.examService.ExistsNameAsync(examDTO.Name))
            {
                ModelState.AddModelError("CustomError", "Exam name already exists!");
                return BadRequest(ModelState);
            }

            int examId = await this.examService.CreateAsync(
                examDTO.Name,
                examDTO.AveragePoints,
                examDTO.GoodPoints,
                examDTO.VeryGoodPoints,
                examDTO.ExcellentPoints,
                examDTO.FacilityId,
                examDTO.LecturerId);

            return CreatedAtRoute("GetExam", new { id = examId }, examDTO);
        }

        [HttpGet("{id:int}", Name = "GetExam")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(Exam))]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult> Get(int id)
        {

            if (!await this.examService.ExistsIdAsync(id))
            {
                return NotFound();
            }

            return Ok(await this.examService.FindIdAsync(id));
        }

        [HttpGet()]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(IEnumerable<Exam>))]
        public async Task<ActionResult> GetList()
        {
            return Ok(await this.examService.AllAsync());
        }

        [HttpPut("id:int")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult> Update(int id, [FromBody] ExamDTO examDTO)
        {
            if (!await this.examService.ExistsIdAsync(id))
            {
                return NotFound();
            }

            if (examDTO == null)
            {
                return BadRequest();
            }

            await this.examService.UpdateAsync(
                id,
                examDTO.Name,
                examDTO.AveragePoints,
                examDTO.GoodPoints,
                examDTO.VeryGoodPoints,
                examDTO.ExcellentPoints);

            return Ok();
        }

        [HttpDelete("id:int")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> Delete(int id)
        {
            if (!await this.examService.ExistsIdAsync(id))
            {
                return NotFound();
            }

            await this.examService.DeleteAsync(id);

            return NoContent();
        }
    }
}
