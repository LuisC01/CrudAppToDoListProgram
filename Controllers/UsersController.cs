using AppToDoListAPI.Context;
using AppToDoListAPI.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using AppToDoListAPI.Repositorio;
using System.Threading.Tasks;

namespace AppToDoListAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly IRepositorioLogin _repositoriologin;

        public UsersController(IRepositorioLogin repo)
        {
            _repositoriologin = repo;
        } 

        [HttpPost]
        public ActionResult<Users> GetLogin([FromBody] UserDTO _userDTO)
        {
            var user = _repositoriologin.GetUser(_userDTO);
            if(user != null)
            {
                return Ok(user);
            }

            return NoContent();
        }

        [HttpPost("/register")]
        public ActionResult<List<Users>> PostRegister([FromBody] UserDTO _userDTO)
        {
            _repositoriologin.AddUser(_userDTO);
            return Ok();
        }
    }
}
