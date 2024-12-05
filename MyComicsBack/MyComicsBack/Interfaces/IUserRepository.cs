using MyComicsBack.Models;

namespace MyComicsBack.Interfaces
{
    public interface IUserRepository
    {
        bool Add(User user);
    }
}
