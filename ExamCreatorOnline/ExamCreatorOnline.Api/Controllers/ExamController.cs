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
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(ExamDTO))]
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

            return Ok(await this.examService.FindByIdAsync(examId));
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
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(ExamDTO))]
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

            if (await this.examService.ExistsNameAsync(exam.FacilityId, examDTO.Name)
                && exam.Name != examDTO.Name)
            {
                ModelState.AddModelError("CustomError", "Exam name already exists!");
                return BadRequest(ModelState);
            }

            await this.examService.UpdateAsync(id, examDTO);

            return Ok(await this.examService.FindByIdAsync(id));
        }

        [HttpPut("~/api/Exam/{id:int}/StudentAdd")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(IEnumerable<int>))]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult> AddStudent(int id, [FromBody] StudentManagingDTO dto)
        {
            if (dto == null)
            {
                return BadRequest(dto);
            }

            if (!await this.examService.ExistsIdAsync(id))
            {
                return NotFound(id);
            }

            if (!await base.IsUserAuthorizedAsync(dto.LecturerId, Role.Lecturer, id))
            {
                return StatusCode(StatusCodes.Status401Unauthorized);
            }

            return Ok(await this.examService.AddStudentsAsync(id, dto.StudentIds));
        }

        [HttpPut("~/api/Exam/{id:int}/StudentRemove")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(IEnumerable<int>))]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult> RemoveStudent(int id, [FromBody] StudentManagingDTO dto)
        {
            if (dto == null)
            {
                return BadRequest(dto);
            }

            if (!await this.examService.ExistsIdAsync(id))
            {
                return NotFound(id);
            }

            if (!await base.IsUserAuthorizedAsync(dto.LecturerId, Role.Lecturer, id))
            {
                return StatusCode(StatusCodes.Status401Unauthorized);
            }

            return Ok(await this.examService.RemoveStudentsAsync(id, dto.StudentIds));
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
