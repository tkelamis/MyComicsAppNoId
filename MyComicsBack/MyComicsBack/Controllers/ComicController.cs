using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MyComicsBack.Models;
using MyComicsBack.Repository;
using MyComicsBack.ViewModels;
using MyComicsBack.Data;
using MyComicsBack.Interfaces;
using MyComicsBack.Mappers;

namespace MyComicsBack.Controllers
{

    [ApiController]
    [Route("api/[controller]")]
    public class ComicController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly IComicRepository _comicRepository;
        private readonly ComicMapper _comicMapper;

        public ComicController(
            ApplicationDbContext context,
            IComicRepository comicRepository,
            ComicMapper mapper
            )
        {
            _context = context;
            _comicRepository = comicRepository;
            _comicMapper = mapper;
        }

        [HttpGet]
        public async Task<IActionResult> GetComics()
        {
            var comics = await _comicRepository.GetAll();
            if (comics == null)
            {
                return NotFound();
            }
            var comicsViewModels = _comicMapper.MapListToViewModel(comics);

            return Ok(comicsViewModels);
        }


        [HttpGet("{id}")]
        public async Task<IActionResult> GetComicById(int id)
        {
            var comic = await _comicRepository.GetByIdAsync(id);
            if (comic == null)
            {
                return NotFound();
            }
            var comicViewModel = _comicMapper.MapToViewModel(comic);

            return Ok(comicViewModel);
        }

        [HttpPost]
        public async Task<IActionResult> PostComic([FromBody] Comic comic)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            _comicRepository.Add(comic);

            return CreatedAtAction(nameof(GetComicById), new { id = comic.Id }, comic);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteComic(int id)
        {
            var comic = await _comicRepository.GetByIdAsync(id);
            if (comic == null)
            {
                return NotFound();
            }

            _comicRepository.Delete(comic);
            return NoContent();
        }

    }
}
