//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace GiftChoice.Models
{
    using System;
    using System.Collections.Generic;
    using System.Web;

    public partial class VideoTbl
    {
        public int VId { get; set; }
        public string VUrl { get; set; }
        public string Video { get; set; }
        public HttpPostedFileBase Image { get; set; }
        public string VideoTitle { get; set; }
        public Nullable<bool> Active { get; set; }
        public Nullable<System.DateTime> Create_at { get; set; }
        public Nullable<System.DateTime> Update_at { get; set; }
    }
}
