using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace AppToDoListAPI.Models
{
    [Table("T_ToDoList")]
    public class ToDoList
    {
        [Key]
        public int IDTask { get; set; }
        public string Tasks { get; set; }
    }

    public class ToDoListDTO
    {
        public string Tasks { get; set; }
    }
}
