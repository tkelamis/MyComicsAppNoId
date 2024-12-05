using Microsoft.EntityFrameworkCore;
using MyComicsBack.Models;
using MyComicsBack.Data;
using MyComicsBack.Interfaces;

namespace MyComicsBack.Repository
{
    public class ComicRepository : IComicRepository
    {

        private readonly ApplicationDbContext _context;

        public ComicRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Comic>> GetAll()
        {
            return await _context.Comics.ToListAsync();
        }

        public async Task<Comic> GetByIdAsync(int Id)
        {
            return await _context.Comics.FirstOrDefaultAsync(c => c.Id == Id);
        }

        public bool Add(Comic comic)
        {
            _context.Comics.Add(comic);
            return Save();
        }

        public bool Update(Comic comic)
        {
            throw new NotImplementedException();
        }

        public bool Delete(Comic comic)
        {
            _context.Comics.Remove(comic);
            return Save();
        }

        public bool Save()
        {
            var saved = _context.SaveChanges();
            return saved > 0 ? true : false;
        }
    }
}
