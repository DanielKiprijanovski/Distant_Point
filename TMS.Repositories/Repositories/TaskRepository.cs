using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Numerics;
using System.Text;
using System.Threading.Tasks;
using TMS.Data.ContextSettings;
using TMS.Data.Helper;
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

        public PaginatedList<TaskItem> GetAllTasks(int pageIndex, int pageSize,string search = "")
        {           
                var taskitems = _context.TaskItems
                    .Where(t => EF.Functions.Like(t.Title, $"%{search}%"))
                    .OrderBy(t =>  t.Id)
                    .Skip((pageIndex - 1) * pageSize)
                    .Take(pageSize)
                    .ToList();

                var count =  _context.TaskItems.Count();
                var totalPages = (int)Math.Ceiling(count / (double)pageSize);

                return new PaginatedList<TaskItem>(taskitems, pageIndex, totalPages);          
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
