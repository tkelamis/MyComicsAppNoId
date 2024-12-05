namespace MyComicsBack.Models
{
    public class UserRole
    {
        public int Id { get; set; }
        public RoleType Role { get; set; }
    }

    public enum RoleType
    {
        Admin,
        User
    }
}
