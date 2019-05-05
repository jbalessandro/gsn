using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace GSN.Controllers
{
    [Route("api/[controller]")]
    public class UsersController : Controller
    {
        private static List<User> Users = new List<User> {
            new User { Id = 1, Name = "John", Age = 20, Address = "5th Avenue"},
            new User { Id = 2, Name = "Helen", Age = 21, Address = "1th Avenue"}
        };

        [HttpGet]
        [Route("GetUsers")]
        public IEnumerable<User> GetUsers()
        {
            return Users.OrderBy(x => x.Id);
        }

        [HttpGet]
        [Route("GetUser/{id}")]
        public IActionResult GetUser(int id)
        {
            var user = Users.FirstOrDefault(x => x.Id == id);

            if (user == null)
            {
                return NotFound();
            }

            return Ok(user);
        }

        [HttpPut]
        [Route("PutUser/{id}")]
        public IEnumerable<User> PutUser(long id, [FromBody] User user)
        {
            if (id != user.Id)
            {
                return null;
            }

            Users.Remove(Users.FirstOrDefault(x => x.Id == id));
            Users.Add(user);

            return Users.OrderBy(x => x.Id);
        }

        [HttpPost]
        [Route("PostUser")]
        public IEnumerable<User> PostUser([FromBody] User user)
        {
            if (user == null)
            {
                return null;
            }

            user.Id = Users.Max(x => x.Id) + 1;
            Users.Add(user);

            return Users.OrderBy(x => x.Id);
        }
    }
}
