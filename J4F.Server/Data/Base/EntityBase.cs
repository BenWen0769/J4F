using System.ComponentModel.DataAnnotations;

namespace J4F.Server
{
    public class EntityBase
    {
        [Key]
        public int ID { get; set; }
        public bool IsDel { get; set; }
    }
}
