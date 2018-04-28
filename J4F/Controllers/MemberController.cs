using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using J4F.Models;
using J4F.Server;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Mvc;

namespace J4F.Controllers
{
    public class MemberController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }

        [Route("/login")]
        public IActionResult Login()
        {
            return View();
        }

        [HttpPost]
        public async Task<IActionResult> LoginIn([FromBody] LoginInModal modal)
        {
            if(modal==null)
                return Json(new LoginViewModal()
                {
                    Success = false,
                    ErrorMessage = "服务器错误"
                });
            MemberServer memberServer = new MemberServer();
            var user = memberServer.Login(modal.UserName, modal.PassWord);
            if (user != null)
            {

                var identity = new ClaimsIdentity("Basic");
                identity.AddClaim(new Claim(ClaimTypes.Name, user.Name));
                if(user.IsAdmin) identity.AddClaim(new Claim(ClaimTypes.Role, "admin"));
                await HttpContext.SignInAsync(CookieAuthenticationDefaults.AuthenticationScheme, new ClaimsPrincipal(identity));
                return Json(new LoginViewModal()
                {
                    Success = true,
                    ReturnUrl = modal.ReturnUrl
                });
            }
            return Json(new LoginViewModal()
            {
                Success = false,
                ErrorMessage = "登录失败，用户名密码不正确"
            });

        }

        [HttpPost]
        public async Task<JsonResult> LoginOut()
        {
            await HttpContext.SignOutAsync(CookieAuthenticationDefaults.AuthenticationScheme);
            return Json(new
            {
                Success = true
            });
        }
    }
}