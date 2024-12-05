using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MyComicsBack.Interfaces;
using MyComicsBack.Models;
using MyComicsBack.Repository;

namespace MyComicsBack.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUserRepository _userRepository;

        public UserController(IUserRepository userRepository)
        {
            _userRepository = userRepository;
        }


        [HttpPost]
        public async Task<IActionResult> PostUser([FromBody] User user)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            _userRepository.Add(user);

            return Ok(user);
        }
    }
}
