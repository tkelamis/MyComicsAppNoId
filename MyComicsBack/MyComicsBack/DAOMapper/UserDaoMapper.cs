using MyComicsBack.DAO;
using MyComicsBack.Interfaces;
using MyComicsBack.Models;

namespace MyComicsBack.DAOMapper
{
    public class UserDaoMapper : IDAOMapper <UserDAO, User>
    {

        public User DAOMapping(UserDAO userDao)
        {
            User user = new User();
            user.Email = userDao.Email;
            user.Password = userDao.Password;
            if (userDao.Role == "Admin")
            {
                user.UserRoleId = 1;
            }
            if (userDao.Role == "User")
            {
                user.UserRoleId = 2;
            }
            return user;
        }
    }
}
