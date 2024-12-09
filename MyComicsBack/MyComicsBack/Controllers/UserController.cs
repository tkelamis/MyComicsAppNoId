using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MyComicsBack.Interfaces;
using MyComicsBack.Models;
using MyComicsBack.Repository;
using MyComicsBack.DAO;
using MyComicsBack.DAOMapper;

namespace MyComicsBack.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUserRepository _userRepository;
        private readonly IDAOMapper<UserDAO, User> _userDAOMapper;

        public UserController(IUserRepository userRepository, IDAOMapper<UserDAO, User> userDaoMapper)
        {
            _userRepository = userRepository;
            _userDAOMapper = userDaoMapper;
        }


        [HttpPost]
        public async Task<IActionResult> PostUser([FromBody] UserDAO userDao)
        {

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            User finalUserToSendToDatabase = _userDAOMapper.DAOMapping(userDao);

            _userRepository.Add(finalUserToSendToDatabase);

            return Ok(finalUserToSendToDatabase);
        }
    }
}
