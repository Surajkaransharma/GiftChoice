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

    public partial class FestivalBannerTbl
    {
        public long FBannerId { get; set; }
        public string FBTitle { get; set; }
        public string FBPosition { get; set; }

        public HttpPostedFileBase Image { get; set; }
        public string FBUrl { get; set; }
        public Nullable<bool> Active { get; set; }
        public Nullable<long> Priority { get; set; }
        public string FBImage { get; set; }
        public Nullable<System.DateTime> Create_at { get; set; }
        public Nullable<System.DateTime> Update_at { get; set; }
        public Nullable<long> UserId { get; set; }
    }
}
