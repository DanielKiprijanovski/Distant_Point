using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TMS.Data.Helper;
using TMS.Data.Models;

namespace TMS.Repositories.Interfaces
{
    public interface ITaskRepository
    {
        PaginatedList<TaskItem> GetAllTasks(int pageIndex, int pageSize, string search);
        TaskItem GetTaskById(int id);
        void AddTask(TaskItem taskItem);
        void UpdateTask(TaskItem taskItem);
        void DeleteTask(int id);
        bool TaskExists(int id);
    }

}
