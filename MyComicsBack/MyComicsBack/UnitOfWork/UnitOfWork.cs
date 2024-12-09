using Microsoft.AspNetCore.Mvc;
using MyComicsBack.Data;
using MyComicsBack.Interfaces;
using System.Web.Http.ModelBinding;

namespace MyComicsBack.UnitOfWork
{
    public class UnitOfWork : IUnitOfWork
    {
        private readonly ApplicationDbContext _context;
        public UnitOfWork(ApplicationDbContext context)
        {
            _context = context;
        }

        public bool Save()
        {
            if (_context.SaveChanges() > 0)
            {
                return true;
            }
            return false;
        }
    }
}
