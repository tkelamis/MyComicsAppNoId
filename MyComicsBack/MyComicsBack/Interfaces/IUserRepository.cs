﻿using MyComicsBack.Models;

namespace MyComicsBack.Interfaces
{
    public interface IUserRepository
    {
        bool Add(User user);

        public bool UserExists(User user);
    }
}
