using AppToDoListAPI.Context;
using AppToDoListAPI.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AppToDoListAPI.Repositorio
{
    public class RepositorioLogin : IRepositorioLogin
    {
        private readonly AppDBContext _context;

        public RepositorioLogin(AppDBContext context)
        {
            _context = context;
        }

        public Users GetUser(UserDTO _user)
        {
            var user = _context.user.Where(u => u.Email == _user.Email && u.password == _user.password).FirstOrDefault();

            return user;
        }

        public void AddUser(UserDTO _user)
        {
            var usuario = new Users()
            {
                Email = _user.Email,
                password = _user.password
            };
            _context.user.Add(usuario);
            _context.SaveChanges();
        }
    }
}
