using MyComicsBack.Models;
using System.ComponentModel.DataAnnotations.Schema;

namespace MyComicsBack.Models
{
    public class User
    {
        public int Id { get; set; }

        public string Email { get; set; }

        public string Password { get; set; }

        public int UserRoleId { get; set; }

        public UserRole UserRole{ get; set; }
    }
}
