using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TMS.Data;
using TMS.Data.ContextSettings;
using TMS.Data.Helper;
using TMS.Data.Models;
using TMS.Repositories.Interfaces;
using TMS.Services.Interfaces;

namespace TMS.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class TaskItemsController : ControllerBase
    {
        private readonly ITaskService _taskService;

        public TaskItemsController(ITaskService taskService)
        {
            _taskService = taskService;
        }

        [HttpGet]
        public ActionResult<PaginatedList<TaskItem>> GetTaskItems([FromQuery] int pageIndex = 1, [FromQuery] int pageSize = 10,[FromQuery] string search = "")
        {
            var taskItems = _taskService.GetAllTasks(pageIndex, pageSize, search);
            return Ok(taskItems);
        }


        [HttpGet("{id}")]
        public ActionResult<TaskItem> GetTaskItem(int id)
        {
            var taskItem = _taskService.GetTaskById(id);
            if (taskItem == null)
            {
                return NotFound();
            }
            return Ok(taskItem);
        }

        [HttpPost]
        public IActionResult PostTaskItem(TaskItem taskItem)
        {
            try
            {
                _taskService.CreateTask(taskItem);
                return CreatedAtAction(nameof(GetTaskItem), new { id = taskItem.Id }, taskItem);
            }
            catch (ArgumentException ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPut("{id}")]
        public IActionResult PutTaskItem(int id, TaskItem taskItem)
        {
            if (id != taskItem.Id)
            {
                return BadRequest("Task ID mismatch.");
            }

            try
            {
                _taskService.UpdateTask(taskItem);
                return NoContent();
            }
            catch (KeyNotFoundException ex)
            {
                return NotFound(ex.Message);
            }
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteTaskItem(int id)
        {
            try
            {
                _taskService.DeleteTask(id);
                return NoContent();
            }
            catch (KeyNotFoundException ex)
            {
                return NotFound(ex.Message);
            }
        }
    }


}

