using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace J4F.Models
{
    public class LoginViewModal
    {
        public bool Success { get; set; }
        public string ReturnUrl { get; set; }
        public string ErrorMessage { get; set; }
    }

    public class LoginInModal
    {
        public string UserName { get; set; }
        public string PassWord { get; set; }
        public string ReturnUrl { get; set; }
    }
}
