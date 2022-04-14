using AppToDoListAPI.Context;
using AppToDoListAPI.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AppToDoListAPI.Repositorio
{
    public class RepositorioToDoList : I_RepositorioToDoList
    {
        private readonly AppDBContext _context;
        public RepositorioToDoList(AppDBContext context)
        {
            _context = context;
        }

        public async Task<List<ToDoList>> GetTask()
        {
            var registerTask = await _context.Task.Select(x => new ToDoList()
            {
                IDTask = x.IDTask,
                Tasks = x.Tasks
            }).ToListAsync();
            return registerTask;
        }

        public async Task<ToDoList> GetToDoListBYId(int _IDTask)
        {
            var registerTask = await _context.Task.Where(x => x.IDTask == _IDTask).Select(x => new ToDoList()
            {
                Tasks = x.Tasks,
            }).FirstOrDefaultAsync();
            return registerTask;
        }

        public void AddTask(ToDoListDTO _task)
        {
            var Task = new ToDoList()
            {
                Tasks = _task.Tasks
            };
            _context.Task.Add(Task);
            _context.SaveChanges();
        }

        public async Task DeleteTask(int _task)
        {
            var toDoList = await _context.Task.FindAsync(_task);
            if (toDoList is not null)
            {
                _context.Task.Remove(toDoList);
                await _context.SaveChangesAsync();
            }
        }

        public async Task UpdateTask(int _idTask, ToDoListDTO _task)
        {
            var toDoList = await _context.Task.FindAsync(_idTask);
            if (toDoList is not null)
            {
                toDoList.Tasks = _task.Tasks;
                await _context.SaveChangesAsync();
            }
        }
    }
}
