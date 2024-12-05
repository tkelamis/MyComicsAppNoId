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
    }
}
