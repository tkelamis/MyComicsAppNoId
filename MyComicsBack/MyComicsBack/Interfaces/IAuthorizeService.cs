using MyComicsBack.Models;

namespace MyComicsBack.Interfaces
{
    public interface IAuthorizeService
    {
         bool CheckAuthorization(User user);
    }
}
