using System;
using System.Collections.Generic;
using System.Text;

namespace J4F.Api.Models
{
    class ApiResult
    {
        public bool ok { get; set; }
        public object data { get; set; }
        public string mes { get; set; }
    }
}
