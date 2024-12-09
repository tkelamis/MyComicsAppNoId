using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;
using MyComicsBack.Data;
using MyComicsBack.Interfaces;
using MyComicsBack.Models;

namespace MyComicsBack.Services
{
    public class AuthorizeService : Interfaces.IAuthorizeService
    {
        private readonly ApplicationDbContext _dbContext;
        public AuthorizeService(ApplicationDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public bool CheckAuthorization(User user)
        {
            _dbContext.Users.FirstOrDefault(u => u.Email == user.Email);
            return true;
        }
    }
}
