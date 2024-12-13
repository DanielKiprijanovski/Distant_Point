using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TMS.Data;
using TMS.Data.ContextSettings;
using TMS.Data.Models;
using TMS.Repositories.Interfaces;  

namespace TMS.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class TaskItemsController : ControllerBase
    {
        private readonly ITaskRepository _taskRepository;

        public TaskItemsController(ITaskRepository taskRepository)
        {
            _taskRepository = taskRepository;
        }

        [HttpGet]
        public ActionResult<IEnumerable<TaskItem>> GetTaskItems()
        {
            return Ok(_taskRepository.GetAllTasks());
        }

        [HttpGet("{id}")]
        public ActionResult<TaskItem> GetTaskItem(int id)
        {
            var taskItem = _taskRepository.GetTaskById(id);
            if (taskItem == null)
            {
                return NotFound();
            }
            return Ok(taskItem);
        }

        [HttpPost]
        public IActionResult PostTaskItem(TaskItem taskItem)
        {
            if (string.IsNullOrEmpty(taskItem.Title))
            {
                return BadRequest("Title is required.");
            }

            taskItem.CreatedDate = DateTime.UtcNow;
            _taskRepository.AddTask(taskItem);

            return CreatedAtAction(nameof(GetTaskItem), new { id = taskItem.Id }, taskItem);
        }

        [HttpPut("{id}")]
        public IActionResult PutTaskItem(int id, TaskItem taskItem)
        {
            if (id != taskItem.Id)
            {
                return BadRequest();
            }

            if (!_taskRepository.TaskExists(id))
            {
                return NotFound();
            }

            _taskRepository.UpdateTask(taskItem);

            return NoContent();
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteTaskItem(int id)
        {
            if (!_taskRepository.TaskExists(id))
            {
                return NotFound();
            }

            _taskRepository.DeleteTask(id);

            return NoContent();
        }
    }

}

