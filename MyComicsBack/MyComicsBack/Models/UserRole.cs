﻿namespace MyComicsBack.Models
{
    public class UserRole
    {
        public int Id { get; set; }
        public string RoleType { get; set; }
        public ICollection<User> Users { get; set; }
    }
}
