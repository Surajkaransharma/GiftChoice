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
    
    public partial class QueryTbl
    {
        public int QId { get; set; }
        public Nullable<int> MainCateId { get; set; }
        public string AskQues1 { get; set; }
        public string Answer { get; set; }
        public Nullable<bool> Priority { get; set; }
        public Nullable<bool> Active { get; set; }
        public Nullable<bool> ModelQuery2 { get; set; }
        public Nullable<System.DateTime> Create_at { get; set; }
        public Nullable<System.DateTime> Update_at { get; set; }
    }
}
