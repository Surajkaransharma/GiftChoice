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
    
    public partial class BannerProductTbl
    {
        public long ProductId { get; set; }
        public Nullable<long> MainCateId { get; set; }
        public string ProductTitle { get; set; }
        public Nullable<double> Price { get; set; }
        public string PUrl { get; set; }
        public string PLabel { get; set; }
        public string PDesc { get; set; }
        public string PDesc1 { get; set; }
        public Nullable<long> Priority { get; set; }
        public Nullable<bool> Active { get; set; }
        public Nullable<System.DateTime> Create_at { get; set; }
        public Nullable<System.DateTime> Update_at { get; set; }
        public Nullable<long> UserID { get; set; }
        public Nullable<long> Qty { get; set; }
    }
}