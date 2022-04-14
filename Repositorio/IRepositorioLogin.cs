using AppToDoListAPI.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AppToDoListAPI.Repositorio
{
    public interface IRepositorioLogin
    {
        void AddUser(UserDTO _user);
        Users GetUser(UserDTO _user);
    }
}
