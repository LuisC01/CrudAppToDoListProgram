using AppToDoListAPI.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AppToDoListAPI.Repositorio
{
    public interface I_RepositorioToDoList
    {
        void AddTask(ToDoListDTO _task);

        Task DeleteTask(int _task);

        Task<List<ToDoList>> GetTask();

        Task<ToDoList> GetToDoListBYId(int id);

        Task UpdateTask(int _idTask, ToDoListDTO _task);
    }
}
