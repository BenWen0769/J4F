using J4F.Api.ProductsApi;
using J4F.Server;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Text;

namespace J4F.Api.Controllers
{
    [Route("api/[controller]/[action]")]
    public class ProductsApiController:ApiController
    {
        private J4FContext dbContext;

        public ProductsApiController(J4FContext context)
        {
            dbContext = context;
        }

        [Authorize(Roles = "admin")]
        public JsonResult Add([FromBody] ProductsApiAdd model)
        {
            Product product = new Product()
            {
                Name = model.Name,
                Category = model.Category,
                Pictureid = model.Pictureid
            };
            dbContext.Add(product);
            dbContext.SaveChanges();
            return Success();
        }
    }
}
