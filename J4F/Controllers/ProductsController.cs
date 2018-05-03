using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace J4F.Controllers
{
    [Authorize(Roles = "admin")]
    public class ProductsController : Controller
    {
        public IActionResult List()
        {
            return View();
        }

        public IActionResult Add()
        {
            return View();
        }
    }
}