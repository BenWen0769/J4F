﻿using System;
using System.Collections.Generic;

namespace J4F.Server
{
    public class Product: EntityBase
    {
        public string Name { get; set; }
        public string Category { get; set; }
        public int? Status { get; set; }
        public int? Pictureid { get; set; }
        
    }
}
