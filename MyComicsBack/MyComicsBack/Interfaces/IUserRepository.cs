using MyComicsBack.Models;

namespace MyComicsBack.Interfaces
{
    public interface IUserRepository
    {
        Task<IEnumerable<User> >GetAll();

        bool Add(User user);

        public bool UserExists(User user);

        public bool PasswordExists(User user);
    }
}
