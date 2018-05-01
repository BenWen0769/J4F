using System;
using System.ComponentModel.DataAnnotations;

namespace J4F.Server
{
    public class EntityBase
    {
        [Key]
        public int Id { get; set; }
        public bool? Isdel { get; set; }
        public DateTime? AddDate { get; set; }
        public string AddIp { get; set; }
    }
}
