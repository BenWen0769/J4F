using Microsoft.EntityFrameworkCore;

namespace J4F.Server
{
    public class J4FContext: DbContext
    {
        public J4FContext() { }

        public DbSet<Product> Products { get; set; }
    }
}
