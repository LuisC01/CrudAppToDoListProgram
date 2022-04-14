using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace AppToDoListAPI.Models
{
    [Table("T_USUARIOS")]
    public class Users
    {
        [Key]
       public int IDUsuario { get; set; }
       public string Email { get; set; }
       public string password { get; set; }
    }

    public class UserDTO
    {
        public string Email { get; set; }
        public string password { get; set; }
    }
}
