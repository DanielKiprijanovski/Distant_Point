using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TMS.Data.Helper;
using TMS.Data.Models;

namespace TMS.Services.Interfaces
{
    public interface ITaskService
    {
        PaginatedList<TaskItem> GetAllTasks(int pageIndex, int pageSize, string search);
        TaskItem GetTaskById(int id);
        void CreateTask(TaskItem task);
        void UpdateTask(TaskItem task);
        void DeleteTask(int id);
        bool TaskExists(int id);
    }


}
