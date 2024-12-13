using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TMS.Data.ContextSettings;
using TMS.Data.Models;
using TMS.Repositories.Interfaces;

namespace TMS.Repositories.Repositories
{
    public class TaskRepository : ITaskRepository
    {
        private readonly DataContext _context;

        public TaskRepository(DataContext context)
        {
            _context = context;
        }

        public IEnumerable<TaskItem> GetAllTasks()
        {
            return _context.TaskItems.ToList();
        }

        public TaskItem GetTaskById(int id)
        {
            return _context.TaskItems.Find(id);
        }

        public void AddTask(TaskItem taskItem)
        {
            _context.TaskItems.Add(taskItem);
            _context.SaveChanges();
        }

        public void UpdateTask(TaskItem taskItem)
        {
            _context.TaskItems.Update(taskItem);
            _context.SaveChanges();
        }

        public void DeleteTask(int id)
        {
            var taskItem = _context.TaskItems.Find(id);
            if (taskItem != null)
            {
                _context.TaskItems.Remove(taskItem);
                _context.SaveChanges();
            }
        }

        public bool TaskExists(int id)
        {
            return _context.TaskItems.Any(e => e.Id == id);
        }
    }

}
