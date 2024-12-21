using MyComicsBack.Data;
using MyComicsBack.Interfaces;
using MyComicsBack.Models;

namespace MyComicsBack.Repository
{
    public class UserRepository : IUserRepository
    {
        private readonly ApplicationDbContext _context;
        private readonly IUnitOfWork _unitOfWork;

        public UserRepository(ApplicationDbContext context, IUnitOfWork unitOfWork)
        {
            _context = context;
            _unitOfWork = unitOfWork;
        }

        public bool Add(User user)
        {
            _context.Users.Add(user);
            return _unitOfWork.Save();
        }

        public bool UserExists(User user)
        {

            User existingUser = _context.Users.FirstOrDefault(a => a.Email == user.Email);
            if (existingUser != null)
            {
                return true;
            }
            else
            {
                return false;
            }
        }
        public bool PasswordExists(User user)
        {

            User existingPassword = _context.Users.FirstOrDefault(a => a.Password == user.Password);
            if (existingPassword != null)
            {
                return true;
            }
            else
            {
                return false;
            }
        }
    }
}
