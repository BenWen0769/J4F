using System.Collections.Generic;

namespace J4F.Server
{
    public class MemberServer
    {
        public Member Login(string name ,string pwd)
        {
            if(name == "admin" && pwd== "admin123")
            {
                return new Member()
                {
                    ID = 1,
                    Name = "admin",
                    IsAdmin = true
                };
            }
            else
            {
                return null;
            }
        }


    }

    public class Menu
    {
        public string Title { get; set; }
        public string Url { get; set; }
        public List<Menu> SubMenus { get; set; }
    }
}
