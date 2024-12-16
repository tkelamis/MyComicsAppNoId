using MyComicsBack.DAO;
using MyComicsBack.Interfaces;
using MyComicsBack.Models;

namespace MyComicsBack.DAOMapper
{
    public class UserDaoMapper : IDAOMapper <UserDAO, User>
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
    }
}
