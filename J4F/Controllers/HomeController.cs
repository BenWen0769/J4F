using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using J4F.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.Extensions.Options;

namespace J4F.Controllers
{
    public class HomeController : Controller
    {
        
        [Authorize(Roles = "admin")]
        [Route("/")]
        public IActionResult Index()
        {

            return View();
        }

        [Authorize(Roles = "admin")]
        public IActionResult Desk()
        {

            return View();
        }

        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}
