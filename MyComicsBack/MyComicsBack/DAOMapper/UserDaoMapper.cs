using MyComicsBack.DAO;
using MyComicsBack.Interfaces;
using MyComicsBack.Models;

namespace MyComicsBack.DAOMapper
{
    public class UserDaoMapper
    {

        public User DAOMapping(UserDAO userDao)
        {
            return new User
            {
                Email = userDao.Email,
                Password = userDao.Password,
                UserRoleId = userDao.Role switch
                {
                    "Admin" => 1,
                    "User" => 2,
                    _ => 2
                }
            };
        }

        public IEnumerable<UserDAO> DAOListMapping(IEnumerable<User> users)
        {
            var usersList = new List<UserDAO>();
            foreach (var user in users)
            {
                var userDao = new UserDAO()
                {
                    Email = user.Email,
                    Password = user.Password,
                    Role = user.UserRole.RoleType
                };
                usersList.Add(userDao);
            }
            return usersList;
        }
    }
}
