using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace GiftChoice.Models
{
    public class getdatamodel
    {
        public class Slider
        {
            public long? MainCateId { get; set; } 
            public string SUrl { get; set; } = string.Empty;
            public long? SliderId { get; set; }
            public long? Priority { get; set; }
            public string SliderImage { get; set; } = string.Empty;
            public bool Active { get; set; }
        }

        public class NavbarMenuDto
        {
            public long? MainCateId { get; set; } // If MainCateId is a bigint in SQL, use long?
            public string MUrl { get; set; } = string.Empty;
            public string MTitle { get; set; } = string.Empty;
            public long? Priority { get; set; }
        }
    }
}