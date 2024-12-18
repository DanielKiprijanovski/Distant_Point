using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TMS.Data.Helper;
using TMS.Data.Models;
using TMS.Repositories.Interfaces;
using TMS.Services.Interfaces;

namespace TMS.Services.Services
{
    public class TaskService : ITaskService
    {
        private readonly ITaskRepository _taskRepository;

        public TaskService(ITaskRepository taskRepository)
        {
            _taskRepository = taskRepository;
        }

        public PaginatedList<TaskItem> GetAllTasks(int pageIndex, int pageSize, string search = "")
        {
            return _taskRepository.GetAllTasks(pageIndex, pageSize, search);
        }


        public TaskItem? GetTaskById(int id)
        {
            return _taskRepository.GetTaskById(id);
        }

        public void CreateTask(TaskItem task)
        {
            if (string.IsNullOrWhiteSpace(task.Title))
            {
                throw new ArgumentException("Title cannot be empty.");
            }

            _taskRepository.AddTask(task);
        }

        public void UpdateTask(TaskItem task)
        {
            if (!_taskRepository.TaskExists(task.Id))
            {
                throw new KeyNotFoundException("Task not found.");
            }

            _taskRepository.UpdateTask(task);
        }

        public void DeleteTask(int id)
        {
            if (!_taskRepository.TaskExists(id))
            {
                throw new KeyNotFoundException("Task not found.");
            }

            _taskRepository.DeleteTask(id);
        }

        public bool TaskExists(int id)
        {
            return _taskRepository.TaskExists(id);
        }
    }


}
