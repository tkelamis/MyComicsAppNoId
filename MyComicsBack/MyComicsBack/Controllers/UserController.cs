using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MyComicsBack.Interfaces;
using MyComicsBack.Models;
using MyComicsBack.Repository;
using MyComicsBack.DAO;
using MyComicsBack.DAOMapper;
using MyComicsBack.Mappers;

namespace MyComicsBack.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUserRepository _userRepository;
        private readonly UserDaoMapper _userDAOMapper;

        public UserController(IUserRepository userRepository, UserDaoMapper userDaoMapper)
        {
            _userRepository = userRepository;
            _userDAOMapper = userDaoMapper;
        }

        [HttpGet("Users")]
        public async Task<IActionResult> GetUsers()
        {
            var users = await _userRepository.GetAll();
            if (users == null)
            {
                return NotFound("No users found.");
            }
            var usersDAOList = _userDAOMapper.DAOListMapping(users);

            return Ok(usersDAOList);
        }

        [HttpPost("signUp")]
        public async Task<IActionResult> PostUser([FromBody] UserDAO userDao)
        {

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            User finalUserToSendToDatabase = _userDAOMapper.DAOMapping(userDao);

            if (_userRepository.UserExists(finalUserToSendToDatabase))
            {
                return Conflict(new { message = "User already exists." });
            }
            else
            {
                _userRepository.Add(finalUserToSendToDatabase);

                return Ok(finalUserToSendToDatabase);
            }
        }

        [HttpPost ("logIn")]
        public async Task<IActionResult> PostUserExisting([FromBody] UserDAO userDao)
        {

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            User finalUserToSendToDatabase = _userDAOMapper.DAOMapping(userDao);

            if (!_userRepository.UserExists(finalUserToSendToDatabase))
            {
                return NotFound(new { message = "User not found." });
            }
            else
            {
                if (_userRepository.PasswordExists(finalUserToSendToDatabase))
                {
                    return Ok(finalUserToSendToDatabase);
                }
                else
                {
                    return NotFound(new { message = "Wrong Password" });
                }
                    
            }
        }
    }
}
