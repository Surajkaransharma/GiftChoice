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
    
    public partial class KeywordTbl
    {
        public long KeywordId { get; set; }

        public string Menu { get; set; }
        public string Keyword { get; set; }
        public string KUrl { get; set; }
        public Nullable<System.DateTime> Create_at { get; set; }
        public Nullable<System.DateTime> Update_at { get; set; }
        public Nullable<bool> Active { get; set; }
        public Nullable<long> Priority { get; set; }
        public Nullable<long> UserId { get; set; }
    }
}
