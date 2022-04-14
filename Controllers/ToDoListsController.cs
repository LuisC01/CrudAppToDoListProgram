using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using AppToDoListAPI.Context;
using AppToDoListAPI.Models;
using AppToDoListAPI.Repositorio;

namespace AppToDoListAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ToDoListsController : ControllerBase
    {
        private readonly I_RepositorioToDoList _context;

        public ToDoListsController(I_RepositorioToDoList repo)
        {
            _context = repo;
        }

        // GET: api/ToDoLists
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ToDoList>>> GetTask()
        {
            return await _context.GetTask();
        }

        // GET: api/ToDoLists/5
        [HttpGet("{id}")]
        public async Task<ActionResult<ToDoList>> GetToDoList(int id)
        {
            return await _context.GetToDoListBYId(id);
        }

        // PUT: api/ToDoLists/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutToDoList(int id, ToDoListDTO toDoList)
        {
            await _context.UpdateTask(id, toDoList);
            return Ok();
        }

        // POST: api/ToDoLists
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost("/ToDoList/add")]
        public async Task<ActionResult<ToDoList>> PostToDoList([FromBody] ToDoListDTO _ToDoListDTO)
        {
            _context.AddTask(_ToDoListDTO);
            return Ok();

            return CreatedAtAction("GetToDoList", new { id = _ToDoListDTO.Tasks }, _ToDoListDTO);
        }

        // DELETE: api/ToDoLists/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteToDoList(int id)
        {
            await _context.DeleteTask(id);
            return Ok();
        }

       /* private bool ToDoListExists(int id)
        {
            return _context.Task.Any(e => e.IDTask == id);
        }*/
    }
}
