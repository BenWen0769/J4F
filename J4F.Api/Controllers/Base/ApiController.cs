using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;

namespace J4F.Api.Controllers
{
    public class ApiController: Controller
    {


        public JsonResult Faile(string mes)
        {
            return Json(new Models.ApiResult()
            {
                ok = false,
                data = mes
            });
        }


        public JsonResult Success(object res)
        {
            return Json(new Models.ApiResult()
            {
                ok = true,
                data = res
            });
        }

        public override void OnActionExecuted(ActionExecutedContext context)
        {
            if (context.Exception != null)
            {
                string message = context.Exception.Message;
                context.Exception = null;
                context.Result = new JsonResult(new Models.ApiResult()
                {
                    ok = false,
                    mes = message
                });
            }
        }

    }
}
